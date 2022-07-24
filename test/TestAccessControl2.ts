import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TestAccessControl2", () => {

	async function deployContractFixture() {
		const contractFactory = await ethers.getContractFactory("TestAccessControl2")
		const contract = await contractFactory.deploy()

		const [ deployer, s1, s2, s3 ] = await ethers.getSigners()

		const ROLE_MANAGER = await contract.ROLE_MANAGER()
		const ROLE_DEVELOPER = await contract.ROLE_DEVELOPER()

		const A = await contract.A()
		const B = await contract.B()
		const C = await contract.C()

		return { contract, deployer, s1, s2, s3, ROLE_MANAGER, ROLE_DEVELOPER, A, B, C }
	}

	it("load fixture", async () => await loadFixture(deployContractFixture))

	it("deployer should have manager role", async () => {
		const {
			contract,
			deployer,
			ROLE_MANAGER
		} = await loadFixture(deployContractFixture)

		expect(await contract.hasRole(ROLE_MANAGER, deployer.address))
	})

	it("manager should grant developer role", async () => {
		const {
			contract,
			s1,
			ROLE_DEVELOPER
		} = await loadFixture(deployContractFixture)

		await expect(contract.grantRole(ROLE_DEVELOPER, s1.address))
			.emit(contract, "RoleGranted")
	})

	it("testing relationship 1", async () => {
		const { contract, B, C, s1, s2 } = await loadFixture(deployContractFixture)

		await contract.setRelationship1()

		await expect(contract.grantRole(B, s1.address)).emit(contract, "RoleGranted")
		await expect(contract.grantRole(C, s2.address)).emit(contract, "RoleGranted")
	})

	it("testing relationship 2 as A", async () => {
		const { contract, C, s1 } = await loadFixture(deployContractFixture)

		await contract.setRelationship2AsA()

		await expect(contract.grantRole(C, s1.address)).to.be.reverted
	})

	it("testing relationship 2 as B", async () => {
		const { contract, C, s1 } = await loadFixture(deployContractFixture)

		await contract.setRelationship2AsB()

		await expect(contract.grantRole(C, s1.address)).emit(contract, "RoleGranted")
	})

	it("testing relationship 2 as A and B", async () => {
		const { contract, C, s1 } = await loadFixture(deployContractFixture)

		await contract.setRelationship2AsAAndB()

		await expect(contract.grantRole(C, s1.address)).emit(contract, "RoleGranted")
	})

})