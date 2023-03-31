import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"


describe.only("TestERC20", () => {
	async function deployFixture() {
		const factory = await ethers.getContractFactory("ERC20FixedPrice")
		const contract = await factory.deploy("Coin", "COIN")

		const [ deployer, signer1 ] = await ethers.getSigners()

		return { contract, deployer, signer1 }
	}

	it("ok", async () => {
		const { contract, deployer, signer1 } = await loadFixture(deployFixture)

		await expect (
			await contract.transfer(contract.address, 3)
		).to.not.reverted

		await expect (
			await contract.balanceOf(contract.address)
		).to.equal(3)

		const balance1 = await deployer.getBalance()
		const balance1_2 = await contract.balanceOf(signer1.address)

		await expect (
			await contract.connect(signer1).buy(3, { value: 3 })
		).to.not.reverted

		const balance2 = await deployer.getBalance()
		const balance2_2 = await contract.balanceOf(signer1.address)

		await expect (
			balance2.sub(balance1)
		).to.equal(3)

		await expect (
			balance2_2.sub(balance1_2)
		).to.equal(3)
	})
	
	it("!ok", async () => {
		const { contract, signer1 } = await loadFixture(deployFixture)

		await expect (
			contract.connect(signer1).buy(1, { value: 1 })
		).reverted
	})
	
})