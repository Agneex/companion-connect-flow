import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
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
    // Check if already connected
    const savedAccount = localStorage.getItem("web3_account");
    const companionStatus = localStorage.getItem("is_companion");
    
    if (savedAccount) {
      setAccount(savedAccount);
      setIsCompanion(companionStatus === "true");
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Simulated Web3 wallet connection
      if (typeof window !== "undefined") {
        // In production, this would use ethers.js or web3.js
        // For now, we simulate with a random address
        const simulatedAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        
        // Check if user is a registered companion
        const companions = JSON.parse(localStorage.getItem("companions") || "[]");
        const isRegistered = companions.length > 0; // Simplified check
        
        setAccount(simulatedAddress);
        setIsCompanion(isRegistered);
        
        localStorage.setItem("web3_account", simulatedAddress);
        localStorage.setItem("is_companion", String(isRegistered));
        
        toast({
          title: "¡Wallet conectada!",
          description: `Conectado como: ${simulatedAddress.slice(0, 6)}...${simulatedAddress.slice(-4)}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error al conectar",
        description: "No se pudo conectar la wallet. Por favor intenta de nuevo.",
        variant: "destructive",
      });
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
