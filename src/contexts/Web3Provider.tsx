import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useToast } from '@/hooks/use-toast';

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  isCompanion: boolean;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3ContextProvider');
  }
  return context;
};

interface Web3ContextProviderProps {
  children: ReactNode;
}

export const Web3ContextProvider = ({ children }: Web3ContextProviderProps) => {
  const { address, isConnected: wagmiConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const [isCompanion, setIsCompanion] = useState(false);

  // Check companion status when wallet connects or address changes
  useEffect(() => {
    if (address) {
      // MODO PROTOTIPO: Permitir cualquier wallet conectada como acompañante
      // Para producción, descomentar la validación contra localStorage:
      /*
      const companions = JSON.parse(localStorage.getItem('companions') || '[]');
      const isRegistered = companions.some(
        (c: any) => c.walletAddress?.toLowerCase() === address.toLowerCase()
      );
      setIsCompanion(isRegistered);
      localStorage.setItem('is_companion', String(isRegistered));
      */
      
      // Modo prototipo: Aceptar cualquier wallet
      setIsCompanion(true);
      localStorage.setItem('web3_account', address);
      localStorage.setItem('is_companion', 'true');
    } else {
      setIsCompanion(false);
      localStorage.removeItem('web3_account');
      localStorage.removeItem('is_companion');
    }
  }, [address]);

  const connectWallet = async (): Promise<boolean> => {
    // RainbowKit handles the connection via its button
    // This function is kept for compatibility with existing code
    // Return true if already connected, otherwise return false
    // The actual connection happens through the RainbowKit ConnectButton
    if (wagmiConnected && address) {
      return true;
    }
    
    toast({
      title: 'Conexión de wallet',
      description: 'Por favor usa el botón "Conectar Wallet" para conectar.',
      variant: 'default',
    });
    
    return false;
  };

  const disconnectWallet = () => {
    disconnect();
    setIsCompanion(false);
    localStorage.removeItem('web3_account');
    localStorage.removeItem('is_companion');
    
    toast({
      title: 'Desconectado',
      description: 'Tu wallet ha sido desconectada.',
    });
  };

  return (
    <Web3Context.Provider
      value={{
        account: address || null,
        isConnected: wagmiConnected,
        isCompanion,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
