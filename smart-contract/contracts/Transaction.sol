// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Transaction {
    //contract address   0xa4240D2792aD7b8D9D649aFc7d421A06e7c82317
    event Transfer(address sender, address receiver, uint256 amount, string message, uint256 timestamp, string keyword);

    function PublishTransaction(
        address payable _receiver,
        uint256 _amount,
        string memory _message,
        string memory _keyword
    ) public {
        emit Transfer(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword);
    }
}
