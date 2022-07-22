// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TestAccessControl is AccessControl {
	uint internal val;
	
	bytes32 public constant ROLE_CHANGE_VAL = keccak256("CHANGE_VAL");
	
	constructor() {
		// give the role to deployer
		// so that he can change the value of val
		_grantRole(ROLE_CHANGE_VAL, _msgSender());

		// give the "admin role" of the role to the deployer
		// so that the deployer can give the role to other address
		_grantRole(getRoleAdmin(ROLE_CHANGE_VAL), _msgSender());
	}
	
	// only signers with ROLE_CHANGE_VAL can change the value of val
	function setVal(uint val_) public onlyRole(ROLE_CHANGE_VAL) {
		val = val_;
	}
	
	// anyone can check the value of val
	function getVal() public view returns (uint) {
		return val;
	}

}
