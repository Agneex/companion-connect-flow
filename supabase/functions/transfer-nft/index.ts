import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { ethers } from "https://esm.sh/ethers@6.7.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Contract ABI - solo las funciones que necesitamos
const CONTRACT_ABI = [
  "function transferFrom(address from, address to, uint256 tokenId) external",
  "function ownerOf(uint256 tokenId) view returns (address)"
];

const CONTRACT_ADDRESS = "0x7644e99486CDb68aaA86F6756DfD4c08577B4fB0";
const ARBITRUM_SEPOLIA_RPC = "https://sepolia-rollup.arbitrum.io/rpc";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tokenId, companionWallet } = await req.json();

    console.log('Transfer NFT request:', { tokenId, companionWallet });

    if (!tokenId || !companionWallet) {
      return new Response(
        JSON.stringify({ error: 'tokenId and companionWallet are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate wallet address
    if (!ethers.isAddress(companionWallet)) {
      return new Response(
        JSON.stringify({ error: 'Invalid companion wallet address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const privateKeyFromEnv = Deno.env.get('ADMIN_WALLET_PRIVATE_KEY');
    if (!privateKeyFromEnv) {
      console.error('ADMIN_WALLET_PRIVATE_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error: admin wallet key missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalizar clave privada desde entorno
    // 1) Eliminar todos los espacios y saltos de línea
    let normalizedKey = privateKeyFromEnv.replace(/\s+/g, "");

    // 2) Asegurar prefijo 0x
    if (!normalizedKey.startsWith("0x")) {
      normalizedKey = "0x" + normalizedKey;
    }

    // 3) Ajustar longitud del tramo hexadecimal (después de 0x)
    let hexPart = normalizedKey.slice(2);

    // Si viene con 63 caracteres (caso que comentas), anteponemos un 0
    if (hexPart.length === 63) {
      hexPart = "0" + hexPart;
    }

    // Reconstruimos la clave normalizada definitiva
    const privateKey = "0x" + hexPart;

    // 4) Validar formato final: debe ser 0x + 64 hex
    if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
      console.error("ADMIN_WALLET_PRIVATE_KEY has invalid format after normalization. Length:", privateKey.length);
      return new Response(
        JSON.stringify({
          error: "Server configuration error: invalid admin wallet key format",
          hint: "La clave privada debe ser 64 caracteres hexadecimales (0-9, a-f) con prefijo 0x; se han eliminado espacios y, si venía con 63 chars, se ha completado con un 0 al inicio.",
          length: privateKey.length,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Connect to Arbitrum Sepolia
    const provider = new ethers.JsonRpcProvider(ARBITRUM_SEPOLIA_RPC);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    console.log('Admin wallet address:', wallet.address);

    // Verify that admin owns the NFT
    const owner = await contract.ownerOf(tokenId);
    console.log('Current NFT owner:', owner);

    if (owner.toLowerCase() !== wallet.address.toLowerCase()) {
      return new Response(
        JSON.stringify({ 
          error: 'NFT not owned by admin wallet',
          currentOwner: owner,
          adminWallet: wallet.address
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Transfer NFT from admin to companion
    console.log('Transferring NFT from', wallet.address, 'to', companionWallet);
    const tx = await contract.transferFrom(wallet.address, companionWallet, tokenId);
    console.log('Transaction sent:', tx.hash);

    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.hash);

    return new Response(
      JSON.stringify({
        success: true,
        transactionHash: receipt.hash,
        tokenId,
        from: wallet.address,
        to: companionWallet,
        blockNumber: receipt.blockNumber
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error transferring NFT:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Failed to transfer NFT',
        details: errorMessage 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
