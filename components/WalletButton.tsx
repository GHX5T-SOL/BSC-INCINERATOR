"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState, useEffect } from "react";

export function WalletButton() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);
  
  // Always call the hook (React rules), but handle errors gracefully
  let modalOpen: (() => Promise<void>) | undefined;
  try {
    const modal = useWeb3Modal();
    modalOpen = modal.open;
  } catch (error: any) {
    // Web3Modal not ready - will use fallback
    // This is expected during SSR or if projectId is not set
    if (error?.message && !error.message.includes("projectId is undefined")) {
      console.warn("Web3Modal hook not available:", error.message);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle wallet connection with fallback if Web3Modal not available
  const handleOpen = async () => {
    if (modalOpen) {
      try {
        await modalOpen();
        return;
      } catch (error) {
        console.error("Failed to open wallet modal:", error);
      }
    }
    
    // Fallback: try to use injected wallet directly
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      } catch (err) {
        console.error("Failed to connect:", err);
      }
    }
  };

  if (!mounted) {
    return (
      <button className="pixel-font px-4 py-2 bg-binance-yellow text-black border-2 border-binance-yellow text-xs md:text-sm">
        Connect Wallet
      </button>
    );
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleOpen}
          className="pixel-font px-4 py-2 bg-binance-yellow text-black border-2 border-binance-yellow hover:bg-transparent hover:text-binance-yellow transition-colors text-xs md:text-sm"
        >
          {formatAddress(address)}
        </button>
        <button
          onClick={() => disconnect()}
          className="pixel-font px-4 py-2 border-2 border-binance-yellow text-binance-yellow hover:bg-binance-yellow hover:text-black transition-colors text-xs md:text-sm"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleOpen}
      className="pixel-font px-4 py-2 bg-binance-yellow text-black border-2 border-binance-yellow hover:bg-transparent hover:text-binance-yellow transition-colors text-xs md:text-sm"
    >
      Connect Wallet
    </button>
  );
}

