// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IVictimContract {
  function deposit() external payable;
  function withdraw() external;
}