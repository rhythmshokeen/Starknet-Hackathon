// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Land.sol";
import "./Resources.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameLogic is Ownable {
    Land public landContract;
    Resources public resourcesContract;

    struct Territory {
        uint256 x;
        uint256 y;
        address owner;
    }

    mapping(uint256 => Territory) public territories;
    uint256 public territoryCount;

   constructor(address _land, address _resources, address initialOwner) Ownable(initialOwner) {
        landContract = Land(_land);
        resourcesContract = Resources(_resources);
    }

    function setTerritory(uint256 tokenId, uint256 x, uint256 y) external onlyOwner {
        require(landContract.ownerOf(tokenId) != address(0), "Land does not exist");
        territories[tokenId] = Territory(x, y, landContract.ownerOf(tokenId));
        territoryCount++;
    }

    function attack(uint256 attackerTokenId, uint256 defenderTokenId, uint256 attackingTroops) external {
        Territory storage attacker = territories[attackerTokenId];
        Territory storage defender = territories[defenderTokenId];

        require(attacker.owner == msg.sender, "Not your territory");
        require(resourcesContract.troops(msg.sender) >= attackingTroops, "Not enough troops");

        resourcesContract.troops(msg.sender) - attackingTroops;

        uint256 defenderTroops = resourcesContract.troops(defender.owner);

        if (attackingTroops > defenderTroops) {
            territories[defenderTokenId].owner = msg.sender;
        }
    }
}
