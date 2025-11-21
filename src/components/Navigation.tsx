import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.howItWorks"), href: "#como-funciona" },
    { label: t("nav.companion"), href: "/acompanante" },
    { label: t("nav.security"), href: "#seguridad" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 hover:opacity-80 transition-opacity group">
            <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform">
              <span className="text-lg md:text-xl font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground">Companya</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              asChild 
              className="hover-lift glass-effect h-10 px-4 text-sm"
            >
              <Link to="/acompanante/login">{t("nav.companionAccess")}</Link>
            </Button>
            <Button 
              asChild 
              className="shadow-glow-primary hover-lift relative overflow-hidden group h-10 px-5 text-sm"
            >
              <Link to="/validar">
                <span className="relative z-10 font-semibold">{t("nav.validateTicket")}</span>
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 border-t border-border/50",
            isOpen ? "max-h-[500px] py-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <div className="flex justify-center mb-3">
                <LanguageSwitcher />
              </div>
              <Button 
                variant="outline" 
                asChild 
                className="w-full h-12 glass-effect"
              >
                <Link to="/acompanante/login" onClick={() => setIsOpen(false)}>
                  {t("nav.companionAccess")}
                </Link>
              </Button>
              <Button 
                asChild 
                className="w-full h-12 shadow-glow-primary relative overflow-hidden group"
              >
                <Link to="/validar" onClick={() => setIsOpen(false)}>
                  <span className="relative z-10 font-semibold">{t("nav.validateTicket")}</span>
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
