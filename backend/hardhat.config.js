require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const INFURA_API_KEY = "9bc99d01bced4a97affbdf63dbf7203a";

const SEPOLIA_PRIVATE_KEY =
  "9778eb7f00480aa3160938d40479ce8cfe35132a06daeff5e70ceb7c03e152cd";

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: "9XF9RS93484NXXKMPQZMIFTATYHGHW5K6N",
  },
};
