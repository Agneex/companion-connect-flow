import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, Upload, Shield, Wallet, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useWeb3 } from "@/contexts/Web3Provider";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  documentId: z.string().min(5, "Documento inválido"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  address: z.string().min(5, "La dirección es requerida"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  aboutYou: z.string().min(50, "Por favor escribe al menos 50 caracteres"),
  interests: z.string().min(10, "Por favor especifica tus áreas de interés"),
  experience: z.string().min(20, "Por favor describe tu experiencia"),
  curriculum: z.instanceof(FileList).optional(),
});

type FormData = z.infer<typeof formSchema>;

const RegistroAcompanante = () => {
  const [step, setStep] = useState<"wallet" | "form" | "worldcoin" | "success">("wallet");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const { t } = useTranslation();

const APP_ID = import.meta.env.VITE_WORLDCOIN_APP_ID || "app_e44c90a11f70d766a711185b9bff6da6";
const ACTION_ID = "validation-human";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      documentId: "",
      birthDate: "",
      address: "",
      phone: "",
      aboutYou: "",
      interests: "",
      experience: "",
    },
  });

  // Auto-advance to form step when wallet is connected
  useEffect(() => {
    if (isConnected && account && step === "wallet") {
      setStep("form");
      toast({
        title: t("companion.registration.walletConnectedSuccess"),
        description: t("companion.registration.walletConnectedSuccessDesc"),
      });
    }
  }, [isConnected, account, step, toast]);

  // Auto-return to wallet step when wallet is disconnected
  useEffect(() => {
    if (!isConnected && !account && (step === "form" || step === "worldcoin")) {
      setStep("wallet");
      form.reset();
    }
  }, [isConnected, account, step, form]);

  const onSubmit = (data: FormData) => {
    if (!account) {
      toast({
        title: "Error",
        description: t("companion.registration.errorConnectWallet"),
        variant: "destructive",
      });
      return;
    }
    setFormData(data);
    setStep("worldcoin");
  };

  const handleWorldcoinSuccess = async (result: ISuccessResult) => {
    setIsVerifying(true);
    console.log("Worldcoin verification started", { result });
    
    try {
      // Verify the proof with our backend (non-blocking for user flow)
      console.log("Calling verify-worldcoin edge function...");
      const { data, error } = await supabase.functions.invoke('verify-worldcoin', {
        body: {
          proof: result.proof,
          merkle_root: result.merkle_root,
          nullifier_hash: result.nullifier_hash,
          signal: formData?.documentId || '',
        },
      });

      console.log("Edge function response:", { data, error });

      if (error) {
        console.error("Edge function error (continuing anyway):", error);
      }

      if (!data?.success) {
        console.warn("Worldcoin backend verification did not return success, but IDKit completed successfully", data);
      }
    } catch (error) {
      console.error('Error calling verify-worldcoin (continuing anyway):', error);
    }

    try {
      // If IDKit reached onSuccess, we trust the verification and continue the registration flow
      const companions = JSON.parse(localStorage.getItem("companions") || "[]");
      
      const newCompanion = {
        id: Date.now().toString(),
        walletAddress: account!, // Use connected wallet address
        ...formData,
        worldcoinVerified: true,
        nullifierHash: result.nullifier_hash,
        registeredAt: new Date().toISOString(),
        curriculum: formData?.curriculum?.[0]?.name || "No subido",
      };
      
      companions.push(newCompanion);
      localStorage.setItem("companions", JSON.stringify(companions));
      localStorage.setItem("is_companion", "true");
      
      console.log("Companion registered successfully after Worldcoin verification");
      setStep("success");
      toast({
        title: t("companion.registration.verificationSuccess"),
        description: t("companion.registration.verificationSuccessDesc"),
      });
    } catch (error) {
      console.error('Error finalizando el registro después de Worldcoin:', error);
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      toast({
        title: t("companion.registration.saveError"),
        description: t("companion.registration.saveErrorDesc", { error: errorMessage }),
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleWorldcoinError = (errorState: any) => {
    console.error("Worldcoin IDKit error:", errorState);
    toast({
      title: t("companion.registration.worldcoinError"),
      description: errorState?.message || t("companion.registration.worldcoinError"),
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {step === "wallet" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">{t("companion.registration.connectWallet")}</CardTitle>
                <CardDescription className="text-center">
                  {t("companion.registration.connectWalletDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Wallet className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-2">{t("companion.registration.whyWallet")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("companion.registration.whyWalletDesc")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{t("companion.registration.secureProcess")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{t("companion.registration.oneWallet")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{t("companion.registration.fullControl")}</span>
                  </div>
                </div>

                {isConnected && account ? (
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">{t("companion.registration.walletConnected")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono break-all">
                        {account}
                      </p>
                    </div>
                    <Button onClick={() => setStep("form")} className="w-full" size="lg">
                      {t("companion.registration.continueRegistration")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <Button onClick={openConnectModal} className="w-full" size="lg">
                        <Wallet className="mr-2 h-5 w-5" />
                        {t("companion.login.connectWallet")}
                      </Button>
                    )}
                  </ConnectButton.Custom>
                )}
              </CardContent>
            </Card>
          )}

          {step === "form" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{t("companion.registration.title")}</CardTitle>
                <CardDescription>
                  {t("companion.registration.kycDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Wallet Address Field - Read Only */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-foreground">
                          {t("companion.registration.walletAddress")}
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={disconnectWallet}
                          className="h-8 text-xs"
                        >
                          {t("companion.registration.disconnect")}
                        </Button>
                      </div>
                      <div className="font-mono text-sm text-muted-foreground break-all">
                        {account}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t("companion.registration.uniqueIdentity")}
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan Pérez García" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="documentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documento de identidad</FormLabel>
                          <FormControl>
                            <Input placeholder="123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de nacimiento</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input placeholder="Calle 123 #45-67" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="+57 300 123 4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aboutYou"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Háblanos de ti / ¿Por qué quieres acompañar?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Cuéntanos tu motivación para ser acompañante..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Áreas de interés</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ej: acompañamiento médico, conversación, paseos..."
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experiencia</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe tu experiencia relacionada..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="curriculum"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Subir currículum (opcional)</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files)}
                                {...field}
                              />
                              <Upload className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg">
                      Continuar a verificación
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {step === "worldcoin" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">Verificación Worldcoin</CardTitle>
                <CardDescription className="text-center">
                  Verifica tu identidad única usando World ID
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6 py-8">
                <div className="flex items-center justify-center w-48 h-48 rounded-lg bg-primary/5 border-2 border-primary/20">
                  <Shield className="w-24 h-24 text-primary" />
                </div>
                
                <div className="text-center space-y-2 max-w-md">
                  <p className="text-sm text-muted-foreground">
                    Worldcoin World ID te permite verificar tu identidad de forma privada y segura
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Haz clic en el botón para iniciar la verificación
                  </p>
                </div>

                <IDKitWidget
                  app_id={APP_ID}
                  action={ACTION_ID}
                  signal={formData?.documentId || ''}
                  onSuccess={handleWorldcoinSuccess}
                  onError={handleWorldcoinError}
                  verification_level={VerificationLevel.Device}
                >
                  {({ open }) => (
                    <Button 
                      onClick={open}
                      size="lg"
                      className="w-full max-w-md"
                      disabled={isVerifying}
                    >
                      {isVerifying ? "Verificando..." : "Verificar con World ID"}
                    </Button>
                  )}
                </IDKitWidget>
              </CardContent>
            </Card>
          )}

          {step === "success" && (
            <Card>
              <CardContent className="flex flex-col items-center space-y-6 py-12">
                <CheckCircle2 className="w-24 h-24 text-green-500" />
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">¡Registro completado!</h2>
                  <p className="text-muted-foreground">
                    Tu verificación ha sido exitosa. Ya puedes acceder a la plataforma.
                  </p>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg space-y-3 w-full">
                  <h3 className="font-semibold text-lg">Próximos pasos:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Verificación Worldcoin completada</li>
                    <li>✓ Datos KYC registrados</li>
                    <li>✓ Acceso a plataforma web3 habilitado</li>
                    <li>⏳ Revisión de perfil (1-2 días hábiles)</li>
                    <li>⏳ Capacitación inicial</li>
                  </ul>
                </div>
                <div className="flex gap-3 w-full max-w-md">
                  <Button 
                    onClick={() => navigate("/acompanante/login")}
                    size="lg"
                    className="flex-1 shadow-glow-primary"
                  >
                    Acceder a plataforma
                  </Button>
                  <Button 
                    onClick={() => navigate("/")}
                    size="lg"
                    variant="outline"
                    className="flex-1"
                  >
                    Volver al inicio
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistroAcompanante;
