# 🚀 Quick Start Guide

## Before You Start

1. **Get a WalletConnect Project ID**
   - Visit: https://cloud.walletconnect.com/
   - Sign up / Log in
   - Create a new project
   - Copy your Project ID

2. **Set Up Your Wallet**
   - Install MetaMask or another BSC-compatible wallet
   - Add BSC Network (if not already added)
   - Ensure you have some BNB for gas fees

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_BSC_RPC_URL=https://bsc-dataseed.binance.org/
NEXT_PUBLIC_BURN_ADDRESS=0x181a91f1be23c5ff16137f4b83fb38854f325395
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=
NEXT_PUBLIC_CHAIN_ID=56
```

### 3. Deploy Smart Contract (Required for NFT Minting)

See `DEPLOYMENT.md` for detailed instructions.

**Quick deploy to testnet:**

1. Add to `.env`:
   ```env
   PRIVATE_KEY=your_wallet_private_key
   BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
   ```

2. Get testnet BNB: https://testnet.binance.org/faucet-smart

3. Deploy:
   ```bash
   npm run deploy:testnet
   ```

4. Copy the contract address and add to `.env`:
   ```env
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xYourContractAddress
   ```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Connect Wallet**: Click "Connect Wallet" in the top right
2. **View Tokens**: Your BSC tokens will be displayed
3. **Select Tokens**: Check the boxes next to tokens you want to burn
4. **Burn Tokens**: Click "Burn Selected" and confirm the transaction
5. **Mint NFT**: After burning, mint your unique pixel art NFT!

## Deployment to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Need Help?

- Check `README.md` for detailed documentation
- See `DEPLOYMENT.md` for deployment instructions
- Review error messages in browser console

