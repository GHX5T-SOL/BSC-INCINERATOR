"use client";

import { WalletButton } from "@/components/WalletButton";
import { TokenList } from "@/components/TokenList";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

const BIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BIN_CONTRACT_ADDRESS || "0xPlaceholder000";

// Force dynamic rendering to avoid SSG issues with Web3Modal
export const dynamic = 'force-dynamic';

export default function Home() {
  const { isConnected } = useAccount();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("disclaimerAccepted");
    if (!accepted) {
      setShowDisclaimer(true);
    } else {
      setDisclaimerAccepted(true);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setShowDisclaimer(false);
    setDisclaimerAccepted(true);
  };

  return (
    <main className="min-h-screen bg-black text-binance-yellow">
      {/* Header */}
      <header className="border-b-2 border-binance-yellow p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/favicon.png" 
              alt="BSC Incinerator Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="pixel-font text-xl md:text-2xl">BSC INCINERATOR</h1>
              <span className="pixel-font text-xs md:text-sm text-gray-400">burn tokens, mint nfts</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/BSCincinerator"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Follow BSC Incinerator on X"
              >
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 fill-binance-yellow"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://github.com/GHX5T-SOL/BSC-INCINERATOR"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="View BSC Incinerator on GitHub"
              >
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 fill-binance-yellow"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* $BIN Contract Address Box */}
        <div className="mb-8 p-6 border-4 border-binance-yellow bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="pixel-font text-lg md:text-xl text-binance-yellow mb-2">
                $BIN Contract Address
              </p>
              <p className="pixel-font text-xs md:text-sm text-gray-400 mb-1">
                $BIN 合约地址
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <code className="pixel-font text-xs md:text-sm text-white bg-gray-900 px-4 py-3 border-2 border-gray-700 flex-1 md:flex-initial break-all">
                {BIN_CONTRACT_ADDRESS}
              </code>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(BIN_CONTRACT_ADDRESS);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                  }
                }}
                className={`pixel-font px-4 py-3 border-2 transition-colors text-xs md:text-sm whitespace-nowrap ${
                  copied
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-binance-yellow text-black border-binance-yellow hover:bg-transparent hover:text-binance-yellow"
                }`}
                aria-label="Copy contract address"
              >
                {copied ? "Copied! / 已复制!" : "Copy / 复制"}
              </button>
            </div>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-20">
            <p className="pixel-font text-lg md:text-xl mb-4">
              Connect your wallet to continue.
            </p>
            <p className="pixel-font text-sm md:text-base text-gray-400">
              连接您的钱包以继续。
            </p>
          </div>
        ) : (
          <TokenList />
        )}
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <DisclaimerModal onAccept={handleAcceptDisclaimer} />
      )}
    </main>
  );
}

