import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ExternalLink, 
  Plus,
  Calendar,
  User,
  MapPin,
  Activity,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

interface Ticket {
  id: string;
  ticketNumber: number;
  status: "available" | "used" | "pending";
  sessionDate?: Date;
  activity?: string;
  companionName?: string;
  silverName?: string;
  location?: string;
  duration?: number;
  transactionHash?: string;
  nftTokenId?: number;
}

interface Tiquetera {
  contractId: string;
  purchaseDate: Date;
  totalTickets: number;
  availableTickets: number;
  usedTickets: number;
  pendingTickets: number;
  recipientName: string;
  city: string;
  tickets: Ticket[];
}

const ValidarTiquetera = () => {
  const [contractId, setContractId] = useState("");
  const [tiquetera, setTiquetera] = useState<Tiquetera | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAddingTicket, setIsAddingTicket] = useState(false);

  const handleSearch = async () => {
    if (!contractId.trim()) {
      toast.error("Por favor ingresa un ID de contrato");
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo data
      const demoTiquetera: Tiquetera = {
        contractId: contractId,
        purchaseDate: new Date("2024-01-15"),
        totalTickets: 10,
        availableTickets: 5,
        usedTickets: 3,
        pendingTickets: 2,
        recipientName: "María González",
        city: "Bogotá",
        tickets: [
          {
            id: "1",
            ticketNumber: 1,
            status: "used",
            sessionDate: new Date("2024-01-20"),
            activity: "Acompañamiento a cita médica",
            companionName: "Ana López",
            silverName: "María González",
            location: "Hospital San José, Bogotá",
            duration: 2.5,
            transactionHash: "0x1234...abcd",
            nftTokenId: 1001,
          },
          {
            id: "2",
            ticketNumber: 2,
            status: "used",
            sessionDate: new Date("2024-01-25"),
            activity: "Compras en supermercado",
            companionName: "Carlos Ramírez",
            silverName: "María González",
            location: "Éxito Calle 80",
            duration: 1.5,
            transactionHash: "0x5678...efgh",
            nftTokenId: 1002,
          },
          {
            id: "3",
            ticketNumber: 3,
            status: "used",
            sessionDate: new Date("2024-02-01"),
            activity: "Paseo por el parque",
            companionName: "Ana López",
            silverName: "María González",
            location: "Parque Simón Bolívar",
            duration: 2,
            transactionHash: "0x9abc...ijkl",
            nftTokenId: 1003,
          },
          {
            id: "4",
            ticketNumber: 4,
            status: "pending",
            sessionDate: new Date("2024-02-08"),
            activity: "Trámite bancario",
            companionName: "Carlos Ramírez",
            silverName: "María González",
            location: "Banco de Bogotá",
          },
          {
            id: "5",
            ticketNumber: 5,
            status: "pending",
            sessionDate: new Date("2024-02-10"),
            activity: "Videollamada con familia",
            companionName: "Ana López",
            silverName: "María González",
            location: "Domicilio",
          },
          ...Array.from({ length: 5 }, (_, i) => ({
            id: `${i + 6}`,
            ticketNumber: i + 6,
            status: "available" as const,
          })),
        ],
      };

      setTiquetera(demoTiquetera);
      setIsSearching(false);
      toast.success("Tiquetera encontrada");
    }, 1000);
  };

  const handleAddTicket = () => {
    toast.success("Ticket individual agregado exitosamente");
    setIsAddingTicket(false);
    // Aquí iría la lógica para agregar un ticket individual
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "used":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Usado
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
      case "available":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Disponible
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Validar Tiquetera
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Consulta el estado de tu tiquetera, revisa la trazabilidad de cada ticket y gestiona nuevos acompañamientos
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Buscar Tiquetera</CardTitle>
              <CardDescription>
                Ingresa el ID del contrato de tu tiquetera para ver el estado de tus tickets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="contract-id" className="sr-only">ID de Contrato</Label>
                  <Input
                    id="contract-id"
                    placeholder="Ej: 0x1234...abcd o COMP-2024-001"
                    value={contractId}
                    onChange={(e) => setContractId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="h-12"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  size="lg"
                  className="shadow-glow-primary"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {isSearching ? "Buscando..." : "Buscar"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Puedes encontrar el ID de contrato en el email de confirmación de compra o en tu pase físico
              </p>
            </CardContent>
          </Card>

          {/* Results */}
          {tiquetera && (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total Tickets</span>
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">{tiquetera.totalTickets}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Disponibles</span>
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{tiquetera.availableTickets}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Usados</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">{tiquetera.usedTickets}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Pendientes</span>
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">{tiquetera.pendingTickets}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tiquetera Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Información de la Tiquetera</CardTitle>
                      <CardDescription className="mt-1">
                        ID: {tiquetera.contractId}
                      </CardDescription>
                    </div>
                    <Dialog open={isAddingTicket} onOpenChange={setIsAddingTicket}>
                      <DialogTrigger asChild>
                        <Button className="shadow-glow-primary">
                          <Plus className="w-4 h-4 mr-2" />
                          Agregar Ticket Individual
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Agregar Ticket Individual</DialogTitle>
                          <DialogDescription>
                            Compra tickets adicionales para esta tiquetera
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Cantidad de tickets</Label>
                            <Input type="number" min="1" max="10" defaultValue="1" />
                          </div>
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <p className="text-sm font-semibold mb-2">Resumen de compra</p>
                            <div className="flex justify-between text-sm">
                              <span>1 ticket adicional</span>
                              <span className="font-semibold">$50.00</span>
                            </div>
                          </div>
                          <Button onClick={handleAddTicket} className="w-full">
                            Confirmar Compra
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Beneficiario</p>
                      <p className="font-semibold">{tiquetera.recipientName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Ciudad</p>
                      <p className="font-semibold">{tiquetera.city}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Fecha de Compra</p>
                      <p className="font-semibold">
                        {format(tiquetera.purchaseDate, "d 'de' MMMM, yyyy", { locale: es })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tickets Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle>Tickets de Acompañamiento</CardTitle>
                  <CardDescription>
                    Revisa el estado y trazabilidad de cada ticket
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">
                        Todos ({tiquetera.tickets.length})
                      </TabsTrigger>
                      <TabsTrigger value="available">
                        Disponibles ({tiquetera.availableTickets})
                      </TabsTrigger>
                      <TabsTrigger value="pending">
                        Pendientes ({tiquetera.pendingTickets})
                      </TabsTrigger>
                      <TabsTrigger value="used">
                        Usados ({tiquetera.usedTickets})
                      </TabsTrigger>
                    </TabsList>

                    {["all", "available", "pending", "used"].map((tab) => (
                      <TabsContent key={tab} value={tab} className="space-y-3">
                        {tiquetera.tickets
                          .filter((t) => tab === "all" || t.status === tab)
                          .map((ticket) => (
                            <Card
                              key={ticket.id}
                              className="hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                      <Badge variant="outline" className="font-mono">
                                        #{ticket.ticketNumber}
                                      </Badge>
                                      {getStatusBadge(ticket.status)}
                                    </div>

                                    {ticket.status !== "available" && (
                                      <div className="space-y-1 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <Calendar className="w-4 h-4" />
                                          <span>
                                            {ticket.sessionDate && 
                                              format(ticket.sessionDate, "d MMM yyyy", { locale: es })}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <User className="w-4 h-4" />
                                          <span>{ticket.companionName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <Activity className="w-4 h-4" />
                                          <span>{ticket.activity}</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {ticket.status === "used" && ticket.transactionHash && (
                                    <Button variant="ghost" size="sm">
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Ticket Detail Modal */}
          {selectedTicket && (
            <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    Ticket #{selectedTicket.ticketNumber}
                    {getStatusBadge(selectedTicket.status)}
                  </DialogTitle>
                  <DialogDescription>
                    Trazabilidad y detalles completos del ticket
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {selectedTicket.status !== "available" && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                            Detalles de la Sesión
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>
                                {selectedTicket.sessionDate && 
                                  format(selectedTicket.sessionDate, "d 'de' MMMM, yyyy", { locale: es })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>{selectedTicket.companionName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{selectedTicket.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-muted-foreground" />
                              <span>{selectedTicket.activity}</span>
                            </div>
                            {selectedTicket.duration && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{selectedTicket.duration} horas</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {selectedTicket.status === "used" && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                              Trazabilidad Blockchain
                            </h4>
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Transaction Hash
                                </p>
                                <p className="font-mono text-xs break-all">
                                  {selectedTicket.transactionHash}
                                </p>
                              </div>
                              {selectedTicket.nftTokenId && (
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    NFT Token ID
                                  </p>
                                  <p className="font-mono text-sm font-semibold">
                                    #{selectedTicket.nftTokenId}
                                  </p>
                                </div>
                              )}
                              <Button variant="outline" size="sm" className="w-full">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Ver en Block Explorer
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {selectedTicket.status === "used" && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-sm text-green-600 mb-1">
                                Sesión Verificada
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Esta sesión ha sido completada, verificada y registrada en blockchain. 
                                El acompañante ha recibido su NFT de reputación.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedTicket.status === "pending" && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-sm text-yellow-600 mb-1">
                                Sesión Programada
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Esta sesión está programada y pendiente de completar. Una vez finalizada, 
                                se registrará en blockchain automáticamente.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {selectedTicket.status === "available" && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center py-12">
                      <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-blue-600 mb-2">
                        Ticket Disponible
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Este ticket aún no ha sido asignado a ninguna sesión de acompañamiento.
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ValidarTiquetera;
