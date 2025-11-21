import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, QrCode, Award, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWeb3 } from "@/contexts/Web3Context";
import { useState } from "react";

interface DashboardNavProps {
  onLogout: () => void;
}

const DashboardNav = ({ onLogout }: DashboardNavProps) => {
  const location = useLocation();
  const { account } = useWeb3();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/acompanante/dashboard",
      icon: Home,
    },
    {
      label: "Mi Agenda",
      href: "/acompanante/schedule",
      icon: Calendar,
    },
    {
      label: "Escanear QR",
      href: "/acompanante/scan",
      icon: QrCode,
    },
    {
      label: "Mis NFTs",
      href: "/acompanante/nfts",
      icon: Award,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">C</span>
            </div>
            <span className="font-semibold text-foreground">Dashboard</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border">
                <div className="px-4 py-2 text-xs text-muted-foreground">
                  Wallet: {account?.slice(0, 6)}...{account?.slice(-4)}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="w-full justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Desconectar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-muted/30 border-r border-border z-30">
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-glow-primary">
                <span className="text-xl font-bold text-primary-foreground">C</span>
              </div>
              <div>
                <h2 className="font-bold text-foreground">Dashboard</h2>
                <p className="text-xs text-muted-foreground">Acompañante</p>
              </div>
            </div>
            
            {/* Wallet Info */}
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Wallet conectada</p>
              <p className="font-mono text-xs font-semibold truncate">
                {account?.slice(0, 10)}...{account?.slice(-6)}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-glow-primary"
                      : "hover:bg-muted hover:translate-x-1"
                  )}
                >
                  <Icon 
                    className={cn(
                      "w-5 h-5",
                      isActive(item.href) ? "" : "group-hover:scale-110 transition-transform"
                    )} 
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Link to="/acompanante">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Home className="w-4 h-4 mr-2" />
                Página de Acompañantes
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Desconectar Wallet
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardNav;
