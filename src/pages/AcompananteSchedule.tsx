import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, isSameDay, addDays, isToday, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, User, Phone, Plus, List, CalendarDays, ArrowRight, CheckCircle2 } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Provider";
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
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

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
      const sessions = parsed.map((s: any) => ({
        ...s,
        date: new Date(s.date),
      }));
      setScheduledSessions(sessions);
    } else {
      // Generate demo sessions
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
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const todaySessions = scheduledSessions.filter((s) => isToday(s.date));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">Confirmada</Badge>;
      case "pending":
        return <Badge variant="default" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20">Pendiente</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">Completada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get calendar days for current month view
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getSessionsForDay = (day: Date) => {
    return scheduledSessions.filter((s) => isSameDay(s.date, day));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
      <main className="pt-[120px]">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header with stats */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Mi Agenda</h1>
                <p className="text-muted-foreground">Gestiona tus sesiones de acompañamiento</p>
              </div>
              <Button asChild className="shadow-glow-primary">
                <Link to="/acompanante/scan">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Sesión
                </Link>
              </Button>
            </div>

            {/* Today's summary */}
            {todaySessions.length > 0 && (
              <Card className="border-primary/50 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <CalendarDays className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Hoy tienes {todaySessions.length} sesión(es) programada(s)</h3>
                      <p className="text-sm text-muted-foreground">
                        Primera sesión a las {todaySessions[0].time} con {todaySessions[0].silverName}
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link to="/acompanante/scan">
                        Ver detalles
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Sesiones</p>
                      <p className="text-3xl font-bold">{scheduledSessions.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Confirmadas</p>
                      <p className="text-3xl font-bold text-green-600">
                        {scheduledSessions.filter((s) => s.status === "confirmed").length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pendientes</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {scheduledSessions.filter((s) => s.status === "pending").length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* View toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "calendar" | "list")} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Vista Calendario
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Vista Lista
              </TabsTrigger>
            </TabsList>

            {/* Calendar View */}
            <TabsContent value="calendar" className="space-y-6 animate-fade-in">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Custom Calendar */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>{format(selectedDate, "MMMM yyyy", { locale: es })}</CardTitle>
                    <CardDescription>Haz clic en un día para ver las sesiones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {/* Day headers */}
                      {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar days */}
                      {calendarDays.map((day, idx) => {
                        const sessionsCount = getSessionsForDay(day).length;
                        const isSelected = isSameDay(day, selectedDate);
                        const isCurrentDay = isToday(day);

                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedDate(day)}
                            className={cn(
                              "aspect-square p-2 rounded-lg text-sm font-medium transition-all relative",
                              "hover:bg-muted hover:scale-105",
                              isSelected && "bg-primary text-primary-foreground shadow-glow-primary",
                              !isSelected && isCurrentDay && "border-2 border-primary",
                              !isSameMonth(day, selectedDate) && "text-muted-foreground/50"
                            )}
                          >
                            <span>{format(day, "d")}</span>
                            {sessionsCount > 0 && (
                              <div className={cn(
                                "absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5",
                              )}>
                                {Array.from({ length: Math.min(sessionsCount, 3) }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={cn(
                                      "w-1 h-1 rounded-full",
                                      isSelected ? "bg-primary-foreground" : "bg-primary"
                                    )}
                                  />
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected day sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isToday(selectedDate) ? "Hoy" : format(selectedDate, "d MMM", { locale: es })}
                    </CardTitle>
                    <CardDescription>
                      {sessionsForSelectedDate.length} sesión(es)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {sessionsForSelectedDate.length === 0 ? (
                      <div className="text-center py-8">
                        <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                        <p className="text-sm text-muted-foreground">Sin sesiones</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {sessionsForSelectedDate.map((session, idx) => (
                          <div
                            key={session.id}
                            className="relative pl-6 pb-4 border-l-2 border-border last:pb-0 last:border-l-0 animate-fade-in"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">{session.time}</span>
                                {getStatusBadge(session.status)}
                              </div>
                              <p className="font-medium">{session.silverName}</p>
                              <p className="text-sm text-muted-foreground">{session.activity}</p>
                              
                              {session.status === "confirmed" && isToday(session.date) && (
                                <Button asChild size="sm" className="w-full mt-2">
                                  <Link to="/acompanante/scan">
                                    Iniciar sesión
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list" className="space-y-4 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Sesiones</CardTitle>
                  <CardDescription>Todas tus sesiones ordenadas cronológicamente</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length === 0 ? (
                    <div className="text-center py-12">
                      <List className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No tienes sesiones programadas</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingSessions.map((session, idx) => (
                        <div
                          key={session.id}
                          className="p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all animate-fade-in"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Date badge */}
                            <div className="flex-shrink-0">
                              <div className={cn(
                                "w-20 h-20 rounded-xl flex flex-col items-center justify-center",
                                isToday(session.date) ? "bg-primary text-primary-foreground" : "bg-muted"
                              )}>
                                <span className="text-xs font-semibold uppercase">
                                  {format(session.date, "MMM", { locale: es })}
                                </span>
                                <span className="text-2xl font-bold">
                                  {format(session.date, "d")}
                                </span>
                                <span className="text-xs">
                                  {session.time}
                                </span>
                              </div>
                            </div>

                            {/* Session info */}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-semibold text-lg">{session.silverName}</h4>
                                  <p className="text-sm text-muted-foreground">{session.activity}</p>
                                </div>
                                {getStatusBadge(session.status)}
                              </div>

                              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="w-4 h-4 flex-shrink-0" />
                                  <span>{session.duration}h de duración</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="w-4 h-4 flex-shrink-0" />
                                  <span>{session.silverPhone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span>{session.location}</span>
                                </div>
                              </div>

                              {session.notes && (
                                <div className="bg-muted/50 p-3 rounded-md mt-2">
                                  <p className="text-xs font-semibold mb-1">Notas:</p>
                                  <p className="text-sm">{session.notes}</p>
                                </div>
                              )}

                              {session.status === "confirmed" && isToday(session.date) && (
                                <Button asChild className="w-full sm:w-auto mt-2">
                                  <Link to="/acompanante/scan">
                                    Iniciar sesión y escanear QR
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcompananteSchedule;
