import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

/*
view functions
'function name() view returns (string) @29000000',
'function symbol() view returns (string) @29000000',
'function decimals() view returns (uint8) @29000000',
'function totalSupply() view returns (uint256) @29000000',
'function balanceOf(address account) view returns (uint256) @29000000',
'function allowance(address owner, address spender) view returns (uint256) @29000000',

'function transfer(address to, uint256 amount) returns (bool) @29000000',
'function approve(address spender, uint256 amount) returns (bool) @29000000',
'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool) @29000000',
'function increaseAllowance(address spender, uint256 addedValue) returns (bool) @29000000',
'function transferFrom(address from, address to, uint256 amount) returns (bool) @29000000'
*/
describe("TestERC20", () => {
	async function deployFixture() {
		const factory = await ethers.getContractFactory("TestERC20")
		const contract = await factory.deploy()

		const [ deployer, signer1 ] = await ethers.getSigners()

		return { contract, deployer, signer1 }
	}

	it("should be able to print", async () => {
		const { contract } = await loadFixture(deployFixture)

		const supply1 = await contract.totalSupply()
		await contract.printCoins(1000)
		const supply2 = await contract.totalSupply()
		
		expect(supply2.sub(supply1)).equal(1000)
	})
	
	it("should be able to transfer",async () => {
		const { contract, signer1 } = await loadFixture(deployFixture)

		await contract.printCoins(1000)
		await expect(
			contract.transfer(signer1.address, 1000)
		).emit(contract, "Transfer")
	})

	it("should be able, if allowed, to transfer on behalf of someone else", async () => {
		const { contract, deployer, signer1 } = await loadFixture(deployFixture)

		await contract.connect(signer1).printCoins(1000)
		await contract.connect(signer1).approve(deployer.address, 1000)
		// or
		// await contract.connect(signer1).increaseAllowance(deployer.address, 1000)
		await expect (
			contract.connect(deployer).transferFrom(signer1.address, deployer.address, 1000)
		).emit(contract, "Transfer")
	})
	
	it("should not be able to transfer on behalf of someone else if not allowed to", async () => {
		const { contract, deployer, signer1 } = await loadFixture(deployFixture)

		await contract.connect(signer1).printCoins(1000)
		// await contract.connect(signer1).approve(deployer.address, 1000)
		await expect (
			contract.connect(deployer).transferFrom(signer1.address, deployer.address, 1000)
		).reverted
	})
})