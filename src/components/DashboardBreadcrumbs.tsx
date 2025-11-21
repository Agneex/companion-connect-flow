import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, QrCode, Award } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  "/acompanante/dashboard": { label: "Dashboard", icon: Home },
  "/acompanante/schedule": { label: "Mi Agenda", icon: Calendar },
  "/acompanante/scan": { label: "Escanear QR", icon: QrCode },
  "/acompanante/nfts": { label: "Mis NFTs", icon: Award },
};

const DashboardBreadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Get current route config
  const currentRoute = routeConfig[currentPath];
  
  if (!currentRoute) return null;

  const Icon = currentRoute.icon;

  return (
    <div className="border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5" />
                  <span>Inicio</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/acompanante" className="flex items-center gap-1.5">
                  <span>Acompañantes</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1.5 font-medium">
                <Icon className="w-3.5 h-3.5" />
                <span>{currentRoute.label}</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default DashboardBreadcrumbs;
