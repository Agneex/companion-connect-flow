import { useAccount } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';
import { useState, useEffect } from 'react';
import contractABI from '@/contracts/ColeccionServiciosNFT.json';

const CONTRACT_ADDRESS = '0x7644e99486CDb68aaA86F6756DfD4c08577B4fB0';

interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: NFTAttribute[];
}

export interface CompanionNFT {
  tokenId: number;
  metadata: NFTMetadata | null;
  category: 'social' | 'health' | 'mobility' | 'emotional';
}

const getCategoryFromAttributes = (attributes: NFTAttribute[]): 'social' | 'health' | 'mobility' | 'emotional' => {
  const actividad = attributes.find(attr => attr.trait_type === 'Actividad')?.value as string || '';
  
  const actividadLower = actividad.toLowerCase();
  if (actividadLower.includes('social') || actividadLower.includes('paseo') || actividadLower.includes('conversación')) return 'social';
  if (actividadLower.includes('salud') || actividadLower.includes('médic') || actividadLower.includes('cita')) return 'health';
  if (actividadLower.includes('movilidad') || actividadLower.includes('transporte') || actividadLower.includes('compras')) return 'mobility';
  if (actividadLower.includes('emocional') || actividadLower.includes('apoyo') || actividadLower.includes('duelo')) return 'emotional';
  
  return 'social';
};

export const useCompanionNFTs = () => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<CompanionNFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) {
        setLoading(false);
        setNfts([]);
        return;
      }

      try {
        setLoading(true);
        const ownedNFTs: CompanionNFT[] = [];
        
        // Check tokens 1-50 (reasonable range for testnet)
        const maxCheckTokens = 50;
        
        for (let tokenId = 1; tokenId <= maxCheckTokens; tokenId++) {
          try {
            // Check ownership using fetch directly to Arbitrum Sepolia RPC
            const rpcUrl = 'https://sepolia-rollup.arbitrum.io/rpc';
            
            // Call ownerOf
            const ownerResponse = await fetch(rpcUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_call',
                params: [{
                  to: CONTRACT_ADDRESS,
                  data: `0x6352211e${tokenId.toString(16).padStart(64, '0')}` // ownerOf(tokenId)
                }, 'latest']
              })
            });

            const ownerResult = await ownerResponse.json();
            
            if (ownerResult.result && ownerResult.result !== '0x') {
              const owner = `0x${ownerResult.result.slice(-40)}`.toLowerCase();
              
              if (owner === address.toLowerCase()) {
                // Get token URI
                const uriResponse = await fetch(rpcUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 2,
                    method: 'eth_call',
                    params: [{
                      to: CONTRACT_ADDRESS,
                      data: `0xc87b56dd${tokenId.toString(16).padStart(64, '0')}` // tokenURI(tokenId)
                    }, 'latest']
                  })
                });

                const uriResult = await uriResponse.json();
                let metadata: NFTMetadata | null = null;
                
                if (uriResult.result && uriResult.result !== '0x') {
                  try {
                    // Decode the URI from hex
                    const uri = decodeURIFromHex(uriResult.result);
                    
                    if (uri) {
                      // Fetch metadata from IPFS
                      const ipfsUrl = uri.startsWith('ipfs://') 
                        ? uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
                        : uri;
                      
                      const metadataResponse = await fetch(ipfsUrl);
                      if (metadataResponse.ok) {
                        metadata = await metadataResponse.json();
                      }
                    }
                  } catch (e) {
                    console.error(`Error fetching metadata for token ${tokenId}:`, e);
                  }
                }

                const category = metadata?.attributes 
                  ? getCategoryFromAttributes(metadata.attributes)
                  : 'social';

                ownedNFTs.push({
                  tokenId,
                  metadata,
                  category,
                });
              }
            }
          } catch (error) {
            // Token might not exist or other error, continue
            console.log(`Token ${tokenId} check failed, continuing...`);
          }
        }

        setNfts(ownedNFTs);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [address]);

  return { nfts, loading };
};

// Helper function to decode URI from contract call result
function decodeURIFromHex(hexString: string): string | null {
  try {
    // Remove 0x prefix
    const hex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
    
    // The first 64 chars (32 bytes) is the offset to the string data
    const offset = parseInt(hex.slice(0, 64), 16) * 2;
    
    // The next 64 chars at the offset is the length of the string
    const length = parseInt(hex.slice(offset, offset + 64), 16);
    
    // The actual string data follows
    const dataStart = offset + 64;
    const data = hex.slice(dataStart, dataStart + length * 2);
    
    // Convert hex to string
    let str = '';
    for (let i = 0; i < data.length; i += 2) {
      const charCode = parseInt(data.substr(i, 2), 16);
      if (charCode) str += String.fromCharCode(charCode);
    }
    
    return str;
  } catch (error) {
    console.error('Error decoding URI:', error);
    return null;
  }
}
