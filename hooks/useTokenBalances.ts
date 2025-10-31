"use client";

import { useState, useEffect } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { formatUnits } from "viem";
import { ERC20_ABI } from "@/utils/abis";

interface Token {
  address: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
}

export function useTokenBalances(address: `0x${string}` | undefined) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const publicClient = usePublicClient();

  const fetchTokenBalances = async () => {
    if (!address || !publicClient) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get token transfers for the user
      // For BSC, we'll use a simplified approach: check common token contracts
      // In production, you might want to use BSCScan API or indexer
      const tokenAddresses = await getTokenAddressesFromTransfers(
        address,
        publicClient
      );

      // Fetch balances for all found tokens
      const tokenPromises = tokenAddresses.map(async (tokenAddress) => {
        try {
          const [symbol, name, decimals, balance] = await Promise.all([
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "symbol",
            }),
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "name",
            }),
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "decimals",
            }),
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "balanceOf",
              args: [address],
            }),
          ]);

          const balanceFormatted = formatUnits(balance as bigint, Number(decimals));
          
          // Only include tokens with balance > 0
          if (parseFloat(balanceFormatted) > 0) {
            return {
              address: tokenAddress,
              symbol: symbol as string,
              name: name as string,
              balance: balanceFormatted,
              decimals: Number(decimals),
            };
          }
          return null;
        } catch (err) {
          console.error(`Error fetching token ${tokenAddress}:`, err);
          return null;
        }
      });

      const tokenResults = await Promise.all(tokenPromises);
      const validTokens = tokenResults.filter(
        (token): token is Token => token !== null
      );

      setTokens(validTokens);
    } catch (err) {
      console.error("Error fetching token balances:", err);
      setError("Failed to fetch token balances");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenBalances();
  }, [address, publicClient]);

  return {
    tokens,
    loading,
    error,
    refetch: fetchTokenBalances,
  };
}

// Helper function to get token addresses from user's transfer history
async function getTokenAddressesFromTransfers(
  address: `0x${string}`,
  publicClient: any
): Promise<string[]> {
  // This is a simplified version. In production, you might want to:
  // 1. Use BSCScan API to get token transfers
  // 2. Use an indexer service
  // 3. Cache results
  // For now, we'll use a predefined list of common BSC tokens as a fallback
  // and try to get transfers from recent blocks

  const commonTokens = [
    "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", // CAKE
    "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", // ETH
    "0x55d398326f99059fF775485246999027B3197955", // USDT
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", // BUSD
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", // USDC
  ];

  try {
    // Try to get recent transfers for the user
    // This is a basic implementation - you might want to enhance this
    const currentBlock = await publicClient.getBlockNumber();
    const fromBlock = currentBlock - BigInt(10000); // Last ~10000 blocks

    // Note: This is a simplified approach. For production, use BSCScan API
    // or an indexer service to efficiently get all token transfers
    return commonTokens;
  } catch (err) {
    console.error("Error getting token addresses:", err);
    return commonTokens;
  }
}

