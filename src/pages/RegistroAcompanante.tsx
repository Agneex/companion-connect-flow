import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, Upload, QrCode } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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
  const [step, setStep] = useState<"form" | "worldcoin" | "success">("form");
  const [formData, setFormData] = useState<FormData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setStep("worldcoin");
  };

  const handleWorldcoinVerification = () => {
    // Simulación de verificación Worldcoin
    setTimeout(() => {
      if (formData) {
        // Guardar en localStorage
        const companions = JSON.parse(localStorage.getItem("companions") || "[]");
        const walletAddress = localStorage.getItem("web3_account") || `0x${Math.random().toString(16).substr(2, 40)}`;
        
        const newCompanion = {
          id: Date.now().toString(),
          walletAddress: walletAddress,
          ...formData,
          worldcoinVerified: true,
          registeredAt: new Date().toISOString(),
          curriculum: formData.curriculum?.[0]?.name || "No subido",
        };
        companions.push(newCompanion);
        localStorage.setItem("companions", JSON.stringify(companions));
        localStorage.setItem("web3_account", walletAddress);
        localStorage.setItem("is_companion", "true");
        
        setStep("success");
        toast({
          title: "¡Verificación exitosa!",
          description: "Tu registro ha sido completado correctamente.",
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {step === "form" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Registro de Acompañante</CardTitle>
                <CardDescription>
                  Completa el formulario KYC para comenzar tu proceso de verificación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  Escanea el código QR con tu app de Worldcoin para verificar tu identidad
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6 py-8">
                <div className="bg-background border-4 border-primary/20 rounded-lg p-8 relative">
                  <QrCode className="w-48 h-48 text-primary" strokeWidth={1} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md">
                      <p className="text-sm font-medium">Simulación QR</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    En producción, esto mostrará un código QR real de Worldcoin
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Haz clic en el botón para simular la verificación
                  </p>
                </div>

                <Button 
                  onClick={handleWorldcoinVerification}
                  size="lg"
                  className="w-full max-w-md"
                >
                  Simular verificación exitosa
                </Button>
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
