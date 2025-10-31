"use client";

import { useState } from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { ERC20_ABI } from "@/utils/abis";
import { useBurnTokens } from "@/hooks/useBurnTokens";
import { NFTMint } from "./NFTMint";

interface Token {
  address: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
}

interface BurnModalProps {
  tokens: Token[];
  onClose: () => void;
  onSuccess: () => void;
}

const BURN_ADDRESS = (process.env.NEXT_PUBLIC_BURN_ADDRESS ||
  "0x181a91f1be23c5ff16137f4b83fb38854f325395") as `0x${string}`;

export function BurnModal({ tokens, onClose, onSuccess }: BurnModalProps) {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [burning, setBurning] = useState(false);
  const [burnSuccess, setBurnSuccess] = useState(false);
  const [burnedTokens, setBurnedTokens] = useState<Token[]>([]);

  const handleBurn = async () => {
    if (!walletClient || !address || !publicClient) return;

    setBurning(true);
    const successfullyBurned: Token[] = [];

    try {
      for (const token of tokens) {
        try {
          const amount = parseUnits(token.balance, token.decimals);

          // Check allowance first
          const allowance = (await publicClient.readContract({
            address: token.address as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "allowance",
            args: [address, BURN_ADDRESS],
          })) as bigint;

          // Approve if needed
          if (allowance < amount) {
            const approveHash = await walletClient.writeContract({
              address: token.address as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "approve",
              args: [BURN_ADDRESS, amount],
            });
            await publicClient.waitForTransactionReceipt({ hash: approveHash });
          }

          // Transfer tokens to burn address
          const transferHash = await walletClient.writeContract({
            address: token.address as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "transfer",
            args: [BURN_ADDRESS, amount],
          });

          await publicClient.waitForTransactionReceipt({ hash: transferHash });
          successfullyBurned.push(token);
        } catch (err) {
          console.error(`Error burning ${token.symbol}:`, err);
        }
      }

      if (successfullyBurned.length > 0) {
        setBurnedTokens(successfullyBurned);
        setBurnSuccess(true);
      } else {
        alert("Failed to burn tokens. Please try again.");
        setBurning(false);
      }
    } catch (err) {
      console.error("Error during burn:", err);
      alert("Error burning tokens. Please try again.");
      setBurning(false);
    }
  };

  if (burnSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="bg-black border-2 border-binance-yellow p-6 md:p-8 max-w-2xl w-full">
          <h2 className="pixel-font text-xl md:text-2xl mb-6 text-binance-yellow">
            Burn Successful! / 销毁成功！
          </h2>
          <p className="pixel-font text-sm mb-4 text-white">
            Successfully burned {burnedTokens.length} token(s) / 成功销毁 {burnedTokens.length} 个代币
          </p>
          <NFTMint burnedTokens={burnedTokens} onClose={onSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-binance-yellow p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="pixel-font text-xl md:text-2xl mb-6 text-binance-yellow">
          Confirm Burn / 确认销毁
        </h2>

        <div className="mb-6 p-4 border-2 border-red-500 bg-red-500 bg-opacity-10">
          <p className="pixel-font text-xs md:text-sm text-red-400 mb-2">
            <span className="text-binance-yellow">⚠️ CN:</span> 此操作不可逆！代币将被永久销毁。
          </p>
          <p className="pixel-font text-xs md:text-sm text-red-400">
            <span className="text-binance-yellow">⚠️ EN:</span> This action is irreversible! Tokens will be permanently burned.
          </p>
        </div>

        <div className="mb-6">
          <p className="pixel-font text-sm mb-4 text-white">
            Tokens to burn / 要销毁的代币:
          </p>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {tokens.map((token) => (
              <div
                key={token.address}
                className="p-3 border border-gray-700 bg-gray-900"
              >
                <p className="pixel-font text-xs text-binance-yellow">
                  {token.symbol} - {token.name}
                </p>
                <p className="pixel-font text-xs text-white">
                  Amount: {parseFloat(token.balance).toLocaleString()}
                </p>
                <p className="pixel-font text-xs text-gray-400 truncate">
                  {token.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 border-2 border-binance-yellow">
          <p className="pixel-font text-xs md:text-sm text-white mb-2">
            <span className="text-binance-yellow">CN:</span> 代币将被发送到销毁地址:
          </p>
          <p className="pixel-font text-xs text-binance-yellow break-all mb-2">
            {BURN_ADDRESS}
          </p>
          <p className="pixel-font text-xs md:text-sm text-white">
            <span className="text-binance-yellow">EN:</span> Tokens will be sent to burn address:
          </p>
          <p className="pixel-font text-xs text-binance-yellow break-all">
            {BURN_ADDRESS}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            disabled={burning}
            className="flex-1 pixel-font px-6 py-3 border-2 border-gray-700 text-gray-400 hover:border-binance-yellow hover:text-binance-yellow transition-colors disabled:opacity-50 text-sm md:text-base"
          >
            Cancel / 取消
          </button>
          <button
            onClick={handleBurn}
            disabled={burning}
            className="flex-1 pixel-font px-6 py-3 bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 text-sm md:text-base"
          >
            {burning ? "Burning... / 销毁中..." : "Confirm Burn / 确认销毁"}
          </button>
        </div>
      </div>
    </div>
  );
}

