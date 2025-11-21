import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, QrCode, Award, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    if (!isConnected || !isCompanion) {
      navigate("/acompanante/login");
      return;
    }

    // Load sessions from localStorage
    const savedSessions = JSON.parse(localStorage.getItem("companion_sessions") || "[]");
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

  const recentSessions = sessions.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
      <main className="pt-16">
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

            <Card className="glass-effect border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">${stats.monthlyEarnings}</p>
                <p className="text-sm text-muted-foreground">Ganado este mes</p>
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
    </div>
  );
};

export default AcompananteDashboard;
