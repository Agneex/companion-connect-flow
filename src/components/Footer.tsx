import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const links = {
    product: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Soy acompañante", href: "/acompanante" },
      { label: "Comprar tiquetera", href: "/comprar" },
      { label: "Seguridad", href: "#seguridad" }
    ],
    company: [
      { label: "Sobre nosotros", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contacto", href: "#contacto" },
      { label: "FAQ", href: "#faq" }
    ],
    legal: [
      { label: "Privacidad", href: "#" },
      { label: "Términos", href: "#" },
      { label: "Cookies", href: "#" }
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand */}
          <div className="space-y-3 md:space-y-4 text-center sm:text-left">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <span className="text-base md:text-lg font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-foreground">Companya</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs mx-auto sm:mx-0">
              Acompañamiento con trazabilidad y confianza para personas mayores.
            </p>
            <div className="flex space-x-3 justify-center sm:justify-start">
              <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter size={14} className="md:w-4 md:h-4" />
              </a>
              <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin size={14} className="md:w-4 md:h-4" />
              </a>
              <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail size={14} className="md:w-4 md:h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Producto</h4>
            <ul className="space-y-2">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Empresa</h4>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-border">
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Companya. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
