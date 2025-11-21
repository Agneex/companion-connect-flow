import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, isSameDay, addDays, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, User, Phone, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ScheduledSession {
  id: string;
  date: Date;
  time: string;
  silverName: string;
  silverPhone: string;
  activity: string;
  location: string;
  duration: number;
  status: "confirmed" | "pending" | "completed";
  notes?: string;
}

const AcompananteSchedule = () => {
  const { isConnected, isCompanion, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [scheduledSessions, setScheduledSessions] = useState<ScheduledSession[]>([]);

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  useEffect(() => {
    if (!isConnected || !isCompanion) {
      navigate("/acompanante/login");
      return;
    }

    // Load scheduled sessions from localStorage
    const saved = localStorage.getItem("scheduled_sessions");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      const sessions = parsed.map((s: any) => ({
        ...s,
        date: new Date(s.date),
      }));
      setScheduledSessions(sessions);
    } else {
      // Generate some demo sessions
      const demoSessions: ScheduledSession[] = [
        {
          id: "1",
          date: new Date(),
          time: "10:00",
          silverName: "María González",
          silverPhone: "+57 300 123 4567",
          activity: "Consulta médica",
          location: "Hospital San José, Bogotá",
          duration: 2,
          status: "confirmed",
          notes: "Llevar documentos médicos",
        },
        {
          id: "2",
          date: addDays(new Date(), 1),
          time: "15:00",
          silverName: "Carlos Ramírez",
          silverPhone: "+57 301 987 6543",
          activity: "Paseo en el parque",
          location: "Parque Simón Bolívar",
          duration: 1.5,
          status: "confirmed",
        },
        {
          id: "3",
          date: addDays(new Date(), 2),
          time: "11:00",
          silverName: "Ana López",
          silverPhone: "+57 302 456 7890",
          activity: "Compras supermercado",
          location: "Éxito Calle 80",
          duration: 2,
          status: "pending",
        },
        {
          id: "4",
          date: addDays(new Date(), 5),
          time: "09:00",
          silverName: "Roberto Silva",
          silverPhone: "+57 303 321 9876",
          activity: "Trámite bancario",
          location: "Banco de Bogotá, Centro",
          duration: 1,
          status: "confirmed",
        },
      ];
      setScheduledSessions(demoSessions);
      localStorage.setItem("scheduled_sessions", JSON.stringify(demoSessions));
    }
  }, [isConnected, isCompanion, navigate]);

  const sessionsForSelectedDate = scheduledSessions.filter((session) =>
    isSameDay(session.date, selectedDate)
  );

  const upcomingSessions = scheduledSessions
    .filter((s) => s.date >= new Date() && s.status !== "completed")
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  // Get dates that have sessions for calendar highlighting
  const datesWithSessions = scheduledSessions.map((s) => s.date);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completada";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DashboardNav onLogout={handleLogout} />
      
      <main className="lg:ml-64 pt-16 lg:pt-16">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Calendario de Sesiones</CardTitle>
                <CardDescription>
                  Selecciona una fecha para ver las sesiones programadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  locale={es}
                  className={cn("rounded-md border pointer-events-auto mx-auto")}
                  modifiers={{
                    hasSession: datesWithSessions,
                  }}
                  modifiersClassNames={{
                    hasSession: "bg-primary/20 font-bold",
                  }}
                />
              </CardContent>
            </Card>

            {/* Sessions for selected date */}
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Sesiones para {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}
                    </CardTitle>
                    <CardDescription>
                      {sessionsForSelectedDate.length === 0
                        ? "No hay sesiones programadas"
                        : `${sessionsForSelectedDate.length} sesión(es) programada(s)`}
                    </CardDescription>
                  </div>
                  {isToday(selectedDate) && (
                    <Badge className="bg-gradient-secondary">Hoy</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {sessionsForSelectedDate.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No tienes sesiones programadas para esta fecha
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessionsForSelectedDate.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                              <User className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{session.silverName}</h4>
                              <p className="text-sm text-muted-foreground">{session.activity}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(session.status)}>
                            {getStatusText(session.status)}
                          </Badge>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{session.time} ({session.duration}h)</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{session.silverPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                            <MapPin className="w-4 h-4" />
                            <span>{session.location}</span>
                          </div>
                        </div>

                        {session.notes && (
                          <div className="bg-muted/50 p-3 rounded-md">
                            <p className="text-xs font-semibold mb-1">Notas:</p>
                            <p className="text-sm text-muted-foreground">{session.notes}</p>
                          </div>
                        )}

                        {session.status === "confirmed" && isToday(session.date) && (
                          <Button asChild className="w-full">
                            <Link to="/acompanante/scan">
                              Iniciar sesión y escanear QR
                            </Link>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions Sidebar */}
          <div className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg">Próximas Sesiones</CardTitle>
                <CardDescription>
                  Tus próximas {upcomingSessions.length} citas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      No tienes sesiones próximas
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => setSelectedDate(session.date)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex flex-col items-center justify-center">
                              <span className="text-xs font-semibold text-primary">
                                {format(session.date, "MMM", { locale: es })}
                              </span>
                              <span className="text-sm font-bold text-primary">
                                {format(session.date, "d")}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {session.silverName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {session.activity}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {session.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas del Mes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total sesiones</span>
                  <span className="text-2xl font-bold">{scheduledSessions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confirmadas</span>
                  <span className="text-2xl font-bold text-green-500">
                    {scheduledSessions.filter((s) => s.status === "confirmed").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pendientes</span>
                  <span className="text-2xl font-bold text-yellow-500">
                    {scheduledSessions.filter((s) => s.status === "pending").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-effect border-primary/50">
              <CardContent className="p-6 space-y-3">
                <Button asChild className="w-full shadow-glow-primary">
                  <Link to="/acompanante/scan">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar nueva sesión
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/acompanante/dashboard">
                    Ver dashboard completo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcompananteSchedule;
