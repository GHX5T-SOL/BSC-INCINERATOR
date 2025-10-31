"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";
import { SafeWeb3ModalProvider } from "@/components/SafeWeb3ModalProvider";

// Setup queryClient
const queryClient = new QueryClient();

// Track if Web3Modal has been initialized
let web3ModalInitialized = false;

// Initialize Web3Modal synchronously on client side
// Always initialize (even with empty projectId) to prevent hook errors
if (typeof window !== "undefined" && !web3ModalInitialized) {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";
  
  try {
    createWeb3Modal({
      wagmiConfig: config,
      projectId: projectId || "default", // Use default to prevent undefined error
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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SafeWeb3ModalProvider>{children}</SafeWeb3ModalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

