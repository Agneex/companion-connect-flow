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
    <section id="como-funciona" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Cómo funciona para cada uno
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un sistema simple que conecta a tres actores principales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {actors.map((actor, index) => {
            const Icon = actor.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all group">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center ${actor.iconColor} group-hover:shadow-glow-primary transition-shadow`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {actor.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {actor.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {actor.points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
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
