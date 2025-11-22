import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Camera, CheckCircle2, ArrowLeft } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Provider";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useServiceContract } from "@/hooks/useServiceContract";
import { QRScanner } from "@/components/QRScanner";

const AcompananteScan = () => {
  const { isConnected, isCompanion, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { completeService, verifyToken, loading: contractLoading } = useServiceContract();
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sessionData, setSessionData] = useState({
    tokenId: "",
    silverName: "",
    activity: "",
    duration: "",
    notes: "",
  });

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  if (!isConnected || !isCompanion) {
    navigate("/acompanante/login");
    return null;
  }

  const handleStartScan = () => {
    setShowScanner(true);
  };

  const handleQRScanSuccess = async (decodedText: string) => {
    setShowScanner(false);
    setVerifying(true);
    
    try {
      // El QR debería contener el tokenId
      // Formato esperado: "COMPANYA-TOKEN-{tokenId}" o simplemente el tokenId
      let tokenId = decodedText;
      
      // Si el QR tiene un formato específico, extraer el tokenId
      if (decodedText.includes("COMPANYA-TOKEN-")) {
        tokenId = decodedText.replace("COMPANYA-TOKEN-", "");
      }
      
      // Verificar que sea un número válido
      if (isNaN(Number(tokenId))) {
        toast({
          title: "QR inválido",
          description: "El código QR no tiene el formato correcto",
          variant: "destructive",
        });
        setVerifying(false);
        return;
      }
      
      // Verificar que el token existe en el contrato
      const verification = await verifyToken(tokenId);
      
      if (!verification.exists) {
        toast({
          title: "Token inválido",
          description: "El código QR no corresponde a un ticket válido",
          variant: "destructive",
        });
        setVerifying(false);
        return;
      }
      
      // Token válido - proceder con los datos
      setScanned(true);
      setSessionData({
        ...sessionData,
        tokenId: tokenId,
        silverName: "María González", // TODO: obtener del metadata del token
      });
      
      toast({
        title: t("companion.scan.qrScanned"),
        description: `Token #${tokenId} verificado correctamente`,
      });
    } catch (error: any) {
      toast({
        title: "Error al verificar",
        description: error.message || "No se pudo verificar el ticket",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Llamar al contrato para completar el servicio
      const result = await completeService(
        sessionData.tokenId,
        sessionData.activity,
        parseFloat(sessionData.duration)
      );
      
      // Guardar sesión localmente con información de blockchain
      const sessions = JSON.parse(localStorage.getItem("companion_sessions") || "[]");
      const newSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        tokenId: sessionData.tokenId,
        silverName: sessionData.silverName,
        activity: sessionData.activity,
        duration: parseFloat(sessionData.duration),
        notes: sessionData.notes,
        nftAwarded: true,
        txHash: result.txHash,
      };
      
      sessions.unshift(newSession);
      localStorage.setItem("companion_sessions", JSON.stringify(sessions));
      
      toast({
        title: "✅ " + t("companion.scan.sessionRegistered"),
        description: `NFT transferido exitosamente. TX: ${result.txHash.slice(0, 10)}...`,
      });
      
      navigate("/acompanante/dashboard");
    } catch (error: any) {
      toast({
        title: "Error al registrar sesión",
        description: error.message || "No se pudo completar la transacción",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScanSuccess={handleQRScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}
      
      <main className="pt-[120px]">
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-2xl">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/acompanante/dashboard")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("companion.scan.backToDashboard")}
          </Button>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-3xl">{t("companion.scan.title")}</CardTitle>
              <CardDescription>
                {t("companion.scan.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!scanned ? (
                <div className="flex flex-col items-center space-y-6 py-8">
                  {verifying ? (
                    <div className="text-center space-y-4">
                      <div className="w-64 h-64 bg-muted/50 rounded-2xl flex items-center justify-center border-4 border-primary animate-pulse">
                        <Camera className="w-16 h-16 text-primary animate-pulse" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-2">Verificando ticket...</p>
                        <div className="flex justify-center gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <div className="w-64 h-64 bg-muted/50 rounded-2xl flex items-center justify-center border-4 border-border hover:border-primary transition-colors">
                          <QrCode className="w-20 h-20 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <h3 className="text-lg font-semibold">
                          {t("companion.scan.scanQr")}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Usa la cámara de tu dispositivo para escanear el código QR del ticket físico
                        </p>
                      </div>

                      <Button 
                        onClick={handleStartScan}
                        size="lg"
                        className="shadow-glow-primary"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        {t("companion.scan.startScan")}
                      </Button>
                      
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg max-w-md">
                        <p className="text-xs text-muted-foreground text-center">
                          💡 El QR debe contener el ID del token del servicio. Formato: COMPANYA-TOKEN-[ID]
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-500">{t("companion.scan.passVerified")}</p>
                      <p className="text-sm text-muted-foreground">{t("companion.scan.completeDetails")}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="silverName">{t("companion.scan.silverName")}</Label>
                    <Input
                      id="silverName"
                      value={sessionData.silverName}
                      onChange={(e) => setSessionData({ ...sessionData, silverName: e.target.value })}
                      placeholder={t("companion.scan.silverNamePlaceholder")}
                      required
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">{t("companion.scan.autoFromPass")}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">{t("companion.scan.activity")}</Label>
                    <Input
                      id="activity"
                      value={sessionData.activity}
                      onChange={(e) => setSessionData({ ...sessionData, activity: e.target.value })}
                      placeholder={t("companion.scan.activityPlaceholder")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">{t("companion.scan.duration")}</Label>
                    <Input
                      id="duration"
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="8"
                      value={sessionData.duration}
                      onChange={(e) => setSessionData({ ...sessionData, duration: e.target.value })}
                      placeholder="2.0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{t("companion.scan.notes")}</Label>
                    <Textarea
                      id="notes"
                      value={sessionData.notes}
                      onChange={(e) => setSessionData({ ...sessionData, notes: e.target.value })}
                      placeholder={t("companion.scan.notesPlaceholder")}
                      rows={3}
                    />
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">{t("companion.scan.onConfirm")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ {t("companion.scan.willRecord")}</li>
                      <li>✓ {t("companion.scan.willGenerateNft")}</li>
                      <li>✓ {t("companion.scan.willMarkTicket")}</li>
                      <li>✓ {t("companion.scan.willReceivePayment")}</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/acompanante/dashboard")}
                      className="flex-1"
                      disabled={contractLoading}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t("companion.scan.cancel")}
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 shadow-glow-primary"
                      disabled={contractLoading}
                    >
                      {contractLoading ? "Procesando..." : t("companion.scan.confirmRegister")}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcompananteScan;
