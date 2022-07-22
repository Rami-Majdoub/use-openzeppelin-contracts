// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TestAccessControl is AccessControl {
	uint internal val;
	
	bytes32 public constant ROLE_CHANGE_VAL = keccak256("CHANGE_VAL");
	
	constructor() {
		// give the role to deployer
		_grantRole(ROLE_CHANGE_VAL, _msgSender());
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
