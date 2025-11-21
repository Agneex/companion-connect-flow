import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Brand and Social */}
          <div className="flex flex-col items-center text-center space-y-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Companya</span>
            </div>
            
            <p className="text-sm text-muted-foreground max-w-md">
              {t("footer.tagline")}
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm">
            <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.howWorks")}
            </a>
            <a href="/acompanante" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.forCompanions")}
            </a>
            <a href="/comprar" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.validateTicket")}
            </a>
            <a href="#seguridad" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.security")}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.blog")}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.contact")}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Companya. {t("footer.rights")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
