import { CreditCard, Heart, Smartphone, Shield, MapPin, TrendingUp, QrCode, Sparkles, Gift, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();
  
  const actors = [
    {
      title: t("howItWorks.silver.title"),
      subtitle: t("howItWorks.silver.point1"),
      icon: Heart,
      iconColor: "text-accent",
      points: [
        { icon: CreditCard, text: t("howItWorks.silver.point1") },
        { icon: QrCode, text: t("howItWorks.silver.point2") },
        { icon: Sparkles, text: t("howItWorks.silver.point3") },
        { icon: Shield, text: t("howItWorks.silver.point4") }
      ]
    },
    {
      title: t("howItWorks.companion.title"),
      subtitle: t("howItWorks.companion.point1"),
      icon: Smartphone,
      iconColor: "text-primary",
      points: [
        { icon: Shield, text: t("howItWorks.companion.point1") },
        { icon: QrCode, text: t("howItWorks.companion.point2") },
        { icon: Gift, text: t("howItWorks.companion.point3") },
        { icon: TrendingUp, text: t("howItWorks.companion.point4") }
      ]
    },
    {
      title: t("howItWorks.payer.title"),
      subtitle: t("howItWorks.payer.point1"),
      icon: MapPin,
      iconColor: "text-secondary",
      points: [
        { icon: CreditCard, text: t("howItWorks.payer.point1") },
        { icon: Heart, text: t("howItWorks.payer.point2") },
        { icon: BarChart3, text: t("howItWorks.payer.point3") },
        { icon: Sparkles, text: t("howItWorks.payer.point4") }
      ]
    }
  ];

  return (
    <section id="como-funciona" className="py-12 md:py-16 lg:py-20 relative scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14 lg:mb-16 animate-fade-in">
          <div className="inline-block mb-3 md:mb-4">
            <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold">
              {t("howItWorks.title")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 px-4">
            {t("howItWorks.title")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connection lines between cards */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
          
          {actors.map((actor, index) => {
            const Icon = actor.icon;
            return (
              <Card 
                key={index} 
                className="glass-effect border-border hover:border-primary/50 transition-all group hover-lift animate-fade-in relative z-10" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-5 md:p-6 space-y-4 md:space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 bg-gradient-secondary rounded-full flex items-center justify-center shadow-glow-primary text-primary-foreground font-bold text-base md:text-lg">
                    {index + 1}
                  </div>
                  <div className="space-y-2 relative z-10 min-h-[140px] md:min-h-[160px]">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-secondary flex items-center justify-center ${actor.iconColor} group-hover:shadow-glow-primary transition-all group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon size={24} className="md:w-7 md:h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {actor.title}
                    </h3>
                    <p className="text-xs md:text-sm text-primary font-medium">
                      {actor.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 md:space-y-3">
                    {actor.points.map((point, i) => {
                      const PointIcon = point.icon;
                      return (
                        <li key={i} className="flex items-start space-x-3 group/item">
                          <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
                            <PointIcon className="text-primary" size={14} />
                          </div>
                          <span className="text-xs md:text-sm text-muted-foreground leading-relaxed pt-1">
                            {point.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
