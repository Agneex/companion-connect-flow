import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import ColeccionServiciosNFT from '@/contracts/ColeccionServiciosNFT.json';

const CONTRACT_ADDRESS = '0x7644e99486CDb68aaA86F6756DfD4c08577B4fB0';
const ARBITRUM_SEPOLIA_RPC = 'https://sepolia-rollup.arbitrum.io/rpc';

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useServiceContract = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const getContract = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    return new ethers.Contract(
      CONTRACT_ADDRESS,
      ColeccionServiciosNFT.abi,
      signer
    );
  };

  // Asigna el acompañante al servicio y marca como completado
  const completeService = async (tokenId: string, activity: string, duration: number) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    try {
      const contract = await getContract();
      
      // Asignar acompañante al servicio
      const assignTx = await contract.asignarAcompanante(tokenId, address);
      await assignTx.wait();
      
      // Marcar como pagado (esto debería mintear/transferir el NFT al acompañante)
      const payTx = await contract.marcarComoPagado(tokenId);
      const receipt = await payTx.wait();
      
      setLoading(false);
      return {
        success: true,
        txHash: receipt.hash,
      };
    } catch (error: any) {
      setLoading(false);
      console.error('Error completing service:', error);
      throw new Error(error.message || 'Error al completar el servicio');
    }
  };

  // Verifica que el tokenId existe y obtiene información
  const verifyToken = async (tokenId: string) => {
    try {
      const provider = new ethers.JsonRpcProvider(ARBITRUM_SEPOLIA_RPC);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ColeccionServiciosNFT.abi,
        provider
      );

      // Verificar que el token existe obteniendo su owner
      const owner = await contract.ownerOf(tokenId);
      const estado = await contract.estadosServicios(tokenId);
      
      return {
        exists: true,
        owner,
        estado: Number(estado),
      };
    } catch (error) {
      console.error('Error verifying token:', error);
      return {
        exists: false,
        owner: null,
        estado: null,
      };
    }
  };

  return {
    completeService,
    verifyToken,
    loading,
  };
};
