import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Users, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-50" />
      
      {/* Animated network background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-secondary rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Companya: acompaña a quienes amas,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary">
                estés donde estés
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Compras una tiquetera de acompañamiento, un profesional la convierte en tiempo de calidad 
              con personas mayores. Todo con trazabilidad web3, sin complicaciones para ellos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="shadow-glow-primary group">
                <Link to="/acompanante">
                  Comenzar como acompañante
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/comprar">Comprar una tiquetera</Link>
              </Button>
            </div>

            <a 
              href="#como-funciona" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              Ver cómo funciona
              <ArrowRight className="ml-2" size={16} />
            </a>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto animate-float">
              {/* Card mockup */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">Companya</span>
                    <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <CreditCard className="text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                    <div className="w-32 h-32 bg-foreground/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">QR Code</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Tiquetera de acompañamiento</div>
                    <div className="text-lg font-semibold text-foreground">5 visitas restantes</div>
                  </div>
                </div>
              </div>

              {/* Connection lines to icons */}
              <div className="absolute -right-4 top-1/4 flex items-center space-x-2">
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                <div className="w-10 h-10 bg-card border border-primary rounded-full flex items-center justify-center shadow-glow-primary">
                  <Users className="text-primary" size={20} />
                </div>
              </div>

              <div className="absolute -right-4 top-1/2 flex items-center space-x-2">
                <div className="w-20 h-0.5 bg-gradient-to-r from-accent to-transparent" />
                <div className="w-10 h-10 bg-card border border-accent rounded-full flex items-center justify-center shadow-glow-secondary">
                  <CreditCard className="text-accent" size={20} />
                </div>
              </div>

              <div className="absolute -right-4 top-3/4 flex items-center space-x-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-secondary to-transparent" />
                <div className="w-10 h-10 bg-card border border-secondary rounded-full flex items-center justify-center">
                  <Globe className="text-secondary" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
