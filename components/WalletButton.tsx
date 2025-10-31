"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export function WalletButton() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => open()}
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
      onClick={() => open()}
      className="pixel-font px-4 py-2 bg-binance-yellow text-black border-2 border-binance-yellow hover:bg-transparent hover:text-binance-yellow transition-colors text-xs md:text-sm"
    >
      Connect Wallet
    </button>
  );
}

