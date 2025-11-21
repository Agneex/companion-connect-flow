import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Users, Globe, Sparkles } from "lucide-react";
import companyaPass from "@/assets/companya-paper-pass.png";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center pt-20 md:pt-24 pb-12 md:pb-20 overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <div className="flex flex-col items-center gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Main content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center w-full max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Companya: acompaña a quienes amas,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary glow-text">
                estés donde estés
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Compras un pase de acompañamiento, un profesional lo convierte en tiempo de calidad 
              con personas mayores. Todo con trazabilidad web3, sin complicaciones para ellos.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-slide-up justify-center" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" asChild className="shadow-glow-primary group hover-lift relative overflow-hidden w-full sm:w-auto text-sm md:text-base">
                <Link to="/acompanante">
                  <span className="relative z-10">Comenzar como acompañante</span>
                  <ArrowRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="hover-lift glass-effect w-full sm:w-auto text-sm md:text-base">
                <Link to="/comprar">Comprar un pase</Link>
              </Button>
            </div>

            <div className="flex justify-center pt-2">
              <a 
                href="#como-funciona" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group text-sm md:text-base"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('como-funciona')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <span className="font-medium">Ver cómo funciona</span>
                <ArrowRight className="ml-2 group-hover:translate-y-1 transition-transform" size={16} />
              </a>
            </div>
          </div>

          {/* Visual Card - Now Below Content */}
          <div className="relative animate-scale-in w-full" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Floating pass card */}
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-elevated hover-lift animate-float group">
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                {/* Sparkle effect */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-primary animate-pulse z-10">
                  <Sparkles size={20} className="md:w-6 md:h-6" />
                </div>

                <img 
                  src={companyaPass} 
                  alt="Pase Companya - Ejemplo de acompañamiento a cita médica" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute inset-0 border-2 border-primary/20 rounded-xl md:rounded-2xl group-hover:border-primary/40 transition-colors pointer-events-none" />
              </div>

              {/* Enhanced connection lines to icons with better animations */}
              <div className="hidden md:flex absolute -right-8 lg:-right-12 top-1/4 items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="relative w-16 h-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent animate-shimmer" 
                       style={{ backgroundSize: "200% 100%" }} />
                </div>
                <div className="w-10 h-10 xl:w-12 xl:h-12 glass-effect border-2 border-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 hover:rotate-12 transition-all cursor-pointer group">
                  <Users className="text-primary group-hover:scale-110 transition-transform" size={20} />
                </div>
              </div>

              <div className="hidden md:flex absolute -right-8 lg:-right-12 top-1/2 items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <div className="relative w-20 h-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-transparent animate-shimmer" 
                       style={{ backgroundSize: "200% 100%", animationDelay: "0.5s" }} />
                </div>
                <div className="w-10 h-10 xl:w-12 xl:h-12 glass-effect border-2 border-accent rounded-full flex items-center justify-center shadow-glow-accent hover:scale-110 hover:rotate-12 transition-all cursor-pointer group">
                  <CreditCard className="text-accent group-hover:scale-110 transition-transform" size={20} />
                </div>
              </div>

              <div className="hidden md:flex absolute -right-8 lg:-right-12 top-3/4 items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                <div className="relative w-12 h-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-transparent animate-shimmer" 
                       style={{ backgroundSize: "200% 100%", animationDelay: "1s" }} />
                </div>
                <div className="w-10 h-10 xl:w-12 xl:h-12 glass-effect border-2 border-secondary rounded-full flex items-center justify-center shadow-glow-secondary hover:scale-110 hover:rotate-12 transition-all cursor-pointer group">
                  <Globe className="text-secondary group-hover:scale-110 transition-transform" size={20} />
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
