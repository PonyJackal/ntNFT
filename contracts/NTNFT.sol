// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "erc721a/contracts/ERC721A.sol";
import "hardhat/console.sol";

contract NTNFT is ERC721A, Ownable, ReentrancyGuard {
    // administrators
    mapping(address => bool) public admins;

    // -----------------------------------------
    // NTNFT Events
    // -----------------------------------------
    event TokenMinted(address indexed to, uint256 quantity);
    event AdminAdded(address indexed admin, bool isAdmin);

    constructor() ERC721A("NTNFT", "NTNFT") {}

    /**
     * @dev public mint, since I set restriction on transfer, only admins can mint
     * @param _quantity The amount of tokens to mint
     */
    function mint(uint256 _quantity) external nonReentrant {
        require(_quantity > 0, "NTNFT: quantity must be greater than 0");

        _mint(msg.sender, _quantity);

        emit TokenMinted(msg.sender, _quantity);
    }

    /**
     * note override _beforeTokenTransfers in order to set restrictions on who can transfer tokens
     * @dev Hook that is called before a set of serially-ordered token IDs
     * are about to be transferred. This includes minting.
     * And also called before burning one token.
     *
     * `startTokenId` - the first token ID to be transferred.
     * `quantity` - the amount to be transferred.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, `from`'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, `tokenId` will be burned by `from`.
     * - `from` and `to` are never both zero.
     */
    function _beforeTokenTransfers(
        address from,
        address to,
        uint256 startTokenId,
        uint256 quantity
    ) internal override {
        // check if to address is admin
        require(admins[to], "NTNFT: to address is not an admin");

        super._beforeTokenTransfers(from, to, startTokenId, quantity);
    }

    /**
     * @dev add admin, only owner can update admins
     * @param _admin   The admin address
     * @param _isAdmin The value to set
     */
    function addAdmin(address _admin, bool _isAdmin) external onlyOwner {
        admins[_admin] = _isAdmin;

        emit AdminAdded(_admin, _isAdmin);
    }
}
