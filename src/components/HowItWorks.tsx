import { CreditCard, Heart, Smartphone, Shield, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const actors = [
    {
      title: "Para tus padres, abuelos o adultos mayores",
      subtitle: "Cero apps, solo una tarjeta",
      icon: Heart,
      iconColor: "text-accent",
      points: [
        "Reciben una tarjeta o talonario Companya con un QR",
        "Solo tienen que mostrarla cuando un acompañante los visita",
        "Cada encuentro se registra y suma a su bienestar",
        "Sin que tengan que hacer nada digital"
      ]
    },
    {
      title: "Para ti, que acompañas",
      subtitle: "Una app simple que convierte tiempo en valor",
      icon: Smartphone,
      iconColor: "text-primary",
      points: [
        "Te registras y verificas tu identidad en Companya",
        "Escaneas el ticket físico del adulto mayor cuando lo acompañas",
        "Recibes un NFT/recompensa asociado a esa experiencia",
        "Con valor económico y reputación verificable"
      ]
    },
    {
      title: "Para ti, que cuidas a distancia",
      subtitle: "Tiqueteras con trazabilidad real",
      icon: MapPin,
      iconColor: "text-secondary",
      points: [
        "Entras al portal y compras una tiquetera para una persona concreta o para donar",
        "Nosotros nos encargamos de emitir la tarjeta física y coordinar las actividades",
        "Puedes ver el uso de tus tickets: cuántas visitas se realizaron y su frecuencia",
        "Con impacto medible y transparente"
      ]
    }
  ];

  return (
    <section id="como-funciona" className="py-12 md:py-16 lg:py-20 relative scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14 lg:mb-16 animate-fade-in">
          <div className="inline-block mb-3 md:mb-4">
            <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold">
              Cómo funciona
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 px-4">
            Un sistema simple para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-secondary">
              tres actores
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Conectando familias, acompañantes y personas mayores
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connection lines between cards */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
          
          {actors.map((actor, index) => {
            const Icon = actor.icon;
            return (
              <Card 
                key={index} 
                className="glass-effect border-border hover:border-primary/50 transition-all group hover-lift animate-fade-in relative z-10" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-5 md:p-6 space-y-4 md:space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 bg-gradient-secondary rounded-full flex items-center justify-center shadow-glow-primary text-primary-foreground font-bold text-base md:text-lg">
                    {index + 1}
                  </div>
                  <div className="space-y-2 relative z-10">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-secondary flex items-center justify-center ${actor.iconColor} group-hover:shadow-glow-primary transition-all group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon size={24} className="md:w-7 md:h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {actor.title}
                    </h3>
                    <p className="text-xs md:text-sm text-primary font-medium">
                      {actor.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 md:space-y-3">
                    {actor.points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
