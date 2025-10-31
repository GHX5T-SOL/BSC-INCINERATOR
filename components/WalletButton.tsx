"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useSafeWeb3Modal } from "./SafeWeb3ModalProvider";
import { useState, useEffect } from "react";

export function WalletButton() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useSafeWeb3Modal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle wallet connection
  const handleOpen = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Failed to open wallet:", error);
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

