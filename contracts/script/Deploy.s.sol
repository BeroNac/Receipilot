// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Script.sol";
import "../src/ReceipilotNFT.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_DEPLOYER");
        
        vm.startBroadcast(deployerPrivateKey);

        ReceipilotNFT receipilotNFT = new ReceipilotNFT();

        console.log("ReceipilotNFT deployed to:", address(receipilotNFT));

        vm.stopBroadcast();
    }
}
