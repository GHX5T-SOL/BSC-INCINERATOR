import hre from "hardhat";

async function main() {
  const signers = await hre.ethers.getSigners();
  
  if (!signers || signers.length === 0) {
    throw new Error("No signers found. Check your PRIVATE_KEY in .env file.");
  }
  
  const deployer = signers[0];
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "BNB");

  if (balance === BigInt(0)) {
    console.warn("⚠️  Warning: Account has 0 BNB. Deployment will fail.");
    console.warn("Get testnet BNB from: https://testnet.binance.org/faucet-smart");
  }

  // Deploy NFT contract
  console.log("\n📦 Deploying BSCIncineratorNFT contract...");
  const BSCIncineratorNFT = await hre.ethers.getContractFactory("BSCIncineratorNFT");
  const nft = await BSCIncineratorNFT.deploy(
    "BSC Incinerator NFT",
    "BSCINCNFT",
    deployer.address // Initial owner
  );

  console.log("⏳ Waiting for deployment confirmation...");
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();

  console.log("\n✅ BSCIncineratorNFT deployed to:", nftAddress);
  console.log("\n📝 Next steps:");
  console.log("1. Copy the contract address above");
  console.log("2. Add it to your .env file as NEXT_PUBLIC_NFT_CONTRACT_ADDRESS");
  console.log("3. View on BSCScan Testnet: https://testnet.bscscan.com/address/" + nftAddress);
  console.log("\n⚠️  IMPORTANT: Save this address! You'll need it for the frontend.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
