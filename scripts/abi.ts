import { ethers } from "hardhat";

async function main() {  
  const contractName = "TestAccessControl";

  const contractFactory = await ethers.getContractFactory(contractName);
  const abi = contractFactory.interface.format(ethers.utils.FormatTypes.full) // full minimal json
  
  console.log(abi);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
