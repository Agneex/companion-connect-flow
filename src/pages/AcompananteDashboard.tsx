import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, QrCode, Award, TrendingUp, Clock, CheckCircle2, Wallet, ArrowDownToLine, CreditCard, Loader2 } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Session {
  id: string;
  date: string;
  silverName: string;
  activity: string;
  duration: number;
  nftAwarded: boolean;
}

const AcompananteDashboard = () => {
  const { account, isConnected, isCompanion, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalNFTs: 0,
    totalHours: 0,
    monthlyEarnings: 0,
  });
  const [showFundsDialog, setShowFundsDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStep, setTransactionStep] = useState<"idle" | "confirming" | "processing" | "success">("idle");

  useEffect(() => {
    if (!isConnected || !isCompanion) {
      navigate("/acompanante/login");
      return;
    }

    // Load sessions from localStorage or create demo data
    let savedSessions = JSON.parse(localStorage.getItem("companion_sessions") || "[]");
    
    // If no sessions exist, create demo sessions
    if (savedSessions.length === 0) {
      const demoSessions: Session[] = [
        {
          id: "1",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "María González",
          activity: "Acompañamiento a cita médica",
          duration: 2.5,
          nftAwarded: true,
        },
        {
          id: "2",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "José Martínez",
          activity: "Compras en supermercado",
          duration: 1.5,
          nftAwarded: true,
        },
        {
          id: "3",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "Ana López",
          activity: "Paseo por el parque",
          duration: 2,
          nftAwarded: true,
        },
        {
          id: "4",
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "Carlos Rodríguez",
          activity: "Videollamada con familia",
          duration: 1,
          nftAwarded: true,
        },
        {
          id: "5",
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "María González",
          activity: "Lectura y conversación",
          duration: 1.5,
          nftAwarded: true,
        },
        {
          id: "6",
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "Roberto Silva",
          activity: "Trámite bancario",
          duration: 2,
          nftAwarded: true,
        },
        {
          id: "7",
          date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "Elena Torres",
          activity: "Acompañamiento social",
          duration: 2.5,
          nftAwarded: true,
        },
        {
          id: "8",
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          silverName: "José Martínez",
          activity: "Cita con especialista",
          duration: 3,
          nftAwarded: true,
        },
      ];
      
      savedSessions = demoSessions;
      localStorage.setItem("companion_sessions", JSON.stringify(demoSessions));
    }
    
    setSessions(savedSessions);

    // Calculate stats
    const totalSessions = savedSessions.length;
    const totalNFTs = savedSessions.filter((s: Session) => s.nftAwarded).length;
    const totalHours = savedSessions.reduce((sum: number, s: Session) => sum + s.duration, 0);
    const monthlyEarnings = totalSessions * 25; // $25 per session

    setStats({ totalSessions, totalNFTs, totalHours, monthlyEarnings });
  }, [isConnected, isCompanion, navigate]);

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  const handleWithdraw = async () => {
    setTransactionStep("confirming");
    setIsProcessing(true);

    // Simulate wallet confirmation
    setTimeout(() => {
      setTransactionStep("processing");
      
      // Simulate blockchain transaction
      setTimeout(() => {
        setTransactionStep("success");
        setIsProcessing(false);
        
        toast.success("Retiro exitoso", {
          description: `$${stats.monthlyEarnings} transferidos a tu wallet`,
        });

        setTimeout(() => {
          setShowFundsDialog(false);
          setTransactionStep("idle");
        }, 2000);
      }, 3000);
    }, 2000);
  };

  const handleUse = async () => {
    setTransactionStep("confirming");
    setIsProcessing(true);

    // Simulate wallet confirmation
    setTimeout(() => {
      setTransactionStep("processing");
      
      // Simulate blockchain transaction
      setTimeout(() => {
        setTransactionStep("success");
        setIsProcessing(false);
        
        toast.success("Fondos utilizados", {
          description: "Transacción completada exitosamente",
        });

        setTimeout(() => {
          setShowFundsDialog(false);
          setTransactionStep("idle");
        }, 2000);
      }, 3000);
    }, 2000);
  };

  const recentSessions = sessions.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
      <main className="pt-[120px]">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Dashboard de Acompañante
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus sesiones, escanea QR y revisa tus recompensas NFT
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="glass-effect border-primary/50 hover:shadow-glow-primary transition-all cursor-pointer">
              <Link to="/acompanante/scan">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-14 h-14 bg-gradient-secondary rounded-xl flex items-center justify-center">
                    <QrCode className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Escanear QR</h3>
                    <p className="text-sm text-muted-foreground">Registrar nueva sesión</p>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="glass-effect hover:border-primary/50 transition-all cursor-pointer">
              <Link to="/acompanante/schedule">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Mi Agenda</h3>
                    <p className="text-sm text-muted-foreground">Ver próximas sesiones</p>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="glass-effect hover:border-primary/50 transition-all cursor-pointer">
              <Link to="/acompanante/nfts">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Mis NFTs</h3>
                    <p className="text-sm text-muted-foreground">Ver colección</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stats.totalSessions}</p>
                <p className="text-sm text-muted-foreground">Sesiones completadas</p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stats.totalNFTs}</p>
                <p className="text-sm text-muted-foreground">NFTs ganados</p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stats.totalHours}h</p>
                <p className="text-sm text-muted-foreground">Horas de compañía</p>
              </CardContent>
            </Card>

            <Card 
              className="glass-effect border-primary/50 cursor-pointer hover:shadow-glow-primary transition-all"
              onClick={() => setShowFundsDialog(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Wallet className="w-8 h-8 text-primary" />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs text-primary hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFundsDialog(true);
                    }}
                  >
                    Ver fondos
                  </Button>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">${stats.monthlyEarnings}</p>
                <p className="text-sm text-muted-foreground">Fondos disponibles</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sessions */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Sesiones recientes</CardTitle>
              <CardDescription>
                Tus últimas sesiones de acompañamiento registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hay sesiones aún</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Escanea el QR de un pase Companya para registrar tu primera sesión
                  </p>
                  <Button asChild>
                    <Link to="/acompanante/scan">
                      <QrCode className="w-4 h-4 mr-2" />
                      Escanear QR ahora
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div 
                      key={session.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{session.silverName}</h4>
                          <p className="text-sm text-muted-foreground">{session.activity}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date(session.date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {session.duration}h
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {session.nftAwarded ? (
                          <Badge className="bg-gradient-secondary">
                            <Award className="w-3 h-3 mr-1" />
                            NFT otorgado
                          </Badge>
                        ) : (
                          <Badge variant="outline">Procesando NFT</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {sessions.length > 5 && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/acompanante/history">Ver todas las sesiones</Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Funds Management Dialog */}
      <Dialog open={showFundsDialog} onOpenChange={setShowFundsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Gestionar Fondos
            </DialogTitle>
            <DialogDescription>
              Retira tus ganancias a tu wallet o utilízalas en la plataforma
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Balance Display */}
            <div className="bg-gradient-secondary rounded-lg p-6 text-center">
              <p className="text-sm text-primary-foreground/70 mb-2">Balance disponible</p>
              <p className="text-4xl font-bold text-primary-foreground">${stats.monthlyEarnings}</p>
              <p className="text-xs text-primary-foreground/60 mt-2">≈ {(stats.monthlyEarnings * 0.0003).toFixed(4)} ETH</p>
            </div>

            {transactionStep === "idle" && (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{stats.totalSessions}</p>
                    <p className="text-xs text-muted-foreground">Sesiones</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{stats.totalHours}h</p>
                    <p className="text-xs text-muted-foreground">Horas totales</p>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full shadow-glow-primary" 
                    size="lg"
                    onClick={handleWithdraw}
                    disabled={stats.monthlyEarnings === 0}
                  >
                    <ArrowDownToLine className="w-5 h-5 mr-2" />
                    Retirar a Wallet
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={handleUse}
                    disabled={stats.monthlyEarnings === 0}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Utilizar en Plataforma
                  </Button>
                </div>

                {/* Info */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Gas estimado:</strong> ~0.0001 ETH (~$0.20)
                    <br />
                    <strong>Tiempo estimado:</strong> 30-60 segundos
                  </p>
                </div>
              </>
            )}

            {transactionStep === "confirming" && (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="font-semibold text-lg mb-2">Confirma en tu wallet</p>
                <p className="text-sm text-muted-foreground">
                  Revisa los detalles de la transacción en tu wallet y confirma
                </p>
              </div>
            )}

            {transactionStep === "processing" && (
              <div className="text-center py-8">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="font-semibold text-lg mb-2">Procesando transacción</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Tu transacción está siendo confirmada en la blockchain
                </p>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-mono">
                    TX: 0x742d...5f0bEb
                  </p>
                </div>
              </div>
            )}

            {transactionStep === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <p className="font-semibold text-lg mb-2">¡Transacción exitosa!</p>
                <p className="text-sm text-muted-foreground">
                  Tu operación ha sido completada con éxito
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcompananteDashboard;
