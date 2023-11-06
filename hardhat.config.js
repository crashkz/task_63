require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [],
    overrides: {
      "contracts/FirstContract.sol": {
        version: "0.8.1"
      },
      "contracts/SecondContract.sol": {
        version: "0.7.1"
      }
    }
  },
  networks: {
    hardhat: {
      loggingEnabled: true
    }
  }
};
