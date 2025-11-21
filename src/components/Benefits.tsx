import { Shield, Globe, Heart, TrendingUp, CheckCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Benefits = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      title: t("benefits.companions.title"),
      icon: Shield,
      items: [
        t("benefits.companions.income"),
        t("benefits.companions.reputation"),
        t("benefits.companions.training"),
        t("benefits.companions.schedule")
      ]
    },
    {
      title: t("benefits.families.title"),
      icon: Globe,
      items: [
        t("benefits.families.peace"),
        t("benefits.families.care"),
        t("benefits.families.tracking"),
        t("benefits.families.reports")
      ]
    },
    {
      title: t("benefits.seniors.title"),
      icon: Heart,
      items: [
        t("benefits.seniors.reliable"),
        t("benefits.seniors.notech"),
        t("benefits.seniors.activities"),
        t("benefits.seniors.seen")
      ]
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {t("benefits.title")}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t("benefits.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
            <Card key={index} className="glass-effect border-border hover:border-primary/50 transition-all hover-lift animate-slide-up group" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-5 md:p-6 space-y-4 md:space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-glow-primary group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Icon className="text-primary-foreground" size={20} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                </div>

                <ul className="space-y-2 md:space-y-3">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
