/**
 * Web3 Provider Detection and Selection Utility
 * Handles multiple wallet extensions and prioritizes MetaMask
 */

export interface DetectedProvider {
  provider: any;
  name: string;
  isMetaMask: boolean;
}

/**
 * Detect all available Web3 providers in the window object
 */
export const detectProviders = (): DetectedProvider[] => {
  const providers: DetectedProvider[] = [];

  if (typeof window === "undefined") {
    return providers;
  }

  // Check for window.ethereum (standard)
  if (window.ethereum) {
    // Handle multiple providers (e.g., MetaMask + Yoroi)
    if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
      window.ethereum.providers.forEach((provider: any) => {
        providers.push({
          provider,
          name: getProviderName(provider),
          isMetaMask: !!provider.isMetaMask,
        });
      });
    } else {
      // Single provider
      providers.push({
        provider: window.ethereum,
        name: getProviderName(window.ethereum),
        isMetaMask: !!window.ethereum.isMetaMask,
      });
    }
  }

  return providers;
};

/**
 * Get the name of a provider based on its properties
 */
const getProviderName = (provider: any): string => {
  if (provider.isMetaMask) return "MetaMask";
  if (provider.isYoroi) return "Yoroi";
  if (provider.isCoinbaseWallet) return "Coinbase Wallet";
  if (provider.isTrust) return "Trust Wallet";
  if (provider.isBraveWallet) return "Brave Wallet";
  return "Unknown Wallet";
};

/**
 * Get the preferred provider (prioritize MetaMask)
 */
export const getPreferredProvider = (): DetectedProvider | null => {
  const providers = detectProviders();

  if (providers.length === 0) {
    return null;
  }

  // Prioritize MetaMask
  const metamask = providers.find((p) => p.isMetaMask);
  if (metamask) {
    return metamask;
  }

  // Return the first available provider
  return providers[0];
};

/**
 * Check if any Web3 provider is available
 */
export const isWeb3Available = (): boolean => {
  return detectProviders().length > 0;
};

/**
 * Get a list of provider names for display
 */
export const getProviderNames = (): string[] => {
  return detectProviders().map((p) => p.name);
};
