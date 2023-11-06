// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.1;

interface IFace{
    function setNumber(uint256) external;
    function setString(string calldata) external;
    function getNumber() external view returns (uint256);
    function getString() external view returns (string memory);
}

contract SecondContract {
    IFace iFace;

    constructor(address _contractAddress){
        iFace = IFace(_contractAddress);
    }

    receive() external payable{}

    function sendEther(address recepient, uint256 value) public payable returns (bool) {
        return payable(recepient).send(value);
    }

    function callSetNumber(uint256 _number) public {
        iFace.setNumber(_number);
    }

    function callSetString(string calldata _str) public {
        iFace.setString(_str);
    }

    function callGetNumber() public view returns (uint256) {
        return iFace.getNumber();
    }

    function callGetString() public view returns (string memory) {
        return iFace.getString();
    }


}