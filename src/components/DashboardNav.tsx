import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, QrCode, Award, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWeb3 } from "@/contexts/Web3Provider";
import { useState } from "react";
import DashboardBreadcrumbs from "./DashboardBreadcrumbs";
import companyaLogo from "@/assets/companya-logo.png";

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
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src={companyaLogo} 
            alt="Companya Logo" 
            className="w-10 h-10 object-contain"
          />
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
                    : "text-foreground hover:bg-muted"
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
      
      {/* Breadcrumbs - Below header */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background">
        <DashboardBreadcrumbs />
      </div>
    </>
  );
};

export default DashboardNav;
