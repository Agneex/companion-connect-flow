import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Wallet, QrCode, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const FlowDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "1. Click en 'Acceder acompañantes'",
      description: "Desde el menú principal, haces clic en el botón 'Acceder acompañantes'",
      icon: ArrowRight,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 1,
      title: "2. Página de Login Web3",
      description: "Se abre la página de login donde puedes conectar tu wallet (MetaMask, WalletConnect, etc.)",
      icon: Wallet,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      action: "Conectar Wallet",
    },
    {
      id: 2,
      title: "3. Verificación de Registro",
      description: "El sistema verifica si tu wallet está registrada como acompañante verificado",
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      title: "4. Acceso al Dashboard",
      description: "Una vez verificado, accedes automáticamente a tu dashboard de acompañante",
      icon: QrCode,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      features: [
        "Ver estadísticas de sesiones",
        "Escanear QR de pases",
        "Revisar tus NFTs ganados",
        "Gestionar tu agenda",
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Simulación del Flujo de Acceso
            </h1>
            <p className="text-lg text-muted-foreground">
              Así funciona el proceso completo de inicio de sesión para acompañantes
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-muted">
              <div 
                className="h-full bg-gradient-secondary transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? `${step.bgColor} ${step.color} scale-110` 
                        : isCompleted
                        ? "bg-gradient-secondary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Step Card */}
          <Card className="glass-effect">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return (
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${steps[currentStep].bgColor}`}>
                      <Icon className={`w-8 h-8 ${steps[currentStep].color}`} />
                    </div>
                  );
                })()}
                <div>
                  <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Paso {currentStep + 1} de {steps.length}
                  </p>
                </div>
              </div>
              <CardDescription className="text-base">
                {steps[currentStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step specific content */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">Ubicación del botón:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>📱 <strong>Desktop:</strong> Esquina superior derecha, botón "Acceder acompañantes"</li>
                      <li>📱 <strong>Mobile:</strong> Menú hamburguesa → "Acceder acompañantes"</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
                    <p className="text-sm">
                      <strong>Ahora corregido:</strong> El botón ahora lleva correctamente a la página de login
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-gradient-secondary/10 border border-primary/20 p-6 rounded-lg text-center">
                    <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
                    <Button size="lg" className="shadow-glow-primary">
                      <Wallet className="w-5 h-5 mr-2" />
                      Conectar Wallet
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3">
                      Compatible con MetaMask, WalletConnect y más
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">¿Qué pasa al conectar?</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✓ Se solicita autorización en tu wallet</li>
                      <li>✓ Se obtiene tu dirección Web3</li>
                      <li>✓ Se verifica tu estado de registro</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-6 p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </div>
                      <p className="text-sm font-semibold">Wallet Verificada</p>
                      <p className="text-xs text-muted-foreground">Acompañante registrado</p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <QrCode className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">Dashboard</p>
                      <p className="text-xs text-muted-foreground">Acceso concedido</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Sistema de verificación:</h4>
                    <p className="text-sm text-muted-foreground">
                      El sistema comprueba que hayas completado el registro KYC y la verificación Worldcoin. 
                      Solo acompañantes verificados pueden acceder al dashboard.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {steps[currentStep].features?.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p className="text-sm font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-secondary/10 border border-primary/20 p-6 rounded-lg text-center">
                    <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-2">¡Listo para comenzar!</h4>
                    <p className="text-sm text-muted-foreground">
                      Ahora puedes escanear QR, registrar sesiones y ganar NFTs por tu trabajo
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button 
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="flex-1"
                >
                  Anterior
                </Button>
                {currentStep === steps.length - 1 ? (
                  <Button 
                    onClick={handleReset}
                    className="flex-1"
                  >
                    Reiniciar simulación
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-lg">Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href="/acompanante/login">Ir a Login Real</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/acompanante/registro">Ir a Registro</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/">Volver al inicio</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlowDemo;
