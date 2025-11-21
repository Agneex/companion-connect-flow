import { Network, Lock, CheckCircle, Database, ShieldCheck, Eye, FileCheck, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Web3Trust = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <section id="seguridad" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Network visualization background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Construido con tecnología de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary">
                confianza
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Tecnología descentralizada al servicio del cuidado, no al revés
            </p>
          </div>

          {/* Interactive Network visualization */}
          <div className="relative mb-10 md:mb-14 lg:mb-16 animate-fade-in">
            <div className="flex items-center justify-center space-x-4 md:space-x-8 lg:space-x-16">
              {/* Node 1 */}
              <div 
                className="flex flex-col items-center space-y-2 md:space-y-3 animate-scale-in cursor-pointer group" 
                style={{ animationDelay: "0.2s" }}
                onMouseEnter={() => setActiveNode(1)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full glass-effect border-2 flex items-center justify-center transition-all duration-300 ${
                  activeNode === 1 
                    ? "border-primary shadow-glow-primary scale-110 rotate-3" 
                    : "border-primary/50 hover:border-primary hover:shadow-glow-primary hover:scale-105"
                }`}>
                  <Database className="text-primary transition-transform group-hover:scale-110" size={28} />
                </div>
                <div className="text-center max-w-[100px] md:max-w-[120px]">
                  <span className="text-xs md:text-sm font-semibold text-foreground block">1. Compra</span>
                  <span className="text-xs text-muted-foreground">Pase digital seguro</span>
                </div>
                {activeNode === 1 && (
                  <div className="absolute top-full mt-4 glass-effect border border-primary/30 rounded-lg p-3 max-w-[200px] animate-fade-in z-20">
                    <p className="text-xs text-muted-foreground">Cada pase se registra como activo digital verificado</p>
                  </div>
                )}
              </div>

              {/* Animated Connection line 1 */}
              <div className="hidden md:block relative w-12 lg:w-20 h-1 overflow-hidden rounded-full">
                <div className={`absolute inset-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 ${
                  activeNode === 1 || activeNode === 2 ? "opacity-100 animate-shimmer" : "opacity-30"
                }`} style={{ backgroundSize: "200% 100%" }} />
              </div>

              {/* Node 2 */}
              <div 
                className="flex flex-col items-center space-y-2 md:space-y-3 animate-scale-in cursor-pointer group" 
                style={{ animationDelay: "0.4s" }}
                onMouseEnter={() => setActiveNode(2)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full glass-effect border-2 flex items-center justify-center transition-all duration-300 ${
                  activeNode === 2 
                    ? "border-accent shadow-glow-accent scale-110 rotate-3" 
                    : "border-accent/50 hover:border-accent hover:shadow-glow-accent hover:scale-105"
                }`}>
                  <Network className="text-accent transition-transform group-hover:scale-110" size={28} />
                </div>
                <div className="text-center max-w-[100px] md:max-w-[120px]">
                  <span className="text-xs md:text-sm font-semibold text-foreground block">2. Acompañamiento</span>
                  <span className="text-xs text-muted-foreground">Escaneo QR</span>
                </div>
                {activeNode === 2 && (
                  <div className="absolute top-full mt-4 glass-effect border border-accent/30 rounded-lg p-3 max-w-[200px] animate-fade-in z-20">
                    <p className="text-xs text-muted-foreground">Cada visita queda registrada de forma inmutable</p>
                  </div>
                )}
              </div>

              {/* Animated Connection line 2 */}
              <div className="hidden md:block relative w-12 lg:w-20 h-1 overflow-hidden rounded-full">
                <div className={`absolute inset-0 bg-gradient-to-r from-accent to-secondary transition-all duration-500 ${
                  activeNode === 2 || activeNode === 3 ? "opacity-100 animate-shimmer" : "opacity-30"
                }`} style={{ backgroundSize: "200% 100%" }} />
              </div>

              {/* Node 3 */}
              <div 
                className="flex flex-col items-center space-y-2 md:space-y-3 animate-scale-in cursor-pointer group" 
                style={{ animationDelay: "0.6s" }}
                onMouseEnter={() => setActiveNode(3)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full glass-effect border-2 flex items-center justify-center transition-all duration-300 ${
                  activeNode === 3 
                    ? "border-secondary shadow-glow-secondary scale-110 rotate-3" 
                    : "border-secondary/50 hover:border-secondary hover:shadow-glow-secondary hover:scale-105"
                }`}>
                  <CheckCircle className="text-secondary transition-transform group-hover:scale-110" size={28} />
                </div>
                <div className="text-center max-w-[100px] md:max-w-[120px]">
                  <span className="text-xs md:text-sm font-semibold text-foreground block">3. Recompensa</span>
                  <span className="text-xs text-muted-foreground">NFT verificado</span>
                </div>
                {activeNode === 3 && (
                  <div className="absolute top-full mt-4 glass-effect border border-secondary/30 rounded-lg p-3 max-w-[200px] animate-fade-in z-20">
                    <p className="text-xs text-muted-foreground">Prueba inmutable del servicio prestado</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3 Key Benefits - Large Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
            {[
              { 
                icon: ShieldCheck, 
                title: "Acompañantes verificados",
                description: "Identidad y antecedentes validados en blockchain"
              },
              { 
                icon: Eye, 
                title: "Trazabilidad total",
                description: "Historial inmutable de cada visita en tiempo real"
              },
              { 
                icon: Lock, 
                title: "Privacidad garantizada",
                description: "Seguridad web3 sin exponer datos personales"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="glass-effect rounded-xl p-6 md:p-8 border border-border/50 hover:border-primary/50 hover-lift group animate-fade-in text-center"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:shadow-glow-primary transition-all group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-primary-foreground" size={32} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 min-h-[56px] flex items-center justify-center">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground min-h-[48px] flex items-center justify-center">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Technical Details Accordion */}
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="technical-details" className="glass-effect rounded-lg border border-border px-4 md:px-6">
              <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground hover:text-primary py-4">
                <div className="flex items-center gap-2">
                  <Database className="text-primary" size={20} />
                  <span>Ver detalles técnicos de seguridad</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                  <ShieldCheck className="text-primary flex-shrink-0 mt-1" size={18} />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Validación:</span> Verificación de identidad y antecedentes. Historial verificado en blockchain.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                  <Eye className="text-primary flex-shrink-0 mt-1" size={18} />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Registro:</span> Cada visita inmutable con fecha, hora, duración y acompañante verificado.
                  </p>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                  <Lock className="text-primary flex-shrink-0 mt-1" size={18} />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Infraestructura:</span> Web3 para registros inmutables sin exponer datos personales.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Web3Trust;
