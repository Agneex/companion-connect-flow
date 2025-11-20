import { Network, Lock, CheckCircle, Database } from "lucide-react";

const Web3Trust = () => {
  return (
    <section id="seguridad" className="py-20 relative overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Construido con tecnología de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary">
                confianza
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tecnología descentralizada al servicio del cuidado, no al revés
            </p>
          </div>

          {/* Network visualization */}
          <div className="relative mb-12">
            <div className="flex items-center justify-center space-x-12 lg:space-x-24">
              {/* Node 1 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-glow-primary">
                  <Database className="text-primary" size={28} />
                </div>
                <span className="text-xs text-center text-muted-foreground max-w-[100px]">
                  Compra de tiquetera
                </span>
              </div>

              {/* Connection line */}
              <div className="hidden lg:block w-24 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

              {/* Node 2 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-glow-secondary">
                  <Network className="text-accent" size={28} />
                </div>
                <span className="text-xs text-center text-muted-foreground max-w-[100px]">
                  Sesión de acompañamiento
                </span>
              </div>

              {/* Connection line */}
              <div className="hidden lg:block w-24 h-0.5 bg-gradient-to-r from-secondary via-accent to-primary" />

              {/* Node 3 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-card border-2 border-secondary flex items-center justify-center">
                  <CheckCircle className="text-secondary" size={28} />
                </div>
                <span className="text-xs text-center text-muted-foreground max-w-[100px]">
                  Recompensa NFT
                </span>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              "Cada tiquetera se representa como un activo digital seguro",
              "Cada acompañamiento registrado genera una prueba en la red (NFT) para el acompañante",
              "Esto permite trazabilidad, transparencia y menos riesgo de fraude",
              "El adulto mayor nunca tiene que entender nada de crypto"
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 bg-card/30 rounded-lg p-4 border border-border/50">
                <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Technical note */}
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <div className="flex items-start space-x-3">
              <Lock className="text-primary flex-shrink-0 mt-1" size={20} />
              <p className="text-sm text-muted-foreground">
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
