// const main = async()=>{
//     const TransactionFactory = await hre.ethers.getContractFactory("Transaction")

//     const transactionFactory = await TransactionFactory.deploy()

//     await transactionFactory.deploy()

//     console.log(`contract deployed at ${transactionFactory.address}`)
// }
// (async()=>{
//     try {
//         await main()
//         process.exit(0)
//     } catch (error) {
//         console.error(error)
//         process.exit(1)
//     }
// })()

const hre = require("hardhat")

async function main(){

  const Upload = await hre.ethers.getContractFactory("Transaction")

  const upload = await Upload.deploy()

  await upload.deployed()

  console.log(`Contract deployed to address: ${upload.address}`)
}

main().catch((error)=>{
  console.error(error)
  process.exitCode = 1
})