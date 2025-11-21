import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
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
              Acompañamiento con trazabilidad y confianza para personas mayores
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
              Cómo funciona
            </a>
            <a href="/acompanante" className="text-muted-foreground hover:text-foreground transition-colors">
              Soy acompañante
            </a>
            <a href="/comprar" className="text-muted-foreground hover:text-foreground transition-colors">
              Comprar tiquetera
            </a>
            <a href="#seguridad" className="text-muted-foreground hover:text-foreground transition-colors">
              Seguridad
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Términos
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Companya. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
