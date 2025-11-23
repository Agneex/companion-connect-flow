import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Calendar, Smartphone, Award, TrendingUp, Users, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Acompanante = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      icon: Shield,
      title: t("companion.page.timeline.step1Title"),
      description: t("companion.page.timeline.step1Desc")
    },
    {
      icon: Calendar,
      title: t("companion.page.timeline.step2Title"),
      description: t("companion.page.timeline.step2Desc")
    },
    {
      icon: Smartphone,
      title: t("companion.page.timeline.step3Title"),
      description: t("companion.page.timeline.step3Desc")
    },
    {
      icon: Award,
      title: t("companion.page.timeline.step4Title"),
      description: t("companion.page.timeline.step4Desc")
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t("companion.page.benefits.benefit1Title"),
      description: t("companion.page.benefits.benefit1Desc")
    },
    {
      icon: Award,
      title: t("companion.page.benefits.benefit2Title"),
      description: t("companion.page.benefits.benefit2Desc")
    },
    {
      icon: Users,
      title: t("companion.page.benefits.benefit3Title"),
      description: t("companion.page.benefits.benefit3Desc")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              {t("companion.page.hero.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary glow-text">
                {t("companion.page.hero.titleHighlight")}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("companion.page.hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="shadow-glow-primary hover-lift relative overflow-hidden group">
                <Link to="/acompanante/registro">
                  <span className="relative z-10">{t("companion.page.hero.ctaStart")}</span>
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="hover-lift glass-effect">
                {t("companion.page.hero.ctaHow")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t("companion.page.timeline.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("companion.page.timeline.subtitle")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6 items-start group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow-primary group-hover:scale-110 group-hover:rotate-6 transition-all flex-shrink-0">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-16 bg-border my-2" />
                    )}
                  </div>
                  
                  <Card className="flex-grow glass-effect border-border hover:border-primary/50 transition-all hover-lift">
                    <CardContent className="p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                      <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-muted-foreground relative z-10">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t("companion.page.benefits.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="glass-effect border-border hover:border-primary/50 transition-all hover-lift animate-scale-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 space-y-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                    <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-glow-primary group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portal mockup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t("companion.page.portal.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("companion.page.portal.subtitle")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect border-border overflow-hidden shadow-elevated animate-fade-in">
              <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <h3 className="text-2xl font-bold text-foreground">{t("companion.page.portal.dashboardTitle")}</h3>
                  <Button className="shadow-glow-primary hover-lift relative overflow-hidden group">
                    <span className="relative z-10">{t("companion.page.portal.scanButton")}</span>
                    <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-effect rounded-lg p-4 hover-lift group cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-1">{t("companion.page.portal.sessionsMonth")}</div>
                    <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">12</div>
                  </div>
                  <div className="glass-effect rounded-lg p-4 hover-lift group cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-1">{t("companion.page.portal.rewards")}</div>
                    <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">8 {t("companion.page.portal.nfts")}</div>
                  </div>
                  <div className="glass-effect rounded-lg p-4 hover-lift group cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-1">{t("companion.page.portal.nextVisit")}</div>
                    <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{t("companion.page.portal.today")} 16:00</div>
                  </div>
                </div>

                {/* Upcoming sessions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">{t("companion.page.portal.upcomingSessions")}</h4>
                  {[1, 2].map((_, i) => (
                    <div key={i} className="glass-effect rounded-lg p-4 flex items-center justify-between hover-lift group cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Users className="text-primary-foreground" size={20} />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">María G.</div>
                          <div className="text-sm text-muted-foreground">{t("companion.page.portal.conversation")} · 1 {t("companion.page.portal.hour")}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {i === 0 ? `${t("companion.page.portal.today")} 16:00` : `${t("companion.page.portal.tomorrow")} 10:00`}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground">
              {t("companion.page.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("companion.page.cta.subtitle")}
            </p>
            <Button size="lg" className="shadow-glow-primary hover-lift relative overflow-hidden group">
              <span className="relative z-10">{t("companion.page.cta.button")}</span>
              <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Acompanante;
