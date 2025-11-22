import { useState, useEffect, useRef } from "react";
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
import { Html5Qrcode } from "html5-qrcode";
import { supabase } from "@/integrations/supabase/client";
import { useAccount } from "wagmi";

const AcompananteScan = () => {
  const { isConnected, isCompanion, disconnectWallet } = useWeb3();
  const { address } = useAccount();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [sessionData, setSessionData] = useState({
    tokenId: "",
    silverName: "",
    city: "",
    activity: "",
    duration: "",
    notes: "",
  });
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if running in iframe
    setIsInIframe(window.self !== window.top);
  }, []);

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  if (!isConnected || !isCompanion) {
    navigate("/acompanante/login");
    return null;
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const handleStartScan = async () => {
    // If in iframe, open in new window instead
    if (isInIframe) {
      const currentUrl = window.location.href;
      window.open(currentUrl, '_blank');
      toast({
        title: "Abriendo scanner",
        description: "El scanner se abrirá en una nueva pestaña con acceso a la cámara",
      });
      return;
    }

    setScanning(true);
    
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // QR scanned successfully
          html5QrCode.stop().then(() => {
            try {
              const qrData = JSON.parse(decodedText);
              setSessionData({
                ...sessionData,
                tokenId: qrData.tokenId,
                silverName: qrData.silverName,
                city: qrData.city,
              });
              setScanned(true);
              setScanning(false);
              toast({
                title: t("companion.scan.qrScanned"),
                description: `Token ID: ${qrData.tokenId}`,
              });
            } catch (error) {
              toast({
                title: "Error",
                description: "QR inválido. Formato esperado: {tokenId, silverName, city}",
                variant: "destructive",
              });
              setScanning(false);
            }
          });
        },
        (errorMessage) => {
          // Scanning in progress, ignore errors
        }
      );
    } catch (error) {
      console.error("Error starting scanner:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      
      toast({
        title: "Error al acceder a la cámara",
        description: isInIframe 
          ? "Abre esta página en una nueva pestaña para usar la cámara" 
          : "Verifica los permisos de cámara en tu navegador",
        variant: "destructive",
      });
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(console.error);
    }
    setScanning(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast({
        title: "Error",
        description: "Wallet no conectada",
        variant: "destructive",
      });
      return;
    }

    setTransferring(true);

    try {
      // Call edge function to transfer NFT
      const { data, error } = await supabase.functions.invoke('transfer-nft', {
        body: {
          tokenId: sessionData.tokenId,
          companionWallet: address,
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      // Save session to localStorage
      const sessions = JSON.parse(localStorage.getItem("companion_sessions") || "[]");
      const newSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        tokenId: sessionData.tokenId,
        silverName: sessionData.silverName,
        city: sessionData.city,
        activity: sessionData.activity,
        duration: parseFloat(sessionData.duration),
        notes: sessionData.notes,
        nftAwarded: true,
        transactionHash: data.transactionHash,
      };
      
      sessions.unshift(newSession);
      localStorage.setItem("companion_sessions", JSON.stringify(sessions));
      
      toast({
        title: t("companion.scan.sessionRegistered"),
        description: `NFT transferido exitosamente. TX: ${data.transactionHash.slice(0, 10)}...`,
      });
      
      navigate("/acompanante/dashboard");
    } catch (error) {
      console.error("Error transferring NFT:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al transferir NFT",
        variant: "destructive",
      });
    } finally {
      setTransferring(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
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
                  <div className="relative w-full max-w-md">
                    {scanning ? (
                      <div>
                        <div id="qr-reader" className="rounded-2xl overflow-hidden border-4 border-primary"></div>
                        <div className="text-center mt-4">
                          <p className="text-sm font-medium">{t("companion.scan.scanning")}</p>
                          <p className="text-xs text-muted-foreground mt-2">Apunta la cámara al código QR</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-muted/50 rounded-2xl flex items-center justify-center border-4 border-border">
                        <QrCode className="w-20 h-20 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-semibold">
                      {scanning ? "Escaneando..." : t("companion.scan.scanQr")}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {scanning 
                        ? "Coloca el QR del ticket frente a la cámara" 
                        : "Escanea el código QR del ticket de acompañamiento"}
                    </p>
                    {isInIframe && (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mt-2">
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          ℹ️ Para usar la cámara, se abrirá en una nueva pestaña
                        </p>
                      </div>
                    )}
                  </div>

                  {scanning ? (
                    <Button 
                      onClick={stopScanning}
                      variant="outline"
                      size="lg"
                    >
                      Cancelar
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleStartScan}
                      size="lg"
                      className="shadow-glow-primary"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      {t("companion.scan.startScan")}
                    </Button>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Token ID</Label>
                      <Input value={sessionData.tokenId} disabled />
                      <p className="text-xs text-muted-foreground">Del QR escaneado</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Ciudad</Label>
                      <Input value={sessionData.city} disabled />
                      <p className="text-xs text-muted-foreground">Del QR escaneado</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="silverName">{t("companion.scan.silverName")}</Label>
                    <Input
                      id="silverName"
                      value={sessionData.silverName}
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
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t("companion.scan.cancel")}
                    </Button>
                    <Button 
                      type="submit"
                      disabled={transferring}
                      className="flex-1 shadow-glow-primary"
                    >
                      {transferring ? "Transfiriendo NFT..." : t("companion.scan.confirmRegister")}
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
