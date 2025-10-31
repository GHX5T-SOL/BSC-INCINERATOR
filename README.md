# 🔥 BSC Incinerator

<div align="center">

![BSC Incinerator](https://img.shields.io/badge/BSC-Incinerator-F3BA2F?style=for-the-badge&logo=binance&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?style=for-the-badge&logo=solidity)

**Burn unwanted BSC tokens and mint unique pixel art Chinese character NFTs**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

[![X (Twitter)](https://img.shields.io/badge/X-@BSCincinerator-black?style=for-the-badge&logo=x&logoColor=white)](https://x.com/BSCincinerator)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GHX5T-SOL/BSC-INCINERATOR)

</div>

---

## 📖 Overview

BSC Incinerator is a decentralized platform on Binance Smart Chain that allows users to burn unwanted "dust" tokens and receive unique pixel art NFTs featuring Chinese characters as rewards. Built with a retro pixel art aesthetic, the platform features bilingual support (English/Chinese) and a seamless wallet integration experience.

### ✨ Features

- 🔥 **Token Burning**: Send unwanted tokens to a burn address permanently
- 🎨 **NFT Minting**: Receive unique pixel art NFTs with Chinese characters after burning
- 💼 **Wallet Integration**: Seamless connection with MetaMask and other BSC-compatible wallets
- 🌐 **Bilingual Support**: Full English and Chinese language support
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- 🎮 **Pixel Art Style**: Retro gaming aesthetic with pixel fonts and black/yellow theme

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- A BSC-compatible wallet (MetaMask recommended)
- BNB for gas fees (for contract deployment and transactions)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bsc-incinerator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_BSC_RPC_URL=https://bsc-dataseed.binance.org/
   NEXT_PUBLIC_BURN_ADDRESS=0x181a91f1be23c5ff16137f4b83fb38854f325395
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_deployed_contract_address
   NEXT_PUBLIC_CHAIN_ID=56
   ```

4. **Get WalletConnect Project ID**
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy your Project ID to `.env`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📦 Smart Contract Deployment

### Deploy to BSC Testnet (Recommended for testing)

1. **Set up Hardhat environment**
   ```bash
   # Add to .env
   PRIVATE_KEY=your_wallet_private_key
   BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
   ```

2. **Deploy the contract**
   ```bash
   npx hardhat run scripts/deploy.ts --network bscTestnet
   ```

3. **Copy the deployed contract address** and add it to `.env` as `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`

### Deploy to BSC Mainnet

⚠️ **IMPORTANT**: Ensure you have BNB in your wallet for gas fees!

1. **Set up environment**
   ```bash
   # Add to .env
   PRIVATE_KEY=your_wallet_private_key
   BSC_RPC_URL=https://bsc-dataseed.binance.org/
   ```

2. **Deploy**
   ```bash
   npx hardhat run scripts/deploy.ts --network bsc
   ```

3. **Verify on BSCScan** (optional)
   ```bash
   npx hardhat verify --network bsc <CONTRACT_ADDRESS> "BSC Incinerator NFT" "BSCINCNFT" <OWNER_ADDRESS>
   ```

---

## 🏗️ Project Structure

```
bsc-incinerator/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page
│   ├── globals.css        # Global styles
│   └── providers.tsx      # Web3 providers
├── components/            # React components
│   ├── WalletButton.tsx   # Wallet connection button
│   ├── TokenList.tsx      # Token list display
│   ├── TokenItem.tsx      # Individual token item
│   ├── BurnModal.tsx      # Burn confirmation modal
│   ├── NFTMint.tsx        # NFT minting interface
│   └── DisclaimerModal.tsx # Disclaimer modal
├── hooks/                 # Custom React hooks
│   ├── useTokenBalances.ts # Token balance fetching
│   └── useBurnTokens.ts   # Token burning logic
├── utils/                 # Utility functions
│   ├── pixelArtGenerator.ts # NFT generation
│   ├── abis.ts            # ERC20 ABI
│   └── nftAbi.ts          # NFT contract ABI
├── config/                # Configuration files
│   └── wagmi.ts           # Wagmi/Web3Modal config
├── contracts/             # Smart contracts
│   └── BSCIncineratorNFT.sol # ERC721 NFT contract
├── scripts/               # Deployment scripts
│   └── deploy.ts          # Contract deployment
└── public/                # Static assets
```

---

## 🎨 Design System

- **Colors**:
  - Background: `#000000` (Black)
  - Primary: `#F3BA2F` (Binance Yellow)
  - Text: White/Gray variants

- **Typography**: 
  - Font: `Press Start 2P` (Pixel retro style)
  - Responsive font sizes for mobile/desktop

- **Components**:
  - Pixel-styled buttons with hover effects
  - Bordered modals and cards
  - Custom scrollbars

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_BSC_RPC_URL` | BSC mainnet RPC URL | Yes |
| `NEXT_PUBLIC_BURN_ADDRESS` | Token burn address | Yes |
| `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` | Deployed NFT contract | Yes |
| `NEXT_PUBLIC_CHAIN_ID` | BSC chain ID (56 for mainnet) | Yes |
| `PRIVATE_KEY` | Wallet private key (for deployment) | For deployment only |

---

## 🧪 Testing

### Test Token Burning

1. Connect your wallet
2. Select tokens you want to burn
3. Confirm the burn transaction
4. After successful burn, mint your NFT

### Test NFT Minting

- NFT minting is available after successfully burning tokens
- Each burn allows you to mint one unique NFT
- NFTs feature randomly generated Chinese characters with pixel art styling

---

## 📱 Mobile Support

The platform is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

---

## 🔒 Security

- ⚠️ **Token burning is irreversible** - Always double-check before confirming
- 🔐 Private keys are never stored or transmitted
- ✅ Smart contracts use OpenZeppelin's audited libraries
- 🛡️ All transactions require explicit user approval

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Inspired by [Sol Incinerator](https://sol-incinerator.com/)
- Built with [Next.js](https://nextjs.org/)
- Powered by [Wagmi](https://wagmi.sh/) and [Web3Modal](https://web3modal.com/)
- Smart contracts use [OpenZeppelin](https://www.openzeppelin.com/)

---

## 📞 Support & Social Links

- 🐦 **X (Twitter)**: [@BSCincinerator](https://x.com/BSCincinerator)
- 💻 **GitHub**: [BSC-INCINERATOR](https://github.com/GHX5T-SOL/BSC-INCINERATOR)

For issues, questions, or suggestions:
- Open an issue on GitHub
- Follow us on X for updates
- Check the documentation

---

<div align="center">

**Made with 🔥 for the BSC community**

⭐ Star this repo if you find it useful!

</div>

