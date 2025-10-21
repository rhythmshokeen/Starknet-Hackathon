// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Land.sol";
import "../src/Resources.sol";
import "../src/GameLogic.sol";

contract DeployScript is Script {
    function run() external {
        address deployer = msg.sender; // or your private key address

        vm.startBroadcast();

        // Deploy contracts
        Land land = new Land(deployer);
        Resources resources = new Resources(deployer);
        GameLogic game = new GameLogic(address(land), address(resources), deployer);

        vm.stopBroadcast();
    }
}