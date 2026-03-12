// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ReceipilotNFT
 * @dev NFT contract for verified receipt tokens with vlayer ZK proof verification
 * @notice This contract implements freemium model with 2 free mints per week per wallet
 */
contract ReceipilotNFT is 
    ERC721, 
    ERC721URIStorage, 
    ERC721Enumerable, 
    Ownable, 
    ReentrancyGuard 
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Freemium constants
    uint256 public constant FREE_MINTS_PER_WEEK = 2;
    uint256 public constant WEEK_DURATION = 7 days;

    // Premium subscription
    mapping(address => bool) public isPremiumUser;
    mapping(address => uint256) public premiumExpiry;

    // Mint tracking for freemium
    mapping(address => mapping(uint256 => uint256)) public userWeeklyMints;

    // Proof verification
    mapping(uint256 => bytes32) public tokenProofHash;
    mapping(bytes32 => bool) public usedProofs;

    // Events
    event ReceiptMinted(
        address indexed user,
        uint256 indexed tokenId,
        bytes32 proofHash,
        string tokenURI
    );
    event PremiumSubscribed(address indexed user, uint256 expiryTime);
    event PremiumCancelled(address indexed user);

    constructor() ERC721("Receipilot Receipt", "RECEIPT") Ownable(msg.sender) {}

    /**
     * @dev Mint a new receipt NFT with proof verification
     * @param to Recipient address
     * @param tokenURI IPFS URI for NFT metadata
     * @param proofHash Cryptographic proof hash from vlayer
     */
    function mint(
        address to,
        string memory tokenURI,
        bytes32 proofHash
    ) public nonReentrant returns (uint256) {
        require(to != address(0), "Invalid recipient");
        require(bytes(tokenURI).length > 0, "Empty token URI");
        require(proofHash != bytes32(0), "Invalid proof hash");
        require(!usedProofs[proofHash], "Proof already used");

        // Check mint limits for non-premium users
        if (!_isPremiumActive(to)) {
            uint256 weekStart = _getCurrentWeekStart();
            uint256 currentMints = userWeeklyMints[to][weekStart];
            require(
                currentMints < FREE_MINTS_PER_WEEK,
                "Free mint limit reached. Upgrade to premium for unlimited mints."
            );
            userWeeklyMints[to][weekStart]++;
        }

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        tokenProofHash[tokenId] = proofHash;
        usedProofs[proofHash] = true;

        emit ReceiptMinted(to, tokenId, proofHash, tokenURI);

        return tokenId;
    }

    /**
     * @dev Subscribe to premium (called by payment processor)
     * @param user User address
     * @param duration Subscription duration in seconds
     */
    function subscribePremium(address user, uint256 duration) public onlyOwner {
        require(user != address(0), "Invalid user address");
        require(duration > 0, "Invalid duration");

        uint256 currentExpiry = premiumExpiry[user];
        uint256 newExpiry;

        if (currentExpiry > block.timestamp) {
            newExpiry = currentExpiry + duration;
        } else {
            newExpiry = block.timestamp + duration;
        }

        premiumExpiry[user] = newExpiry;
        isPremiumUser[user] = true;

        emit PremiumSubscribed(user, newExpiry);
    }

    /**
     * @dev Cancel premium subscription
     */
    function cancelPremium() public {
        require(isPremiumUser[msg.sender], "Not a premium user");
        
        isPremiumUser[msg.sender] = false;
        premiumExpiry[msg.sender] = 0;

        emit PremiumCancelled(msg.sender);
    }

    /**
     * @dev Get user's mint count for current week
     * @param user User address
     * @return Current week's mint count
     */
    function getUserMintCount(address user, uint256 weekStart) 
        public 
        view 
        returns (uint256) 
    {
        return userWeeklyMints[user][weekStart];
    }

    /**
     * @dev Get proof hash for a token
     * @param tokenId Token ID
     * @return Proof hash
     */
    function getProofHash(uint256 tokenId) public view returns (bytes32) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenProofHash[tokenId];
    }

    /**
     * @dev Check if user can mint for free
     * @param user User address
     * @return True if user can mint
     */
    function canMintFree(address user) public view returns (bool) {
        if (_isPremiumActive(user)) {
            return true;
        }

        uint256 weekStart = _getCurrentWeekStart();
        return userWeeklyMints[user][weekStart] < FREE_MINTS_PER_WEEK;
    }

    /**
     * @dev Get remaining free mints for user this week
     * @param user User address
     * @return Remaining free mints
     */
    function getRemainingFreeMints(address user) public view returns (uint256) {
        if (_isPremiumActive(user)) {
            return type(uint256).max; // Unlimited
        }

        uint256 weekStart = _getCurrentWeekStart();
        uint256 used = userWeeklyMints[user][weekStart];
        
        if (used >= FREE_MINTS_PER_WEEK) {
            return 0;
        }

        return FREE_MINTS_PER_WEEK - used;
    }

    /**
     * @dev Get current week start timestamp (Sunday 00:00 UTC)
     */
    function _getCurrentWeekStart() internal view returns (uint256) {
        uint256 timestamp = block.timestamp;
        uint256 dayOfWeek = ((timestamp / 1 days) + 4) % 7; // Thursday is 0
        return timestamp - (dayOfWeek * 1 days) - (timestamp % 1 days);
    }

    /**
     * @dev Check if user has active premium subscription
     */
    function _isPremiumActive(address user) internal view returns (bool) {
        return isPremiumUser[user] && premiumExpiry[user] > block.timestamp;
    }

    // Override required functions
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
