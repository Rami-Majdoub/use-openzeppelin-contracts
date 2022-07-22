import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMYAPI_RINKEBY,
      accounts: [process.env.ACCOUNT_PRIVATEKEY || ""],
    },
    // for ganache run: ganache -m "test test test test test test test test test test test fake"
    local: {
      url: "http://127.0.0.1:8545/",
    },
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: "test test test test test test test test test test test fake",
        count: 10,
       },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_APIKEY,
  }
};

export default config;
