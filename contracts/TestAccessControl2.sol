// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TestAccessControl2 is AccessControl {

	bytes32 public constant ROLE_MANAGER = keccak256("ROLE_MANAGER");
	bytes32 public constant ROLE_DEVELOPER = keccak256("ROLE_DEVELOPER");

	bytes32 public constant A = keccak256("A");
	bytes32 public constant B = keccak256("B");
	bytes32 public constant C = keccak256("C");

	constructor() {
		_grantRole(ROLE_MANAGER, _msgSender());
		// manager can grant "developer role"
		_setRoleAdmin(ROLE_DEVELOPER, ROLE_MANAGER);
	}

	// A, B & C are roles
	// 
	// 1) OK   2) !OK  3)!OK
	// A        A B    A B C D   MANAGER
	// |\       |/     \ \ / /     |
	// B C      C         E     DEVELOPER
	//
	// how to read: 
	// example 1: (A can grant role B) (A can grant role C)
	// example 2: (A can grant role C) (B can grant role C)
	//
	// for example 2 and 3 only the last role can grant the role
	// in example 2 only B can grant role C
	// in example 3 only D can grant role E

	function setRelationship1() public {
		_grantRole(A, _msgSender());
		_setRoleAdmin(B, A);
		_setRoleAdmin(C, A);
	}

	function setRelationship2AsA() public {
		_grantRole(A, _msgSender());

		_setRoleAdmin(C, A);
		_setRoleAdmin(C, B);
	}

	function setRelationship2AsB() public {
		_grantRole(B, _msgSender());

		_setRoleAdmin(C, A);
		_setRoleAdmin(C, B);
	}

	function setRelationship2AsAAndB() public {
		_grantRole(A, _msgSender());
		_grantRole(B, _msgSender());

		_setRoleAdmin(C, A);
		_setRoleAdmin(C, B);
	}
}