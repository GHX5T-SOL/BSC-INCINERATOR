// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BSCIncineratorNFT
 * @dev ERC721 NFT contract for BSC Incinerator platform
 * Users can mint NFTs after burning tokens
 */
contract BSCIncineratorNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    
    // Burn address for verification
    address public constant BURN_ADDRESS = 0x181A91f1BE23C5Ff16137F4B83fb38854F325395;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Mapping to track minted NFTs per user
    mapping(address => uint256[]) public userTokens;
    
    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    
    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC721(name, symbol) Ownable(initialOwner) {
        _baseTokenURI = "";
    }
    
    /**
     * @dev Mint a new NFT to the specified address
     * @param to Address to mint the NFT to
     * @param uri URI for the NFT metadata
     * @return tokenId The ID of the newly minted NFT
     */
    function mint(address to, string memory uri) public returns (uint256) {
        require(to != address(0), "Cannot mint to zero address");
        
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, uri);
        
        userTokens[to].push(newTokenId);
        
        emit NFTMinted(to, newTokenId, uri);
        
        return newTokenId;
    }
    
    /**
     * @dev Get the total number of tokens minted
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }
    
    /**
     * @dev Get all token IDs owned by a user
     */
    function getUserTokens(address user) public view returns (uint256[] memory) {
        return userTokens[user];
    }
    
    /**
     * @dev Set the base URI for token metadata
     */
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @dev Override tokenURI to use base URI if set
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory uri = super.tokenURI(tokenId);
        
        if (bytes(_baseTokenURI).length > 0) {
            return string(abi.encodePacked(_baseTokenURI, uri));
        }
        
        return uri;
    }
}

