//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20FixedPrice is ERC20, Ownable {
    uint256 public price = 1 wei;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        mint();
    }
	
    function mint() public onlyOwner {
        _mint(msg.sender, 10 * 10**decimals());
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }

	function setPrice(uint256 _price) public onlyOwner {
		price = _price;
	}

    function buy(uint256 amount) public payable {
        require(msg.value == amount * price, "Wrong amount");
        require(balanceOf(address(this)) >= amount, "Not enough credits on sale");

		ERC20(address(this)).transfer(msg.sender, amount);

        payable(owner()).transfer(msg.value);
    }
}
