import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Award, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Provider";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from "react-i18next";

const AcompananteLogin = () => {
  const { isConnected, isCompanion, account } = useWeb3();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isConnected && isCompanion) {
      navigate("/acompanante/dashboard");
    }
  }, [isConnected, isCompanion, navigate]);

  const features = [
    {
      icon: Shield,
      title: t("companion.login.secureAccess"),
      description: t("companion.login.secureAccessDesc"),
    },
    {
      icon: Award,
      title: t("companion.login.autoNfts"),
      description: t("companion.login.autoNftsDesc"),
    },
    {
      icon: CheckCircle2,
      title: t("companion.login.immutableHistory"),
      description: t("companion.login.immutableHistoryDesc"),
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
                <CardTitle className="text-3xl">{t("companion.login.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("companion.login.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isConnected ? (
                  <>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-sm">{t("companion.login.firstTime")}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t("companion.login.firstTimeDesc")}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate("/acompanante/registro")}
                      >
                        {t("companion.login.goToRegister")}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <ConnectButton.Custom>
                        {({ openConnectModal }) => (
                          <Button 
                            onClick={openConnectModal}
                            size="lg"
                            className="w-full shadow-glow-primary"
                          >
                            <Wallet className="mr-2 w-5 h-5" />
                            {t("companion.login.connectWallet")}
                          </Button>
                        )}
                      </ConnectButton.Custom>
                      <p className="text-xs text-center text-muted-foreground">
                        {t("companion.login.compatible")}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        💡 <strong>Simulación:</strong> {t("companion.login.simulation")}
                      </p>
                    </div>
                  </>
                ) : !isCompanion ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t("companion.login.notAuthorized")}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("companion.login.notAuthorizedDesc")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Wallet: {account?.slice(0, 6)}...{account?.slice(-4)}
                      </p>
                    </div>
                    <Button 
                      onClick={() => navigate("/acompanante/registro")}
                      className="w-full"
                    >
                      {t("companion.login.completeRegistration")}
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Right side - Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  {t("companion.login.yourWork")} <span className="text-transparent bg-clip-text bg-gradient-secondary">{t("companion.login.verified")}</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("companion.login.workDesc")}
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
