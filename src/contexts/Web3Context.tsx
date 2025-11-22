import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { BrowserProvider } from "ethers";

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
  const { toast } = useToast();

  useEffect(() => {
    // Check if MetaMask is available and if there's a real connection
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const walletAddress = accounts[0].address;
            const companions = JSON.parse(localStorage.getItem("companions") || "[]");
            const isRegistered = companions.some(
              (c: any) => c.walletAddress?.toLowerCase() === walletAddress.toLowerCase()
            );
            
            setAccount(walletAddress);
            setIsCompanion(isRegistered);
            localStorage.setItem("web3_account", walletAddress);
            localStorage.setItem("is_companion", String(isRegistered));
          } else {
            // Clean up old mock data
            localStorage.removeItem("web3_account");
            localStorage.removeItem("is_companion");
          }
        } catch (error) {
          // Clean up if there's an error
          localStorage.removeItem("web3_account");
          localStorage.removeItem("is_companion");
        }
      } else {
        // Clean up if MetaMask is not available
        localStorage.removeItem("web3_account");
        localStorage.removeItem("is_companion");
      }
    };
    
    checkConnection();
  }, []);

  const connectWallet = async (): Promise<boolean> => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        toast({
          title: "MetaMask no detectado",
          description: "Por favor instala MetaMask para continuar.",
          variant: "destructive",
        });
        return false;
      }

      // Request account access using the standard method
      const accounts = await window.ethereum.request({ 
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
      
      localStorage.setItem("web3_account", walletAddress);
      localStorage.setItem("is_companion", String(isRegistered));
      
      toast({
        title: "¡Wallet conectada!",
        description: `Conectado como: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
      });

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
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
      });

      // Listen for chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      
      return true;
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      
      let errorMessage = "No se pudo conectar la wallet. Por favor intenta de nuevo.";
      
      if (error.code === 4001) {
        errorMessage = "Conexión rechazada. Por favor acepta la solicitud en MetaMask.";
      } else if (error.code === -32002) {
        errorMessage = "Ya hay una solicitud de conexión pendiente. Por favor revisa MetaMask.";
      }
      
      toast({
        title: "Error al conectar",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsCompanion(false);
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
