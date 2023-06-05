const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const deployedFakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await deployedFakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", deployedFakeNftMarketplace.address);

  console.log("Sleeping.....");
  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedFakeNftMarketplace.address,
    constructorArguments: [],
  });

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const deployedCryptoDevsDAO = await CryptoDevsDAO.deploy(
    deployedFakeNftMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your metamask account has at least 1 ETH in its account
      // Change this value as you want
      value: ethers.utils.parseEther("1"),
    }
  );
  await deployedCryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to: ", deployedCryptoDevsDAO.address);

  console.log("Sleeping.....");
  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedCryptoDevsDAO.address,
    constructorArguments: [deployedFakeNftMarketplace.address, CRYPTODEVS_NFT_CONTRACT_ADDRESS],
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
