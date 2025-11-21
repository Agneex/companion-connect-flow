import { Network, Lock, CheckCircle, Database } from "lucide-react";

const Web3Trust = () => {
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

          {/* Network visualization */}
          <div className="relative mb-8 md:mb-10 lg:mb-12 animate-fade-in">
            <div className="flex items-center justify-center space-x-8 md:space-x-12 lg:space-x-24">
              {/* Node 1 */}
              <div className="flex flex-col items-center space-y-2 md:space-y-3 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full glass-effect border-2 border-primary flex items-center justify-center shadow-glow-primary hover:scale-110 hover:rotate-12 transition-all cursor-pointer">
                  <Database className="text-primary" size={24} />
                </div>
                <span className="text-xs text-center text-muted-foreground max-w-[80px] md:max-w-[100px]">
                  Compra de tiquetera
                </span>
              </div>

              {/* Connection line */}
              <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

              {/* Node 2 */}
              <div className="flex flex-col items-center space-y-2 md:space-y-3 animate-scale-in" style={{ animationDelay: "0.4s" }}>
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full glass-effect border-2 border-accent flex items-center justify-center shadow-glow-accent hover:scale-110 hover:rotate-12 transition-all cursor-pointer">
                  <Network className="text-accent" size={24} />
                </div>
                <span className="text-xs text-center text-muted-foreground max-w-[80px] md:max-w-[100px]">
                  Sesión de acompañamiento
                </span>
              </div>

              {/* Connection line */}
              <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-gradient-to-r from-secondary via-accent to-primary" />

              {/* Node 3 */}
              <div className="flex flex-col items-center space-y-2 md:space-y-3 animate-scale-in" style={{ animationDelay: "0.6s" }}>
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full glass-effect border-2 border-secondary flex items-center justify-center shadow-glow-secondary hover:scale-110 hover:rotate-12 transition-all cursor-pointer">
                  <CheckCircle className="text-secondary" size={24} />
                </div>
                <span className="text-xs text-center text-muted-foreground max-w-[80px] md:max-w-[100px]">
                  Recompensa NFT
                </span>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {[
              "Cada tiquetera se representa como un activo digital seguro",
              "Cada acompañamiento registrado genera una prueba en la red (NFT) para el acompañante",
              "Esto permite trazabilidad, transparencia y menos riesgo de fraude",
              "El adulto mayor nunca tiene que entender nada de crypto"
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 glass-effect rounded-lg p-3 md:p-4 border border-border/50 hover-lift group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CheckCircle className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Technical note */}
          <div className="glass-effect rounded-lg p-4 md:p-6 border border-border hover-lift group animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-start space-x-3">
              <Lock className="text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={18} />
              <p className="text-xs md:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Seguridad técnica:</span> Usamos 
                infraestructura web3 para asegurar que cada ticket y cada acompañamiento queden 
                registrados de forma inmutable, sin exponer datos personales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Web3Trust;
