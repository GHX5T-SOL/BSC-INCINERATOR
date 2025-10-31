"use client";

import { useEffect } from "react";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-binance-yellow p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="pixel-font text-xl md:text-2xl mb-6 text-binance-yellow">
          Disclaimer / 免责声明
        </h2>
        
        <div className="space-y-4 pixel-font text-xs md:text-sm text-white leading-relaxed">
          <p>
            <span className="text-binance-yellow">CN:</span> 本页面上所有标记为销毁的代币都将被发送到地址{" "}
            <span className="text-binance-yellow break-all">
              0x181a91f1be23c5ff16137f4b83fb38854f325395
            </span>
            ，该地址将被视为已销毁。此过程不可逆。请确保您只发送那些您希望销毁的无价值代币。
          </p>
          <p>
            <span className="text-binance-yellow">EN:</span> Any tokens marked for burn on this page will be sent to the address{" "}
            <span className="text-binance-yellow break-all">
              0x181a91f1be23c5ff16137f4b83fb38854f325395
            </span>{" "}
            which is considered burnt. This process cannot be reversed. Make sure you only send worthless tokens you wish to have destroyed.
          </p>
        </div>

        <div className="mt-8 space-y-4 pixel-font text-xs md:text-sm text-white">
          <p>
            <span className="text-binance-yellow">CN:</span> 使用本网站即表示您承认并同意，您对所销毁的所有代币承担全部责任。BSC Incinerator 不对因使用本平台而销毁的任何代币负责。
          </p>
          <p>
            <span className="text-binance-yellow">EN:</span> By using this site, you acknowledge and agree that you accept full responsibility for all tokens burned. BSC Incinerator is not responsible for any tokens burned as a result of using this platform.
          </p>
        </div>

        <button
          onClick={onAccept}
          className="mt-8 w-full pixel-font px-6 py-3 bg-binance-yellow text-black border-2 border-binance-yellow hover:bg-transparent hover:text-binance-yellow transition-colors text-sm md:text-base"
        >
          Agree and Close / 同意并关闭
        </button>
      </div>
    </div>
  );
}

