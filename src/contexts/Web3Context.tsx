import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { BrowserProvider } from "ethers";
import { getPreferredProvider, isWeb3Available, getProviderNames } from "@/lib/web3-providers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  isCompanion: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within Web3Provider");
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isCompanion, setIsCompanion] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's already a connection on mount
    const checkConnection = async () => {
      if (!isWeb3Available()) {
        // Clean up if no Web3 provider is available
        localStorage.removeItem("web3_account");
        localStorage.removeItem("is_companion");
        return;
      }

      const detectedProvider = getPreferredProvider();
      if (!detectedProvider) {
        localStorage.removeItem("web3_account");
        localStorage.removeItem("is_companion");
        return;
      }

      try {
        const provider = new BrowserProvider(detectedProvider.provider);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const walletAddress = accounts[0].address;
          const companions = JSON.parse(localStorage.getItem("companions") || "[]");
          const isRegistered = companions.some(
            (c: any) => c.walletAddress?.toLowerCase() === walletAddress.toLowerCase()
          );
          
          setAccount(walletAddress);
          setIsCompanion(isRegistered);
          setCurrentProvider(detectedProvider.provider);
          localStorage.setItem("web3_account", walletAddress);
          localStorage.setItem("is_companion", String(isRegistered));
        } else {
          // Clean up old data
          localStorage.removeItem("web3_account");
          localStorage.removeItem("is_companion");
        }
      } catch (error) {
        console.error("Error checking existing connection:", error);
        // Clean up if there's an error
        localStorage.removeItem("web3_account");
        localStorage.removeItem("is_companion");
      }
    };
    
    checkConnection();
  }, []);

  const connectWallet = async (): Promise<boolean> => {
    try {
      // Check if any Web3 provider is available
      if (!isWeb3Available()) {
        const providerNames = getProviderNames();
        toast({
          title: "Wallet no detectada",
          description: providerNames.length > 0 
            ? `Se detectaron: ${providerNames.join(", ")}. Intenta recargar la página.`
            : "Por favor instala MetaMask u otra wallet compatible.",
          variant: "destructive",
        });
        return false;
      }

      // Get the preferred provider (MetaMask first)
      const detectedProvider = getPreferredProvider();
      
      if (!detectedProvider) {
        toast({
          title: "Error de wallet",
          description: "No se pudo acceder a ningún proveedor de wallet.",
          variant: "destructive",
        });
        return false;
      }

      console.log(`Conectando con ${detectedProvider.name}...`);

      // Request account access using the selected provider
      const accounts = await detectedProvider.provider.request({ 
        method: "eth_requestAccounts" 
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No se encontraron cuentas");
      }

      const walletAddress = accounts[0];
      
      // Check if user is a registered companion
      const companions = JSON.parse(localStorage.getItem("companions") || "[]");
      const isRegistered = companions.some(
        (c: any) => c.walletAddress?.toLowerCase() === walletAddress.toLowerCase()
      );
      
      setAccount(walletAddress);
      setIsCompanion(isRegistered);
      setCurrentProvider(detectedProvider.provider);
      
      localStorage.setItem("web3_account", walletAddress);
      localStorage.setItem("is_companion", String(isRegistered));
      
      toast({
        title: "¡Wallet conectada!",
        description: `${detectedProvider.name}: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
      });

      // Setup event listeners on the specific provider
      setupProviderListeners(detectedProvider.provider);
      
      return true;
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      
      let errorMessage = "No se pudo conectar la wallet. Por favor intenta de nuevo.";
      
      if (error.code === 4001) {
        errorMessage = "Conexión rechazada. Por favor acepta la solicitud en tu wallet.";
      } else if (error.code === -32002) {
        errorMessage = "Ya hay una solicitud de conexión pendiente. Por favor revisa tu wallet.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error al conectar",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    }
  };

  const setupProviderListeners = (provider: any) => {
    if (!provider) return;

    // Remove existing listeners to avoid duplicates
    if (provider.removeListener) {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", handleChainChanged);
    }

    // Listen for account changes
    provider.on("accountsChanged", handleAccountsChanged);

    // Listen for chain changes
    provider.on("chainChanged", handleChainChanged);
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      const newAddress = accounts[0];
      const companions = JSON.parse(localStorage.getItem("companions") || "[]");
      const isRegistered = companions.some(
        (c: any) => c.walletAddress?.toLowerCase() === newAddress.toLowerCase()
      );
      
      setAccount(newAddress);
      setIsCompanion(isRegistered);
      localStorage.setItem("web3_account", newAddress);
      localStorage.setItem("is_companion", String(isRegistered));
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const disconnectWallet = () => {
    // Clean up listeners
    if (currentProvider) {
      if (currentProvider.removeListener) {
        currentProvider.removeListener("accountsChanged", handleAccountsChanged);
        currentProvider.removeListener("chainChanged", handleChainChanged);
      }
    }

    setAccount(null);
    setIsCompanion(false);
    setCurrentProvider(null);
    localStorage.removeItem("web3_account");
    localStorage.removeItem("is_companion");
    
    toast({
      title: "Desconectado",
      description: "Tu wallet ha sido desconectada.",
    });
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected: !!account,
        connectWallet,
        disconnectWallet,
        isCompanion,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
