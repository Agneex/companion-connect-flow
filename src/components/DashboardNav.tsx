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
      {/* Fixed Top Header - Mobile & Desktop */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo - Always visible */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-glow-primary">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Companya</span>
              <span className="hidden sm:inline text-xs text-muted-foreground ml-2">Dashboard</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-xs text-right">
              <p className="text-muted-foreground">Wallet</p>
              <p className="font-mono font-semibold">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-sm">
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
              <div className="pt-4 border-t border-border space-y-2">
                <div className="px-4 py-2 text-xs">
                  <p className="text-muted-foreground mb-1">Wallet conectada</p>
                  <p className="font-mono font-semibold">{account?.slice(0, 10)}...{account?.slice(-6)}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Desconectar Wallet
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
            <div className="bg-background/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">Dashboard de Acompañante</p>
              <p className="text-xs text-muted-foreground mb-1">Wallet:</p>
              <p className="font-mono text-xs font-semibold truncate">
                {account}
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
                Info Acompañantes
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Desconectar
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardNav;
