import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Calendar, Smartphone, Award, TrendingUp, Users, CheckCircle } from "lucide-react";

const Acompanante = () => {
  const steps = [
    {
      icon: Shield,
      title: "Te registras y verificas tu perfil",
      description: "Subes tus datos básicos y documentos. Nuestro equipo y la tecnología de verificación se encargan del resto."
    },
    {
      icon: Calendar,
      title: "Recibes asignaciones o atiendes a quienes traen tiqueteras",
      description: "Puedes ser parte de programas específicos o atender a quienes presenten su tarjeta Companya."
    },
    {
      icon: Smartphone,
      title: "Escaneas el QR en cada sesión",
      description: "Desde tu app, escaneas el QR de la tarjeta del adulto mayor. Eso marca el ticket como usado y registra la sesión."
    },
    {
      icon: Award,
      title: "Recibes NFTs/recompensas por tu acompañamiento",
      description: "Por cada sesión, recibes un NFT asociado. Es la prueba digital de tu trabajo, con valor económico y reputación verificable."
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Ingresos claros y programables",
      description: "Sabes exactamente cuántas sesiones has hecho, cuánto valen y cómo se pagan."
    },
    {
      icon: Award,
      title: "Reputación que te acompaña",
      description: "Tus NFTs demuestran tu experiencia y profesionalismo en la red, más allá de Companya."
    },
    {
      icon: Users,
      title: "Cuidado mutuo",
      description: "Trabajar con personas mayores puede ser emocionalmente intenso. Companya te ofrece recursos, comunidad y soporte."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-50" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Convierte tu vocación de acompañar en una{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary">
                red de impacto real
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Con Companya, cada sesión que brindas se registra, se reconoce y se recompensa. 
              Una plataforma web3 que respalda tu trabajo con personas mayores.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-glow-primary">
                Comenzar como acompañante
              </Button>
              <Button size="lg" variant="outline">
                Ver cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Tu día a día con Companya
            </h2>
            <p className="text-xl text-muted-foreground">
              4 pasos simples para comenzar a generar impacto
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform flex-shrink-0">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-16 bg-border my-2" />
                    )}
                  </div>
                  
                  <Card className="flex-grow bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Por qué a ti te conviene
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-glow-primary">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portal mockup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Cómo se ve tu portal
            </h2>
            <p className="text-xl text-muted-foreground">
              Una interfaz simple y clara para gestionar tu trabajo
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <h3 className="text-2xl font-bold text-foreground">Dashboard Acompañante</h3>
                  <Button className="shadow-glow-primary">Escanear QR ahora</Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Sesiones este mes</div>
                    <div className="text-3xl font-bold text-foreground">12</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Recompensas</div>
                    <div className="text-3xl font-bold text-primary">8 NFTs</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Próxima visita</div>
                    <div className="text-lg font-semibold text-foreground">Hoy 16:00</div>
                  </div>
                </div>

                {/* Upcoming sessions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Próximas sesiones</h4>
                  {[1, 2].map((_, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
                          <Users className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">María G.</div>
                          <div className="text-sm text-muted-foreground">Conversación · 1 hora</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {i === 0 ? "Hoy 16:00" : "Mañana 10:00"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-foreground">
              Comienza a generar impacto hoy
            </h2>
            <p className="text-xl text-muted-foreground">
              Únete a nuestra red de acompañantes verificados y empieza a construir tu reputación
            </p>
            <Button size="lg" className="shadow-glow-primary">
              Registrarme como acompañante
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Acompanante;
