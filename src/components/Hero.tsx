import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Users, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient with radial glow */}
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      
      {/* Enhanced animated network background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse-glow shadow-glow-primary" />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-accent rounded-full animate-pulse-glow shadow-glow-accent" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-secondary rounded-full animate-pulse-glow shadow-glow-secondary" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse-glow shadow-glow-primary" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: "2.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Companya: acompaña a quienes amas,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary glow-text">
                estés donde estés
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Compras una tiquetera de acompañamiento, un profesional la convierte en tiempo de calidad 
              con personas mayores. Todo con trazabilidad web3, sin complicaciones para ellos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" asChild className="shadow-glow-primary group hover-lift relative overflow-hidden">
                <Link to="/acompanante">
                  <span className="relative z-10">Comenzar como acompañante</span>
                  <ArrowRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="hover-lift glass-effect">
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
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-full max-w-md mx-auto animate-float">
              {/* Card mockup with glass effect */}
              <div className="glass-effect rounded-2xl p-8 shadow-elevated relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-secondary opacity-5" />
                <div className="space-y-6 relative z-10">
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

              {/* Enhanced connection lines to icons */}
              <div className="absolute -right-4 top-1/4 flex items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent animate-pulse" />
                <div className="w-12 h-12 glass-effect border-2 border-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform">
                  <Users className="text-primary" size={22} />
                </div>
              </div>

              <div className="absolute -right-4 top-1/2 flex items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <div className="w-20 h-0.5 bg-gradient-to-r from-accent to-transparent animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="w-12 h-12 glass-effect border-2 border-accent rounded-full flex items-center justify-center shadow-glow-accent hover:scale-110 transition-transform">
                  <CreditCard className="text-accent" size={22} />
                </div>
              </div>

              <div className="absolute -right-4 top-3/4 flex items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                <div className="w-12 h-0.5 bg-gradient-to-r from-secondary to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="w-12 h-12 glass-effect border-2 border-secondary rounded-full flex items-center justify-center shadow-glow-secondary hover:scale-110 transition-transform">
                  <Globe className="text-secondary" size={22} />
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
