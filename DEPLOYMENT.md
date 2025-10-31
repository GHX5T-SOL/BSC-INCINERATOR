# 🚀 Deployment Guide

## Smart Contract Deployment

### Prerequisites

1. **BNB for Gas Fees**: Ensure your deployment wallet has sufficient BNB
   - BSC Testnet: Get free BNB from [BSC Faucet](https://testnet.binance.org/faucet-smart)
   - BSC Mainnet: Transfer BNB from Binance or another exchange

2. **Wallet Setup**: Export your private key from MetaMask or your wallet
   - ⚠️ **SECURITY WARNING**: Never share your private key publicly
   - Use environment variables to store it securely

### Step 1: Configure Environment Variables

Add to your `.env` file:

```env
# For Testnet Deployment
PRIVATE_KEY=your_wallet_private_key_here
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/

# For Mainnet Deployment
PRIVATE_KEY=your_wallet_private_key_here
BSC_RPC_URL=https://bsc-dataseed.binance.org/
```

### Step 2: Compile Contracts

```bash
npm run compile
```

### Step 3: Deploy to BSC Testnet (Recommended First)

```bash
npm run deploy:testnet
```

**Expected Output:**
```
Deploying contracts with the account: 0xYourAddress...
Account balance: 1000000000000000000
BSCIncineratorNFT deployed to: 0xContractAddress...

📝 Next steps:
1. Copy the contract address above
2. Add it to your .env file as NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
3. Verify the contract on BSCScan (optional)
```

### Step 4: Update Frontend Configuration

After deployment, copy the contract address and add it to `.env`:

```env
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

### Step 5: Deploy to BSC Mainnet (Production)

⚠️ **CRITICAL**: Only deploy to mainnet after thorough testing on testnet!

```bash
npm run deploy:mainnet
```

### Step 6: Verify Contract on BSCScan (Optional but Recommended)

```bash
npx hardhat verify --network bsc <CONTRACT_ADDRESS> "BSC Incinerator NFT" "BSCINCNFT" <OWNER_ADDRESS>
```

### Step 7: Update Frontend

1. Update `.env` with the mainnet contract address
2. Rebuild and redeploy your frontend:

```bash
npm run build
```

## Frontend Deployment to Vercel

### Automatic Deployment

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_BSC_RPC_URL`
   - `NEXT_PUBLIC_BURN_ADDRESS`
   - `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_CHAIN_ID`
4. Deploy!

### Manual Deployment

```bash
npm run build
vercel --prod
```

## Deployment Wallet Address

**IMPORTANT**: To deploy the smart contract, you need:

1. A wallet address with BNB for gas fees
2. The private key for that wallet (keep it secure!)

### Get BNB for Deployment

**BSC Testnet:**
- Visit: https://testnet.binance.org/faucet-smart
- Enter your wallet address
- Request testnet BNB

**BSC Mainnet:**
- Transfer BNB from Binance exchange
- Or use another exchange/wallet to send BNB to your deployment address

### Estimated Gas Costs

- **Contract Deployment**: ~0.01-0.05 BNB (depending on network conditions)
- **Each Mint Transaction**: ~0.001-0.005 BNB

## Security Checklist

- [ ] Private key stored securely (never commit to git)
- [ ] Environment variables configured correctly
- [ ] Contract tested on testnet first
- [ ] Contract address added to frontend `.env`
- [ ] Frontend environment variables set in Vercel
- [ ] BSCScan verification completed (optional)

## Troubleshooting

### "Insufficient funds" Error
- Ensure your wallet has enough BNB for gas fees
- Check the current gas price on BSCScan

### "Contract deployment failed"
- Verify your RPC URL is correct
- Check network connectivity
- Ensure private key is correct

### "Frontend can't connect to contract"
- Verify `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` is set correctly
- Check network/chain ID matches (56 for mainnet, 97 for testnet)
- Ensure contract is deployed on the correct network

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure you're on the correct network (BSC Mainnet vs Testnet)
4. Check BSCScan for transaction status

