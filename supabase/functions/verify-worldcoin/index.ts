import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyRequest {
  proof: string;
  merkle_root: string;
  nullifier_hash: string;
  signal?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appId = Deno.env.get('WORLDCOIN_APP_ID');
    const actionId = 'validation-human'; // This should match what you configure in Worldcoin dashboard
    
    if (!appId) {
      throw new Error('WORLDCOIN_APP_ID not configured');
    }

    const { proof, merkle_root, nullifier_hash, signal } = await req.json() as VerifyRequest;

    console.log('Verifying Worldcoin proof:', { nullifier_hash, merkle_root });

    // Verify the proof with Worldcoin's API
    const verifyResponse = await fetch(`https://developer.worldcoin.org/api/v1/verify/${appId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        proof,
        merkle_root,
        nullifier_hash,
        signal: signal || '',
        action: actionId,
      }),
    });

    const verifyData = await verifyResponse.json();

    console.log('Worldcoin verification response:', verifyData);

    if (!verifyResponse.ok) {
      throw new Error(`Worldcoin verification failed: ${JSON.stringify(verifyData)}`);
    }

    if (!verifyData.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Verification failed',
          details: verifyData 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        nullifier_hash,
        verified: true
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error verifying Worldcoin proof:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
