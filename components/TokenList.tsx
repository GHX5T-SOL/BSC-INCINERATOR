"use client";

import { useAccount } from "wagmi";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useState } from "react";
import { BurnModal } from "./BurnModal";
import { TokenItem } from "./TokenItem";

export function TokenList() {
  const { address } = useAccount();
  const { tokens, loading, error, refetch } = useTokenBalances(address);
  const [selectedTokens, setSelectedTokens] = useState<Set<string>>(new Set());
  const [showBurnModal, setShowBurnModal] = useState(false);

  const toggleTokenSelection = (tokenAddress: string) => {
    const newSelected = new Set(selectedTokens);
    if (newSelected.has(tokenAddress)) {
      newSelected.delete(tokenAddress);
    } else {
      newSelected.add(tokenAddress);
    }
    setSelectedTokens(newSelected);
  };

  const selectedTokenData = tokens.filter((token) =>
    selectedTokens.has(token.address)
  );

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="pixel-font text-lg">Loading tokens...</p>
        <p className="pixel-font text-sm text-gray-400 mt-2">加载代币中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="pixel-font text-lg text-red-500">Error loading tokens</p>
        <p className="pixel-font text-sm text-gray-400 mt-2">加载代币时出错</p>
        <button
          onClick={() => refetch()}
          className="mt-4 pixel-font px-4 py-2 border-2 border-binance-yellow text-binance-yellow hover:bg-binance-yellow hover:text-black transition-colors"
        >
          Retry / 重试
        </button>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="pixel-font text-lg">No tokens found</p>
        <p className="pixel-font text-sm text-gray-400 mt-2">未找到代币</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="pixel-font text-lg md:text-xl mb-4">
          Your Tokens / 您的代币
        </h2>
        <p className="pixel-font text-xs md:text-sm text-gray-400 mb-4">
          Select tokens you want to burn / 选择您要销毁的代币
        </p>
        {selectedTokens.size > 0 && (
          <div className="mb-4 p-4 border-2 border-binance-yellow bg-black">
            <p className="pixel-font text-sm mb-2">
              {selectedTokens.size} token(s) selected / 已选择 {selectedTokens.size} 个代币
            </p>
            <button
              onClick={() => setShowBurnModal(true)}
              className="pixel-font px-6 py-2 bg-binance-yellow text-black border-2 border-binance-yellow hover:bg-transparent hover:text-binance-yellow transition-colors text-xs md:text-sm"
            >
              Burn Selected / 销毁所选
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <TokenItem
            key={token.address}
            token={token}
            isSelected={selectedTokens.has(token.address)}
            onToggle={() => toggleTokenSelection(token.address)}
          />
        ))}
      </div>

      {showBurnModal && (
        <BurnModal
          tokens={selectedTokenData}
          onClose={() => {
            setShowBurnModal(false);
            setSelectedTokens(new Set());
          }}
          onSuccess={() => {
            setShowBurnModal(false);
            setSelectedTokens(new Set());
            refetch();
          }}
        />
      )}
    </>
  );
}

