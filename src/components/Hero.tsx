import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Users, Globe, Sparkles } from "lucide-react";
import qrCode from "@/assets/qr-code.png";

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
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Companya: acompaña a quienes amas,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary glow-text">
                estés donde estés
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Compras una tiquetera de acompañamiento, un profesional la convierte en tiempo de calidad 
              con personas mayores. Todo con trazabilidad web3, sin complicaciones para ellos.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-slide-up justify-center lg:justify-start" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" asChild className="shadow-glow-primary group hover-lift relative overflow-hidden w-full sm:w-auto text-sm md:text-base">
                <Link to="/acompanante">
                  <span className="relative z-10">Comenzar como acompañante</span>
                  <ArrowRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="hover-lift glass-effect w-full sm:w-auto text-sm md:text-base">
                <Link to="/comprar">Comprar una tiquetera</Link>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start pt-2 md:pt-4">
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

          {/* Right visual - Enhanced Card */}
          <div className="relative animate-scale-in mt-8 lg:mt-0" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-full max-w-sm md:max-w-md mx-auto">
              {/* Floating card with enhanced animations */}
              <div className="glass-effect rounded-xl md:rounded-2xl p-6 md:p-8 shadow-elevated relative overflow-hidden animate-float">
                <div className="absolute inset-0 bg-gradient-secondary opacity-5" />
                
                {/* Sparkle effect */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 text-primary animate-pulse">
                  <Sparkles size={18} className="md:w-5 md:h-5" />
                </div>

                <div className="space-y-4 md:space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-bold text-foreground">Companya</span>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-secondary rounded-lg flex items-center justify-center shadow-glow-primary group hover:scale-110 hover:rotate-6 transition-all cursor-pointer">
                      <CreditCard className="text-primary-foreground" />
                    </div>
                  </div>
                  
                  {/* QR Code with enhanced styling */}
                  <div className="glass-effect rounded-lg md:rounded-xl p-3 md:p-4 flex items-center justify-center relative group cursor-pointer hover-lift">
                    <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity rounded-lg md:rounded-xl" />
                    <div className="relative">
                      <img 
                        src={qrCode} 
                        alt="QR Code Companya" 
                        className="w-32 h-32 md:w-40 md:h-40 rounded-lg group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 border-2 border-primary/20 rounded-lg group-hover:border-primary/40 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <div className="text-xs md:text-sm text-muted-foreground">Tiquetera de acompañamiento</div>
                    <div className="flex items-center justify-between">
                      <div className="text-base md:text-lg font-semibold text-foreground">5 visitas restantes</div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" 
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced connection lines to icons with better animations - Hidden on mobile */}
              <div className="hidden lg:flex absolute -right-4 top-1/4 items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="relative w-16 h-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent animate-shimmer" 
                       style={{ backgroundSize: "200% 100%" }} />
                </div>
                <div className="w-10 h-10 xl:w-12 xl:h-12 glass-effect border-2 border-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 hover:rotate-12 transition-all cursor-pointer group">
                  <Users className="text-primary group-hover:scale-110 transition-transform" size={20} />
                </div>
              </div>

              <div className="hidden lg:flex absolute -right-4 top-1/2 items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <div className="relative w-20 h-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-transparent animate-shimmer" 
                       style={{ backgroundSize: "200% 100%", animationDelay: "0.5s" }} />
                </div>
                <div className="w-10 h-10 xl:w-12 xl:h-12 glass-effect border-2 border-accent rounded-full flex items-center justify-center shadow-glow-accent hover:scale-110 hover:rotate-12 transition-all cursor-pointer group">
                  <CreditCard className="text-accent group-hover:scale-110 transition-transform" size={20} />
                </div>
              </div>

              <div className="hidden lg:flex absolute -right-4 top-3/4 items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.9s" }}>
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
