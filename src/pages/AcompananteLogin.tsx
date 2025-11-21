import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Award, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";

const AcompananteLogin = () => {
  const { connectWallet, isConnected, isCompanion, account } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && isCompanion) {
      navigate("/acompanante/dashboard");
    }
  }, [isConnected, isCompanion, navigate]);

  const handleConnect = async () => {
    await connectWallet();
  };

  const features = [
    {
      icon: Shield,
      title: "Acceso seguro",
      description: "Tu wallet es tu identidad verificada en la red",
    },
    {
      icon: Award,
      title: "NFTs automáticos",
      description: "Cada sesión genera un NFT de reputación",
    },
    {
      icon: CheckCircle2,
      title: "Historial inmutable",
      description: "Todo tu trabajo queda registrado en blockchain",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Login card */}
            <Card className="glass-effect">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl">Acceso de Acompañantes</CardTitle>
                <CardDescription className="text-base">
                  Conecta tu wallet Web3 para acceder a tu dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isConnected ? (
                  <>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-sm">¿Primera vez?</h4>
                      <p className="text-sm text-muted-foreground">
                        Si aún no te has registrado, completa el proceso de verificación KYC primero.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate("/acompanante/registro")}
                      >
                        Ir a registro
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        onClick={handleConnect}
                        size="lg"
                        className="w-full shadow-glow-primary"
                      >
                        <Wallet className="mr-2 w-5 h-5" />
                        Conectar Wallet
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Compatible con MetaMask, WalletConnect y más
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        💡 <strong>Simulación:</strong> En esta demo, se generará una wallet temporal. En producción, se conectará a tu wallet real.
                      </p>
                    </div>
                  </>
                ) : !isCompanion ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No autorizado</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Esta wallet no está registrada como acompañante verificado.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Wallet: {account?.slice(0, 6)}...{account?.slice(-4)}
                      </p>
                    </div>
                    <Button 
                      onClick={() => navigate("/acompanante/registro")}
                      className="w-full"
                    >
                      Completar registro
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Right side - Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Tu trabajo, <span className="text-transparent bg-clip-text bg-gradient-secondary">verificado en blockchain</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Con Web3, cada sesión que realizas queda registrada de forma inmutable, construyendo tu reputación profesional.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="glass-effect border-border hover:border-primary/50 transition-all">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcompananteLogin;
