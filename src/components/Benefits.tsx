import { Shield, Globe, Heart, TrendingUp, CheckCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Benefits = () => {
  const benefits = [
    {
      title: "Beneficios para acompañantes",
      icon: Shield,
      items: [
        "Ingresos claros y trazables",
        "Reputación on-chain que te acompaña en tu carrera",
        "Formación y respaldo de Companya",
        "Agenda organizada y fácil de usar desde tu portal"
      ]
    },
    {
      title: "Beneficios para la familia",
      icon: Globe,
      items: [
        "Paz mental: sabes que no están solos",
        "Puedes estar en otro país y seguir cuidando",
        "Cada ticket usado queda registrado",
        "Informes de uso que puedes revisar cuando quieras"
      ]
    },
    {
      title: "Beneficios para personas mayores",
      icon: Heart,
      items: [
        "Compañía confiable y cercana",
        "No necesitan aprender apps ni tecnología",
        "Actividades significativas: conversar, leer, caminar",
        "Sensación de ser vistos, escuchados y acompañados"
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Beneficios para todos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un ecosistema donde todos ganan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-glow-primary">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {benefit.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-muted-foreground">
                          {item}
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

export default Benefits;
