const hre = require("hardhat");
const readline = require('readline-sync')

async function main() {

    // Деплой firstContract
    const FirstContract = await hre.ethers.getContractFactory("FirstContract")
    const firstContract = await FirstContract.deploy()
    console.log(`The First contract is deployed at ${firstContract.target}`)

    // Деплой secondContract
    const SecondContract = await hre.ethers.getContractFactory("SecondContract")
    const secondContract = await SecondContract.deploy(firstContract.target)
    console.log(`The Second contract is deployed at ${secondContract.target}`)

    // Вызов функции setNumber на firstContract
    let number = readline.question("\nEnter number: ")
    let tx = await firstContract.setNumber(number)
    await tx.wait()
    let result = await firstContract.getNumber()
    // Проверка
    if (result == number){
        console.log(`The method is succesfully called. \nTransaction hash: ${tx.hash}`)
    } else {
        console.log('Something went wrong')
    }

    // Вызов функции callSetNumber на secondContract
    number = readline.question('\nEnter another number: ')
    tx = await secondContract.callSetNumber(number)
    await tx.wait()
    result = await secondContract.callGetNumber()
    if (result == number){
        console.log(`The method is succesfully called. \nTransaction hash: ${tx.hash}`)
    } else {
        console.log('Something went wrong')
    }

    // Вызов функции setStr на firstContract
    let str = readline.question('\nEnter string: ')
    tx = await firstContract.setString(str)
    await tx.wait()
    result = await firstContract.getString()
    if (result == str){
        console.log(`The method is succesfully called. \nTransaction hash: ${tx.hash}`)
    } else {
        console.log('Something went wrong')
    }

    // Вызов функции callSetStr на secondContract
    str = readline.question('\nEnter another string: ')
    tx = await secondContract.callSetString(str)
    await tx.wait()
    result = await secondContract.callGetString()
    if (result == str){
        console.log(`The method is succesfully called. \nTransaction hash: ${tx.hash}`)
    } else {
        console.log('Something went wrong')
    }

    // Вызов функции sendEther на secondContract
    let firstBalanceBefore = await hre.ethers.provider.getBalance(firstContract.target)
    console.log(`\nThe balance of the first contract before the transaction: ${firstBalanceBefore}`)
    let value = readline.question("Enter value: ")
    tx = await secondContract.sendEther(firstContract.target, value, {value: value})
    let firstBalanceAfter = await hre.ethers.provider.getBalance(firstContract.target)
    if(firstBalanceBefore + value == firstBalanceAfter){
        console.log(`The transaction is successfully. \nTransaction hash: ${tx.hash}
The balance of the first contract after the transaction: ${firstBalanceAfter}`)
    }else{
        console.log('Something went wrong')
    }

    // Вызов функции sendEther на firstContract
    let secondBalanceBefore = await hre.ethers.provider.getBalance(secondContract.target)
    console.log(`\nThe balance of the second contract before the transaction: ${secondBalanceBefore}`)
    value = readline.question("Enter value: ")
    tx = await firstContract.sendEther(secondContract.target, value, {value: value})
    let secondBalanceAfter = await hre.ethers.provider.getBalance(secondContract.target)
    if(secondBalanceBefore + value == secondBalanceAfter){
        console.log(`The transaction is successfully. \nTransaction hash: ${tx.hash}
The balance of the second contract after the transaction: ${secondBalanceAfter}`)
    }else{
        console.log('Something went wrong')
    }        

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
