// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.1;

contract FirstContract{
    uint256 number;
    string str;

    receive() external payable{}

    function sendEther(address recepient, uint256 value) public payable returns (bool) {
        return payable(recepient).send(value);
    }

    function setNumber(uint256 _number) public {
        number = _number;
    }

    function setString(string calldata _str) public {
        str = _str;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    function getString() public view returns (string memory) {
        return str;
    }


}