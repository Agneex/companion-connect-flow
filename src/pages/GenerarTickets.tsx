import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Plus, Trash2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TicketGenerator } from "@/components/TicketGenerator";
import { useToast } from "@/hooks/use-toast";

interface TicketData {
  tokenId: string;
  silverName: string;
  city: string;
}

const GenerarTickets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form for single ticket
  const [singleTicket, setSingleTicket] = useState<TicketData>({
    tokenId: "",
    silverName: "",
    city: "",
  });
  
  // Form for batch generation
  const [batchForm, setBatchForm] = useState({
    startTokenId: "",
    endTokenId: "",
    defaultCity: "Bogotá",
    silverNames: "",
  });

  const handleAddSingleTicket = () => {
    if (!singleTicket.tokenId || !singleTicket.silverName || !singleTicket.city) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setTickets([...tickets, { ...singleTicket }]);
    setSingleTicket({ tokenId: "", silverName: "", city: "" });
    
    toast({
      title: "Ticket agregado",
      description: `Token #${singleTicket.tokenId} agregado a la lista`,
    });
  };

  const handleGenerateBatch = () => {
    const start = parseInt(batchForm.startTokenId);
    const end = parseInt(batchForm.endTokenId);
    
    if (isNaN(start) || isNaN(end) || start > end) {
      toast({
        title: "IDs inválidos",
        description: "Por favor ingresa un rango válido de token IDs",
        variant: "destructive",
      });
      return;
    }

    if (end - start > 100) {
      toast({
        title: "Límite excedido",
        description: "Por favor genera máximo 100 tickets a la vez",
        variant: "destructive",
      });
      return;
    }

    const names = batchForm.silverNames
      .split("\n")
      .filter(name => name.trim() !== "");

    const newTickets: TicketData[] = [];
    
    for (let i = start; i <= end; i++) {
      const nameIndex = i - start;
      const silverName = names[nameIndex] || `Silver Usuario ${i}`;
      
      newTickets.push({
        tokenId: i.toString(),
        silverName,
        city: batchForm.defaultCity,
      });
    }

    setTickets([...tickets, ...newTickets]);
    setBatchForm({
      ...batchForm,
      startTokenId: "",
      endTokenId: "",
      silverNames: "",
    });
    
    toast({
      title: "Tickets generados",
      description: `${newTickets.length} tickets agregados a la lista`,
    });
  };

  const handleRemoveTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const csv = [
      "Token ID,Nombre Silver,Ciudad,QR Data",
      ...tickets.map(t => `${t.tokenId},${t.silverName},${t.city},COMPANYA-TOKEN-${t.tokenId}`)
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `companya-tickets-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "CSV descargado",
      description: "Lista de tickets exportada exitosamente",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          {!showPreview ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Button>
                
                <h1 className="text-4xl font-bold mb-2">Generar Tickets</h1>
                <p className="text-muted-foreground">
                  Crea tickets físicos con códigos QR para distribuir a los usuarios
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Single Ticket Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Agregar Ticket Individual</CardTitle>
                    <CardDescription>
                      Crea un ticket específico con datos personalizados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokenId">Token ID</Label>
                      <Input
                        id="tokenId"
                        type="number"
                        placeholder="1"
                        value={singleTicket.tokenId}
                        onChange={(e) => setSingleTicket({ ...singleTicket, tokenId: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="silverName">Nombre del Silver</Label>
                      <Input
                        id="silverName"
                        placeholder="María González"
                        value={singleTicket.silverName}
                        onChange={(e) => setSingleTicket({ ...singleTicket, silverName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        placeholder="Bogotá"
                        value={singleTicket.city}
                        onChange={(e) => setSingleTicket({ ...singleTicket, city: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleAddSingleTicket} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Ticket
                    </Button>
                  </CardContent>
                </Card>

                {/* Batch Generation Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Generar en Lote</CardTitle>
                    <CardDescription>
                      Crea múltiples tickets a la vez con un rango de IDs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startId">Token ID inicial</Label>
                        <Input
                          id="startId"
                          type="number"
                          placeholder="1"
                          value={batchForm.startTokenId}
                          onChange={(e) => setBatchForm({ ...batchForm, startTokenId: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endId">Token ID final</Label>
                        <Input
                          id="endId"
                          type="number"
                          placeholder="10"
                          value={batchForm.endTokenId}
                          onChange={(e) => setBatchForm({ ...batchForm, endTokenId: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defaultCity">Ciudad por defecto</Label>
                      <Input
                        id="defaultCity"
                        placeholder="Bogotá"
                        value={batchForm.defaultCity}
                        onChange={(e) => setBatchForm({ ...batchForm, defaultCity: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="silverNames">
                        Nombres de Silver (uno por línea, opcional)
                      </Label>
                      <Textarea
                        id="silverNames"
                        placeholder="María González&#10;Juan Pérez&#10;Ana López"
                        rows={4}
                        value={batchForm.silverNames}
                        onChange={(e) => setBatchForm({ ...batchForm, silverNames: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Si no especificas nombres, se generarán automáticamente
                      </p>
                    </div>

                    <Button onClick={handleGenerateBatch} className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Generar Lote
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Tickets List */}
              {tickets.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Tickets Generados ({tickets.length})</CardTitle>
                    <CardDescription>
                      Revisa los tickets antes de imprimir
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
                      {tickets.map((ticket, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-semibold">Token #{ticket.tokenId}</p>
                            <p className="text-sm text-muted-foreground">
                              {ticket.silverName} • {ticket.city}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTicket(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => setShowPreview(true)} 
                        className="flex-1"
                      >
                        Ver Vista Previa e Imprimir
                      </Button>
                      <Button 
                        onClick={handleDownloadCSV}
                        variant="outline"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exportar CSV
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <>
              {/* Preview Header */}
              <div className="mb-8 no-print">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a editar
                </Button>
                
                <h1 className="text-4xl font-bold mb-2">Vista Previa de Tickets</h1>
                <p className="text-muted-foreground">
                  {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} listos para imprimir
                </p>
              </div>

              {/* Ticket Generator Component */}
              <TicketGenerator tickets={tickets} onPrint={handlePrint} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GenerarTickets;
