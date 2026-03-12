// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Test.sol";
import "../src/ReceipilotNFT.sol";

contract ReceipilotNFTTest is Test {
    ReceipilotNFT public receipilot;
    address public owner;
    address public user1;
    address public user2;

    bytes32 public proofHash1 = keccak256("proof1");
    bytes32 public proofHash2 = keccak256("proof2");
    bytes32 public proofHash3 = keccak256("proof3");

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        receipilot = new ReceipilotNFT();
    }

    function testMintSuccess() public {
        string memory tokenURI = "ipfs://test";
        
        uint256 tokenId = receipilot.mint(user1, tokenURI, proofHash1);
        
        assertEq(receipilot.ownerOf(tokenId), user1);
        assertEq(receipilot.tokenURI(tokenId), tokenURI);
        assertEq(receipilot.getProofHash(tokenId), proofHash1);
    }

    function testFreeMintLimit() public {
        receipilot.mint(user1, "ipfs://1", proofHash1);
        receipilot.mint(user1, "ipfs://2", proofHash2);
        
        // Third mint should fail
        vm.expectRevert("Free mint limit reached. Upgrade to premium for unlimited mints.");
        receipilot.mint(user1, "ipfs://3", proofHash3);
    }

    function testPremiumUnlimited() public {
        // Subscribe user1 to premium
        receipilot.subscribePremium(user1, 30 days);
        
        // Should be able to mint more than 2
        receipilot.mint(user1, "ipfs://1", proofHash1);
        receipilot.mint(user1, "ipfs://2", proofHash2);
        receipilot.mint(user1, "ipfs://3", proofHash3);
        
        assertEq(receipilot.balanceOf(user1), 3);
    }

    function testProofReuse() public {
        receipilot.mint(user1, "ipfs://1", proofHash1);
        
        // Try to reuse same proof
        vm.expectRevert("Proof already used");
        receipilot.mint(user2, "ipfs://2", proofHash1);
    }

    function testGetRemainingFreeMints() public {
        assertEq(receipilot.getRemainingFreeMints(user1), 2);
        
        receipilot.mint(user1, "ipfs://1", proofHash1);
        assertEq(receipilot.getRemainingFreeMints(user1), 1);
        
        receipilot.mint(user1, "ipfs://2", proofHash2);
        assertEq(receipilot.getRemainingFreeMints(user1), 0);
    }

    function testPremiumSubscription() public {
        receipilot.subscribePremium(user1, 30 days);
        
        assertTrue(receipilot.isPremiumUser(user1));
        assertGt(receipilot.premiumExpiry(user1), block.timestamp);
    }

    function testCancelPremium() public {
        receipilot.subscribePremium(user1, 30 days);
        
        vm.prank(user1);
        receipilot.cancelPremium();
        
        assertFalse(receipilot.isPremiumUser(user1));
        assertEq(receipilot.premiumExpiry(user1), 0);
    }
}
