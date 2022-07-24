import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("TestAccessControl", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployContractFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, singner1, singner2, singner3, ...otherAccounts] = await ethers.getSigners()

    const contractFactory = await ethers.getContractFactory("TestAccessControl")
    const contract = await contractFactory.deploy()

    const ROLE = await contract.ROLE_CHANGE_VAL()

    return { contract, deployer, singner1, singner2, singner3, otherAccounts, ROLE }
  }

  // the time for loading the fixture will be added to the fist test that loads it (the fixture)
  // the fixture takes a long time to load
  // so i used this test to get the actual time of the test
  // to see the difference add ".skip" after it (it.skip)
  it("load fixtures",async () => {
    await loadFixture(deployContractFixture)
  })

  it("should give deployer the role", async () => {
    const { contract, deployer, ROLE } = await loadFixture(deployContractFixture)
      
    expect(await contract.hasRole(ROLE, deployer.address)).to.equal(true)
  })

  it("other signers should not have the role",async () => {
    const { contract, singner1: s1, ROLE } = await loadFixture(deployContractFixture)

    expect(await contract.hasRole(ROLE, s1.address)).equal(false)
  })

  it("should allow signer with the role to change value", async () => {
    const { contract } = await loadFixture(deployContractFixture)
    
    await contract.setVal(2)
    expect(await contract.getVal()).equal(2)
  })

  it("should not allow signer without the role to change value",async () => {
    const { contract, singner1: s1 } = await loadFixture(deployContractFixture)

    await expect(contract.connect(s1).setVal(3)).reverted
  })
  
  it("deployer can give the role", async () => {
    const { contract, ROLE, singner1: s1 } = await loadFixture(deployContractFixture)

    await expect(contract.grantRole(ROLE, s1.address))
      .emit(contract, "RoleGranted") // method 1: event is emitted when role granted
    
    // method 2: signer has role
    // expect(await contract.hasRole(ROLE, s1.address)).equal(true)

    // method 3: can change value
    // await contract.connect(s1).setVal(6)
    // expect(await contract.getVal()).equal(6)
  })
})
