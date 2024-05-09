require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/aabbe53a3a3f43a6ac13f9da29e29037`,
      accounts: {
        mnemonic:
          "soup junk ripple bacon crew sick stamp lady nothing include census pulp",
      },
    },

    local: {
      chainId: 1337,
      url:"HTTP://127.0.0.1:8545",
      accounts: ["0x9cd6c0865da5efd4007995223c6f3cf3087442d39f3f121a0be773ad12032d7d"]
    },
    kanazawa: {
      chainId: 222000222,
      url: "https://testnet-rpc.meld.com/",
      accounts: {
        mnemonic:
          "soup junk ripple bacon crew sick stamp lady nothing include census pulp",
      },
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
