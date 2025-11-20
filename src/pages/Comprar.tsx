import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, CheckCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const Comprar = () => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("");

  const tickets = [
    { id: "3", name: "Tiquetera 3 acompañamientos", visits: "3 visitas", price: "€90", description: "Perfecto para comenzar" },
    { id: "5", name: "Tiquetera 5 acompañamientos", visits: "5 visitas", price: "€140", description: "Opción más popular", popular: true },
    { id: "10", name: "Tiquetera 10 acompañamientos", visits: "10 visitas", price: "€250", description: "Mejor valor" },
    { id: "monthly", name: "Programa mensual", visits: "1 visita semanal", price: "€120/mes", description: "Acompañamiento continuo" }
  ];

  const steps = [
    { number: 1, label: "Tipo de tiquetera" },
    { number: 2, label: "¿Para quién?" },
    { number: 3, label: "Resumen" },
    { number: 4, label: "Pago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground">
              Compra compañía real para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary glow-text">
                quienes más te importan
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Elige un programa, indica a quién va dirigida la tiquetera y nosotros nos encargamos 
              de que se transforme en tiempo de calidad con acompañantes verificados.
            </p>
          </div>
        </div>
      </section>

      {/* Purchase flow */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Stepper */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {steps.map((s, index) => (
                  <div key={s.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                        step >= s.number 
                          ? "bg-gradient-secondary text-primary-foreground shadow-glow-primary" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {s.number}
                      </div>
                      <span className="text-sm mt-2 text-muted-foreground">{s.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "h-0.5 flex-1 transition-all",
                        step > s.number ? "bg-primary" : "bg-border"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Card className="glass-effect border-border shadow-elevated">
              <CardContent className="p-8">
                {/* Step 1: Select ticket type */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Selecciona el tipo de tiquetera</h2>
                      <p className="text-muted-foreground">Elige cuántos acompañamientos quieres incluir</p>
                    </div>

                    <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket}>
                      <div className="grid md:grid-cols-2 gap-4">
                        {tickets.map((ticket) => (
                          <Label
                            key={ticket.id}
                            htmlFor={ticket.id}
                            className={cn(
                              "relative cursor-pointer hover-lift",
                              selectedTicket === ticket.id && "ring-2 ring-primary shadow-glow-primary"
                            )}
                          >
                            <Card className="glass-effect border-border hover:border-primary/50 transition-all group">
                              <CardContent className="p-6 space-y-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                                {ticket.popular && (
                                  <div className="absolute -top-3 right-4 bg-gradient-secondary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-glow-primary animate-pulse">
                                    Más popular
                                  </div>
                                )}
                                <RadioGroupItem value={ticket.id} id={ticket.id} className="sr-only" />
                                <div className="flex items-baseline justify-between relative z-10">
                                  <h3 className="font-semibold text-foreground">{ticket.visits}</h3>
                                  <span className="text-2xl font-bold text-primary">{ticket.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground relative z-10">{ticket.description}</p>
                              </CardContent>
                            </Card>
                          </Label>
                        ))}
                      </div>
                    </RadioGroup>

                    <Button 
                      onClick={() => setStep(2)} 
                      disabled={!selectedTicket}
                      className="w-full shadow-glow-primary hover-lift relative overflow-hidden group"
                      size="lg"
                    >
                      <span className="relative z-10">Continuar</span>
                      <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </div>
                )}

                {/* Step 2: For whom */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">¿Para quién es?</h2>
                      <p className="text-muted-foreground">Indica el destinatario de la tiquetera</p>
                    </div>

                    <Tabs defaultValue="family" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="family">Para mi familia</TabsTrigger>
                        <TabsTrigger value="donate">Para donar</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="family" className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre del destinatario</Label>
                          <Input id="name" placeholder="Ej: María García" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country">País</Label>
                            <Input id="country" placeholder="Ej: España" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input id="city" placeholder="Ej: Barcelona" />
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 border border-border">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Nota:</span> Nuestro equipo te contactará 
                            para coordinar la entrega física de la tarjeta y la activación del programa.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="donate" className="space-y-4 mt-6">
                        <RadioGroup defaultValue="auto">
                          <div className="space-y-3">
                            <Label
                              htmlFor="auto"
                              className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                            >
                              <RadioGroupItem value="auto" id="auto" />
                              <div>
                                <div className="font-medium text-foreground">Dejar que Companya asigne</div>
                                <div className="text-sm text-muted-foreground">A quien más lo necesite</div>
                              </div>
                            </Label>
                            
                            <Label
                              htmlFor="program"
                              className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                            >
                              <RadioGroupItem value="program" id="program" />
                              <div>
                                <div className="font-medium text-foreground">Asignar a un programa específico</div>
                                <div className="text-sm text-muted-foreground">Municipio o fundación</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </TabsContent>
                    </Tabs>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1 hover-lift glass-effect">
                        Atrás
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1 shadow-glow-primary hover-lift relative overflow-hidden group">
                        <span className="relative z-10">Continuar</span>
                        <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Summary */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Resumen</h2>
                      <p className="text-muted-foreground">Revisa los detalles antes de pagar</p>
                    </div>

                    <div className="glass-effect rounded-lg p-6 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipo de tiquetera</span>
                        <span className="font-semibold text-foreground">5 acompañamientos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Destinatario</span>
                        <span className="font-semibold text-foreground">María García</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ubicación</span>
                        <span className="font-semibold text-foreground">Barcelona, España</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between text-lg">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-bold text-primary">€140</span>
                      </div>
                    </div>

                    <div className="glass-effect border border-border rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Lock className="text-primary" size={20} />
                          <span className="text-sm text-muted-foreground">Pago seguro</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Shield className="text-primary" size={20} />
                          <span className="text-sm text-muted-foreground">Acompañantes verificados</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="text-primary" size={20} />
                          <span className="text-sm text-muted-foreground">Trazabilidad web3</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1 hover-lift glass-effect">
                        Atrás
                      </Button>
                      <Button onClick={() => setStep(4)} className="flex-1 shadow-glow-primary hover-lift relative overflow-hidden group">
                        <span className="relative z-10">Ir al pago</span>
                        <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment (Success) */}
                {step === 4 && (
                  <div className="space-y-6 text-center py-8 animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto shadow-glow-primary animate-scale-in">
                      <CheckCircle className="text-primary-foreground" size={40} />
                    </div>
                    
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">¡Gracias!</h2>
                      <p className="text-xl text-muted-foreground">
                        Has activado compañía para María García
                      </p>
                    </div>

                    <div className="glass-effect rounded-lg p-6 text-left space-y-3">
                      <p className="text-sm text-muted-foreground">
                        En los próximos días, se emitirá la tarjeta/talonario físico y coordinaremos 
                        con un acompañante Companya.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Te avisaremos cuando la tarjeta se entregue y cuando se usen los primeros tickets.
                      </p>
                    </div>

                    <Button asChild className="shadow-glow-primary hover-lift relative overflow-hidden group">
                      <a href="/">
                        <span className="relative z-10">Volver al inicio</span>
                        <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Comprar;
