// Here is the Typescript version of deploy.js
// We install this -> `yarn add typescript ts-node`
// ts-node is a typescript version of node 
// we added typescript version of fs-extra -> yarn add @types/fs-extra
// so instead of node deploy.ts, we do ts-node deploy.ts

import { ethers } from "ethers";
import * as fs from "fs-extra";
import "dotenv/config";

// PRIVATE_KEY=0x28d4e992352a1620c330ddac22b542b2423db8195581f17995d26a441a9b63ba
// RPC_URL=http://127.0.0.1:8545

// ! -> it means bang in typescript. it just to tell typescript that it wont be undefined

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  console.log(`Contract Address: ${contract.address}`); 

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);

  const updatedNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedNumber}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
