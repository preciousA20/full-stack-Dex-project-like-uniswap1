require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    Sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/4vS_ALCQ-uRfR8UahL3LAQI8cyA3MR_m',
      accounts: ['94013e045b6efdc081cadc51b33eab7a2fe0ae79e43a4ebd59d23155a17711f2']
    }
  }
};


//app id gv85tyc6x4s5jba2
// api_key 4vS_ALCQ-uRfR8UahL3LAQI8cyA3MR_m