// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
	constructor() ERC20("Rami Coin", "RC"){
		_mint(_msgSender(), 10_000);
	}

	function decimals() public pure override returns(uint8) {
		return 3;
	}

	function printCoins(uint amount) public returns (bool) {
		_mint(_msgSender(), amount);
		return true;
	}
}