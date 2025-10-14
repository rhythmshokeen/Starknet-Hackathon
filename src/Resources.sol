// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Resources is Ownable {
    mapping(address => uint256) public gold;
    mapping(address => uint256) public troops;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function generateGold(address player, uint256 amount) external onlyOwner {
        gold[player] += amount;
    }

    function trainTroops(address player, uint256 number) external onlyOwner {
        troops[player] += number;
    }

    function spendGold(address player, uint256 amount) external onlyOwner {
        require(gold[player] >= amount, "Not enough gold");
        gold[player] -= amount;
    }
}
