import { ethers } from "hardhat";

async function main() {
  const contractName = "ERC20FixedPrice";

  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy("Coin", "COIN");
  
  console.log(`Contract ${contractName} deployed at address: `, contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
