"use client";

interface Token {
  address: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
}

interface TokenItemProps {
  token: Token;
  isSelected: boolean;
  onToggle: () => void;
}

export function TokenItem({ token, isSelected, onToggle }: TokenItemProps) {
  const formattedBalance = parseFloat(token.balance).toLocaleString(undefined, {
    maximumFractionDigits: 6,
  });

  return (
    <div
      className={`p-4 border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-binance-yellow bg-binance-yellow bg-opacity-10"
          : "border-gray-700 hover:border-binance-yellow"
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="pixel-font text-sm md:text-base text-binance-yellow mb-1">
            {token.symbol}
          </h3>
          <p className="pixel-font text-xs text-gray-400 truncate">
            {token.name}
          </p>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="w-5 h-5 accent-binance-yellow cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="mt-2">
        <p className="pixel-font text-xs text-white">
          Balance: {formattedBalance}
        </p>
        <p className="pixel-font text-xs text-gray-400 truncate mt-1">
          {token.address.slice(0, 6)}...{token.address.slice(-4)}
        </p>
      </div>
    </div>
  );
}

