import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ownable", () => {
	async function deployFixture() {
		const factory = await ethers.getContractFactory("TestOwnable")
		const contract = await factory.deploy()

		const [ _, s1 ] = await ethers.getSigners()
		return { contract, s1 }
	}

	// the time for loading the fixture will be added to the fist test that loads it (the fixture)
	// the fixture takes a long time to load
	// so i used this test to get the actual time of the test
	// to see the difference add ".skip" after it (it.skip)
	it("load fixtures",async () => {
	  await loadFixture(deployFixture)
	})

	it("anyone can increment", async () => {
		const { contract, s1 } = await loadFixture(deployFixture)
		
		await contract.connect(s1).increment()
		expect(await contract.getX()).equal(1)
	});

	it("owner can reset", async () => {
		const { contract } = await loadFixture(deployFixture)

		await contract.increment()
		await contract.reset()

		expect(await contract.getX()).equal(0)
	});
	
	it("only the owner should be able to reset", async ()=> {
		const { contract, s1 } = await loadFixture(deployFixture)

		await expect(contract.connect(s1).reset()).reverted
	});
})