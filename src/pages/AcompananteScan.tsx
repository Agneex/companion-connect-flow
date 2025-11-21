import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Camera, CheckCircle2 } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { useToast } from "@/hooks/use-toast";

const AcompananteScan = () => {
  const { isConnected, isCompanion, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [sessionData, setSessionData] = useState({
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
    setScanning(true);
    
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      // Simulate scanned data
      setSessionData({
        ...sessionData,
        silverName: "María González",
      });
      toast({
        title: "¡QR escaneado!",
        description: "Pase verificado. Completa los detalles de la sesión.",
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save session to localStorage
    const sessions = JSON.parse(localStorage.getItem("companion_sessions") || "[]");
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      silverName: sessionData.silverName,
      activity: sessionData.activity,
      duration: parseFloat(sessionData.duration),
      notes: sessionData.notes,
      nftAwarded: true, // Simulate NFT awarding
    };
    
    sessions.unshift(newSession);
    localStorage.setItem("companion_sessions", JSON.stringify(sessions));
    
    toast({
      title: "¡Sesión registrada!",
      description: "Tu NFT será procesado en los próximos minutos.",
    });
    
    navigate("/acompanante/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-2xl">

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-3xl">Registrar sesión</CardTitle>
              <CardDescription>
                Escanea el QR del pase Companya para registrar la sesión de acompañamiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!scanned ? (
                <div className="flex flex-col items-center space-y-6 py-8">
                  <div className="relative">
                    <div className={`w-64 h-64 bg-muted/50 rounded-2xl flex items-center justify-center border-4 ${
                      scanning ? "border-primary animate-pulse" : "border-border"
                    }`}>
                      {scanning ? (
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                          <p className="text-sm font-medium">Escaneando...</p>
                          <div className="mt-4 flex justify-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                          </div>
                        </div>
                      ) : (
                        <QrCode className="w-20 h-20 text-muted-foreground" />
                      )}
                    </div>
                    
                    {scanning && (
                      <div className="absolute inset-0 border-4 border-primary rounded-2xl animate-ping opacity-75" />
                    )}
                  </div>

                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-semibold">
                      {scanning ? "Apunta al código QR del pase" : "Escanear código QR"}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      En producción, esto activará la cámara de tu dispositivo. Por ahora, simularemos el escaneo.
                    </p>
                  </div>

                  <Button 
                    onClick={handleStartScan}
                    disabled={scanning}
                    size="lg"
                    className="shadow-glow-primary"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    {scanning ? "Escaneando..." : "Iniciar escaneo"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-500">Pase verificado</p>
                      <p className="text-sm text-muted-foreground">Completa los datos de la sesión</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="silverName">Nombre del adulto mayor</Label>
                    <Input
                      id="silverName"
                      value={sessionData.silverName}
                      onChange={(e) => setSessionData({ ...sessionData, silverName: e.target.value })}
                      placeholder="Nombre completo"
                      required
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Obtenido automáticamente del pase</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">Actividad realizada</Label>
                    <Input
                      id="activity"
                      value={sessionData.activity}
                      onChange={(e) => setSessionData({ ...sessionData, activity: e.target.value })}
                      placeholder="Ej: Acompañamiento a consulta médica"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración (horas)</Label>
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
                    <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={sessionData.notes}
                      onChange={(e) => setSessionData({ ...sessionData, notes: e.target.value })}
                      placeholder="Cualquier observación relevante sobre la sesión..."
                      rows={3}
                    />
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Al confirmar:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ La sesión se registrará en blockchain</li>
                      <li>✓ Se generará un NFT de reputación</li>
                      <li>✓ Se marcará un ticket como usado</li>
                      <li>✓ Recibirás tu compensación económica</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setScanned(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 shadow-glow-primary"
                    >
                      Confirmar y registrar
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
