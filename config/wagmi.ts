import { createConfig, http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { walletConnect, injected, metaMask } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

// Get chain ID from environment or default to BSC mainnet
const chainId = process.env.NEXT_PUBLIC_CHAIN_ID 
  ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) 
  : 56;

const chains = chainId === 56 ? [bsc] as const : [bscTestnet] as const;

// Build connectors - always include walletConnect with projectId (will fail gracefully if empty)
export const config = createConfig({
  chains: chainId === 56 ? [bsc] : [bscTestnet],
  connectors: projectId 
    ? [
        walletConnect({ projectId }),
        injected(),
        metaMask(),
      ]
    : [
        injected(),
        metaMask(),
      ],
  transports: {
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_RPC_URL || "https://bsc-dataseed.binance.org/"),
    [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545/"),
  },
});

