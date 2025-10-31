"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";
import { SafeWeb3ModalProvider } from "@/components/SafeWeb3ModalProvider";
import { useEffect, useState } from "react";

// Setup queryClient
const queryClient = new QueryClient();

// Track if Web3Modal has been initialized
let web3ModalInitialized = false;

function initializeWeb3Modal() {
  if (typeof window === "undefined" || web3ModalInitialized) return;
  
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  
  if (!projectId || projectId === "") {
    // Don't initialize without projectId - will use injected wallet fallback
    return;
  }
  
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
      console.warn("Web3Modal initialization skipped:", error?.message || error);
    }
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize synchronously on client side
  useEffect(() => {
    initializeWeb3Modal();
    setIsInitialized(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {isInitialized ? (
          <SafeWeb3ModalProvider>{children}</SafeWeb3ModalProvider>
        ) : (
          <div className="min-h-screen bg-black text-binance-yellow flex items-center justify-center">
            <p className="pixel-font">Loading...</p>
          </div>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

