"use client";

import { useState, useEffect } from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { generatePixelArtNFT, PixelArtNFT } from "@/utils/pixelArtGenerator";
import { NFT_ABI } from "@/utils/nftAbi";

interface Token {
  address: string;
  symbol: string;
}

interface NFTMintProps {
  burnedTokens: Token[];
  onClose: () => void;
}

const NFT_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

export function NFTMint({ burnedTokens, onClose }: NFTMintProps) {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [nft, setNft] = useState<PixelArtNFT | null>(null);
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintHash, setMintHash] = useState<string | null>(null);

  useEffect(() => {
    // Generate NFT when component mounts
    const generatedNFT = generatePixelArtNFT();
    setNft(generatedNFT);
  }, []);

  const handleMint = async () => {
    if (!walletClient || !address || !nft || !publicClient) return;

    // Check if contract is deployed
    if (NFT_CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      alert(
        "NFT contract not deployed yet. Please deploy the contract first and set NEXT_PUBLIC_NFT_CONTRACT_ADDRESS in your .env file."
      );
      return;
    }

    setMinting(true);

    try {
      // Encode metadata URI (in production, upload to IPFS)
      const metadataURI = `data:application/json;base64,${btoa(
        JSON.stringify(nft.metadata)
      )}`;

      // Call mint function
      const hash = await walletClient.writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_ABI,
        functionName: "mint",
        args: [address, metadataURI],
      });

      setMintHash(hash);

      // Wait for transaction
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setMintSuccess(true);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (err) {
      console.error("Error minting NFT:", err);
      alert("Error minting NFT. Please try again.");
      setMinting(false);
    }
  };

  if (mintSuccess && nft) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="pixel-font text-lg md:text-xl text-binance-yellow mb-4">
            NFT Minted Successfully! / NFT 铸造成功！
          </h3>
          {mintHash && (
            <p className="pixel-font text-xs text-gray-400 mb-2">
              Transaction Hash / 交易哈希:
            </p>
          )}
          {mintHash && (
            <p className="pixel-font text-xs text-binance-yellow break-all mb-4">
              {mintHash}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <div className="border-4 border-binance-yellow p-4 bg-black">
            <img
              src={nft.imageData}
              alt={nft.metadata.name}
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>

        <div className="p-4 border-2 border-binance-yellow bg-gray-900">
          <p className="pixel-font text-sm text-binance-yellow mb-2">
            {nft.metadata.name}
          </p>
          <p className="pixel-font text-xs text-white mb-4">
            {nft.metadata.description}
          </p>
          <div className="space-y-1">
            {nft.metadata.attributes.map((attr, idx) => (
              <p key={idx} className="pixel-font text-xs text-gray-400">
                {attr.trait_type}: {attr.value}
              </p>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full pixel-font px-6 py-3 bg-binance-yellow text-black border-2 border-binance-yellow hover:bg-transparent hover:text-binance-yellow transition-colors text-sm md:text-base"
        >
          Close / 关闭
        </button>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="text-center">
        <p className="pixel-font text-sm">Generating NFT...</p>
        <p className="pixel-font text-xs text-gray-400 mt-2">生成 NFT 中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="pixel-font text-lg md:text-xl text-binance-yellow mb-4">
          Mint Your NFT / 铸造您的 NFT
        </h3>
        <p className="pixel-font text-xs md:text-sm text-white mb-2">
          You burned {burnedTokens.length} token(s). Mint your unique NFT now!
        </p>
        <p className="pixel-font text-xs text-gray-400">
          您已销毁 {burnedTokens.length} 个代币。立即铸造您的独特 NFT！
        </p>
      </div>

      <div className="flex justify-center">
        <div className="border-4 border-binance-yellow p-4 bg-black">
          <img
            src={nft.imageData}
            alt="Preview"
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </div>
      </div>

      <div className="p-4 border-2 border-gray-700 bg-gray-900">
        <p className="pixel-font text-sm text-binance-yellow mb-2">
          {nft.metadata.name}
        </p>
        <p className="pixel-font text-xs text-white mb-3">
          Character: {nft.character}
        </p>
        <p className="pixel-font text-xs text-gray-400">
          {nft.metadata.description}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onClose}
          disabled={minting}
          className="flex-1 pixel-font px-6 py-3 border-2 border-gray-700 text-gray-400 hover:border-binance-yellow hover:text-binance-yellow transition-colors disabled:opacity-50 text-sm md:text-base"
        >
          Skip / 跳过
        </button>
        <button
          onClick={handleMint}
          disabled={minting}
          className="flex-1 pixel-font px-6 py-3 bg-binance-yellow text-black border-2 border-binance-yellow hover:bg-transparent hover:text-binance-yellow transition-colors disabled:opacity-50 text-sm md:text-base"
        >
          {minting ? "Minting... / 铸造中..." : "Mint NFT / 铸造 NFT"}
        </button>
      </div>

      {NFT_CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000" && (
        <div className="p-4 border-2 border-yellow-500 bg-yellow-500 bg-opacity-10">
          <p className="pixel-font text-xs text-yellow-400">
            ⚠️ NFT contract not deployed. Please deploy the contract first.
          </p>
        </div>
      )}
    </div>
  );
}

