import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from '@/lib/wagmi-config';
import { Web3ContextProvider } from "@/contexts/Web3Provider";
import '@rainbow-me/rainbowkit/styles.css';
import Index from "./pages/Index";
import Acompanante from "./pages/Acompanante";
import Comprar from "./pages/Comprar";
import ValidarTiquetera from "./pages/ValidarTiquetera";
import RegistroAcompanante from "./pages/RegistroAcompanante";
import AcompananteLogin from "./pages/AcompananteLogin";
import AcompananteDashboard from "./pages/AcompananteDashboard";
import AcompananteScan from "./pages/AcompananteScan";
import AcompananteSchedule from "./pages/AcompananteSchedule";
import AcompananteNFTs from "./pages/AcompananteNFTs";
import FlowDemo from "./pages/FlowDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Web3ContextProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/acompanante" element={<Acompanante />} />
                  <Route path="/acompanante/registro" element={<RegistroAcompanante />} />
                  <Route path="/acompanante/login" element={<AcompananteLogin />} />
                  <Route path="/acompanante/dashboard" element={<AcompananteDashboard />} />
                  <Route path="/acompanante/scan" element={<AcompananteScan />} />
                  <Route path="/acompanante/schedule" element={<AcompananteSchedule />} />
                  <Route path="/acompanante/nfts" element={<AcompananteNFTs />} />
                  <Route path="/demo-flow" element={<FlowDemo />} />
                  <Route path="/validar" element={<ValidarTiquetera />} />
                  <Route path="/comprar" element={<Comprar />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </Web3ContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </QueryClientProvider>
);

export default App;
