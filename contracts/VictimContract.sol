// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Address.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; <== One of solution

contract VictimContract {
    using Address for address payable;

    mapping(address => uint256) public usersBalanceOf;

    function getUserBalance(address _userAddress) internal view returns(uint256){
        return usersBalanceOf[_userAddress];
    }

    function setUserBalance(address _userAddress, uint256 _balance) internal {
        usersBalanceOf[_userAddress] = _balance;
    }

    function deposit() external payable {
        uint256 currentBalance = getUserBalance(msg.sender);
        setUserBalance(msg.sender, currentBalance + msg.value);
    }

    function withdraw() external {
        uint256 depositedAmount = getUserBalance(msg.sender);
        payable(msg.sender).sendValue(depositedAmount);
        setUserBalance(msg.sender, 0);
    }
}