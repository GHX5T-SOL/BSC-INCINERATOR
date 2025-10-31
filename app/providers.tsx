"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";

// Setup queryClient
const queryClient = new QueryClient();

// Track if Web3Modal has been initialized
let web3ModalInitialized = false;

// Initialize Web3Modal synchronously on client side
if (typeof window !== "undefined") {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  
  if (projectId && projectId !== "" && !web3ModalInitialized) {
    try {
      createWeb3Modal({
        wagmiConfig: config,
        projectId,
        enableAnalytics: false,
        enableOnramp: false,
      });
      web3ModalInitialized = true;
    } catch (error: any) {
      // Modal might already be initialized - this is okay
      if (error?.message?.includes("already initialized") || error?.message?.includes("Core is already initialized")) {
        web3ModalInitialized = true;
      } else {
        // Silently fail - will use injected wallet fallback
        console.warn("Web3Modal initialization skipped:", error?.message || error);
      }
    }
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

