// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestOwnable is Ownable {
	uint private x;

	function increment() public {
		x ++;
	}

	function reset() public onlyOwner {
		x = 0;
	}

	function getX() public view returns (uint) {
		return x;
	}
}