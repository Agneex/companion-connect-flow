import { Globe, Heart, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UseCases = () => {
  const cases = [
    {
      icon: Globe,
      title: "Vivo en otro país, pero quiero estar presente",
      description: "Compra un paper wallet, elige el número de acompañamientos, indica país/ciudad de tu familiar. Nosotros nos encargamos de la entrega física y coordinación local.",
      cta: "Comprar paper wallet para mi familia",
      href: "/comprar?type=family"
    },
    {
      icon: Heart,
      title: "Quiero donar compañía a quien más lo necesita",
      description: "Puedes comprar paper wallets destinados a fundaciones, municipios o programas específicos. Recibirás reportes agregados de impacto.",
      cta: "Donar un paper wallet",
      href: "/comprar?type=donate"
    },
    {
      icon: Building2,
      title: "Soy empresa/aseguradora y quiero un programa",
      description: "Integramos Companya en tu portafolio de bienestar: definimos paquetes, territorios y tipos de actividades. Todo medible y trazable.",
      cta: "Hablar con nuestro equipo",
      href: "#contacto"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-accent">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Casos de uso
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Companya se adapta a diferentes necesidades y situaciones
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card key={index} className="glass-effect border-border hover:border-primary/50 transition-all group hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardContent className="p-6 space-y-6 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow-primary group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10">
                    <Icon className="text-primary-foreground" size={28} />
                  </div>

                  <div className="flex-grow space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full group/btn hover-lift glass-effect relative z-10"
                  >
                    <Link to={useCase.href}>
                      {useCase.cta}
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform" size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
