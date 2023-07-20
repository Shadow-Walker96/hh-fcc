/*
LESSION 5: Ether.js Simple Storage

RPC listeing on port on ganache -> http://127.0.0.1:8545

const ethers = require("ethers");
const fs = require("fs-extra");

// 0x98c99ac5a4978111e6576bcdcbcf67057ce1156991b821e322f0cfb2a1282b53 -> Private Key from ganache network

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  const wallet = new ethers.Wallet(
    "0x98c99ac5a4978111e6576bcdcbcf67057ce1156991b821e322f0cfb2a1282b53",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); //A contractFactory is an object we can use to deploy contract
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

*/

/*

// Adding Transaction Overrides
// Rememeber on Remix when we want to deploy our contact we have options like input value of Ethereum, gas price, gas limit and e.t.c we can do it on ether.js by
// override `{}` so in our deploy() we can do like this deploy({})

const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0x8c3df02dbaf50bac7478ed57bc37e08334a5aba5f3fe6f8d3537473c9d6452be",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  // Here we want to add override in deploy() by using `{}`
  const contract = await contractFactory.deploy({ gasPrice: 1000000000 });
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*


/*

// Transaction Receipt -> When we want to wait for specified block confirmation

const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0x8c3df02dbaf50bac7478ed57bc37e08334a5aba5f3fe6f8d3537473c9d6452be",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  const contract = await contractFactory.deploy();

  //Here we can say that we want wait for one blocks b4 it get added to the chain for comfirmation
  const transactionReceipt = await contract.deployTransaction.wait(1); // The `1` here means that we want to wait for one block confirmation

  console.log("Here is the deployment transaction (transaction response): ");
  console.log(contract.deployTransaction);

  console.log("Here is the transaction receipt: ");
  console.log(transactionReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*



/*

// Sending a "raw" transaction in ethersjs 
// I purposely split it to part 1
// Here we want to send a raw transaction by signing it 

const ethers = require("ethers");
const fs = require("fs-extra");

// 0x1E53772cfd7f0b5A34692d72De9a0b2113e7ffBA
// 0xb5275fc73f64a42ef1a13c31ac264a946a8368dc75d954ee03cb94b3495ceb41

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0xb5275fc73f64a42ef1a13c31ac264a946a8368dc75d954ee03cb94b3495ceb41",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // Here we purposely comment out this part bcos we want to run a raw transaction
  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log("Deploying, please wait...");
  // const contract = await contractFactory.deploy();
  // const transactionReceipt = await contract.deployTransaction.wait(1); 
  // console.log(transactionReceipt);

  
  // tx -> This is the transaction details which hold objects of stuff we put in like nonce, gasPrice etc
  console.log("Let's deploy with only transation data!");
  const tx = {
    nonce: 5,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    // Here the data is the compiled contract which is `SimpleStorage_sol_SimpleStorage.bin` and we add 0x
    data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061052a565b60405180910390f35b610094600480360381019061008f919061046d565b61011c565b005b6100b060048036038101906100ab9190610411565b610126565b005b6100cc60048036038101906100c791906103c8565b6101b6565b6040516100d9919061052a565b60405180910390f35b6100fc60048036038101906100f7919061046d565b6101e4565b60405161010a929190610545565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806002836040516101a09190610513565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d9061063e565b80601f01602080910402602001604051908101604052809291908181526020018280546102499061063e565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea264697066735822122005f4761e428b272cff3be71d18d77c255fd57b725a8cec4f019c4e1beb4ada8164736f6c63430008070033",
    chainId: 1337,
  };
  const signedTxResponse = await wallet.signTransaction(tx); // Here we signed our transaction

  console.log(signedTxResponse);
// When we run node deploy.js we would see a bunch of numbers and letters which is our signed transaction
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


*/

/*

// Sending a "raw" transaction in ethersjs
// I purposely split it to Part 2
// Here we want to send our signed transaction to the ganache blockchain network

const ethers = require("ethers");
const fs = require("fs-extra");

// 0x1E53772cfd7f0b5A34692d72De9a0b2113e7ffBA
// 0xb5275fc73f64a42ef1a13c31ac264a946a8368dc75d954ee03cb94b3495ceb41

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0xb5275fc73f64a42ef1a13c31ac264a946a8368dc75d954ee03cb94b3495ceb41",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // Here we purposely comment out this part bcos we want to run a raw transaction
  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log("Deploying, please wait...");
  // const contract = await contractFactory.deploy();
  // const transactionReceipt = await contract.deployTransaction.wait(1);
  // console.log(transactionReceipt);

  console.log("Let's deploy with only transation data!");
  const tx = {
    nonce: 0, // Here we put zero because we have not deployed any transaction to Ganache 
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061052a565b60405180910390f35b610094600480360381019061008f919061046d565b61011c565b005b6100b060048036038101906100ab9190610411565b610126565b005b6100cc60048036038101906100c791906103c8565b6101b6565b6040516100d9919061052a565b60405180910390f35b6100fc60048036038101906100f7919061046d565b6101e4565b60405161010a929190610545565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806002836040516101a09190610513565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d9061063e565b80601f01602080910402602001604051908101604052809291908181526020018280546102499061063e565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea264697066735822122005f4761e428b272cff3be71d18d77c255fd57b725a8cec4f019c4e1beb4ada8164736f6c63430008070033",
    chainId: 1337,
  };
  const sendTxResponse = await wallet.sendTransaction(tx); // Here we sent our transaction to the ganache blockchain network
  await sendTxResponse.wait(1); // Here we want to wait for one block comfirmation to make sure that the transaction actually goes through
  console.log(sendTxResponse);

  // When we run node deploy.js we noticed that the block was created and we see the transaction hash and contract created
  // but in the deploy console we see that everything is fine but when we stroll up we would notice that we have an error which says transaction failed
  // which is from the nonce, and the nonce we put it in there our self since we are following how many transaction we have
  // done on Ganache Blockchain network
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


*/

/*


// Sending a "raw" transaction in ethersjs
// I purposely split it to Part 3
// Here we want to use a method from Ethersjs library to fix that error about the nonce

const ethers = require("ethers");
const fs = require("fs-extra");

// 0xbA2a424663bc57aae5059D14ec6EC7F16a81e9Be
// 0x8c3df02dbaf50bac7478ed57bc37e08334a5aba5f3fe6f8d3537473c9d6452be

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0x8c3df02dbaf50bac7478ed57bc37e08334a5aba5f3fe6f8d3537473c9d6452be",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // Here we purposely comment out this part bcos we want to run a raw transaction
  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log("Deploying, please wait...");
  // const contract = await contractFactory.deploy();
  // const transactionReceipt = await contract.deployTransaction.wait(1);
  // console.log(transactionReceipt);

  console.log("Let's deploy with only transation data!");

  // Here we fix the error of the nonce by using this code from ethersjs library ` wallet.getTransactionCount()`
  const nonce = await wallet.getTransactionCount(); // It get the transaction count from the wallet
  const tx = {
    nonce: nonce,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061052a565b60405180910390f35b610094600480360381019061008f919061046d565b61011c565b005b6100b060048036038101906100ab9190610411565b610126565b005b6100cc60048036038101906100c791906103c8565b6101b6565b6040516100d9919061052a565b60405180910390f35b6100fc60048036038101906100f7919061046d565b6101e4565b60405161010a929190610545565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806002836040516101a09190610513565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d9061063e565b80601f01602080910402602001604051908101604052809291908181526020018280546102499061063e565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea264697066735822122005f4761e428b272cff3be71d18d77c255fd57b725a8cec4f019c4e1beb4ada8164736f6c63430008070033",
    chainId: 1337,
  };
  const sendTxResponse = await wallet.sendTransaction(tx);
  await sendTxResponse.wait(1);
  console.log(sendTxResponse);

  // When we run node deploy.js, we see everything works fine.
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


*/

/*

// Interacting with Contracts in Ethersjs
// We want to access our retrive() from the abi 

const ethers = require("ethers");
const fs = require("fs-extra");

// 0x63D1e29004136ab04A1d00d554b2946bbe3ad629
// 0x153bd0fad0b748f9619df965ce1570a4749f17bb4ce0aa057f1043baeb94225b

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0x153bd0fad0b748f9619df965ce1570a4749f17bb4ce0aa057f1043baeb94225b",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve(); // Here we want to call our `retrieve()` from our abi which returns favoriteNumber
  console.log(currentFavoriteNumber);

  // WHen we deploy our code we see that it works and it showed this `BigNumber { _hex: '0x00', _isBigNumber: true }`
  // The reason for the BigNumber is bcos remember that solidity dosent do well with numbers that is large i.e BigNumber
  // Also javascript dosent do well with large numbers too i.e BigNumbers
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


*/

/*

// Still the same interacting with Contracts in Ethersjs
// Here we want to use a function from ethersjs library to deal with BigNumbers

const ethers = require("ethers");
const fs = require("fs-extra");

// 0x63D1e29004136ab04A1d00d554b2946bbe3ad629
// 0x153bd0fad0b748f9619df965ce1570a4749f17bb4ce0aa057f1043baeb94225b

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0x153bd0fad0b748f9619df965ce1570a4749f17bb4ce0aa057f1043baeb94225b",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`); // Here we use toString() bcos javascript returns BigNUmber format like this for example "10000000000000000"

  // When we deploy we would see 0 which is correct
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



*/

/*
// Still the same interacting with Contracts in Ethersjs
// Here we want to access our store() and we add 7 as parameter

const ethers = require("ethers");
const fs = require("fs-extra");

// 0x63D1e29004136ab04A1d00d554b2946bbe3ad629
// 0x153bd0fad0b748f9619df965ce1570a4749f17bb4ce0aa057f1043baeb94225b

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0x153bd0fad0b748f9619df965ce1570a4749f17bb4ce0aa057f1043baeb94225b",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7"); // It advisable to use number as string i.e "7", bcos javascript will confuse when the number is large i.e "74774747496373933". also ether is smart enough to know that its a number
  const transactionReceipt = await transactionResponse.wait(1);

  // after we have put 7 as params in store(), we have to call our view function with is retrieve()
  const updatedNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedNumber}`);

  // When we deploy we would see that our Updated favorite number is 7 which is correct
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


*/

/*

// Environment variables
// We created a .env file and we install a dotenv package, also we created a .gitignore file

const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);

  // after we have put 7 as params in store(), we have to call our view function with is retrieve()
  const updatedNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedNumber}`);

  // When we deploy we would see that our Updated favorite number is 7 which is correct
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


*/

/*

// Better Private Key Management
// We can encrypt our private key and store it locally but before we do that we have to create a
// file encryptKey.js

const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); we comment this line of code out bcos we want to change the way we get a wallet

  // We want to use our encrypted key i.e the file `.encryptedKey.json` is our encrypted private key
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");

  // Now we want to create a wallet from our encrypted key
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );

  // Now we want to connect our wallet to our provider
  wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);

  const updatedNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedNumber}`);

  // Now in the command line all we need to do is this -> PRIVATE_KEY_PASSWORD=password node deploy.js and press enter. All works well!
  // We should see the same output which is `Current Favorite Number: 0 , Updated Favorite Number : 7`

  // Important note is that on the command line when we press -> history and press enter 
  // we see infos and part of it is our private key

  // so to clear this, on the command line -> history -c and press enter 

  // Now since we have illustrated Basic Private Key Management, we can now add our private key back to .env file
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

*/

/*

// Optional Prettier Formatting
// Here we didnt add anything to our code
// We just want to install this -> yarn add prettier prettier-plugin-solidity
// We created a new file called `.prettierrc` which will contain how we want the people who view our code
// to know how it was formatted with prettier
// We create a README.md, which gives information about our project

const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8",
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)

    const currentFavoriteNumber = await contract.retrieve()
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`)

    const transactionResponse = await contract.store("7")
    const transactionReceipt = await transactionResponse.wait(1)

    const updatedNumber = await contract.retrieve()
    console.log(`Updated Favorite Number : ${updatedNumber}`)

    // We did not deploy our code i.e node deploy.js bcos we just want to illustrate the prettier functionality
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

*/

/*


// Deploying to a Testnet or a Mainnet
// We want to use Alchemy network
// We replace our RPC_URL in .env from `RPC_URL=http://127.0.0.1:8545` to `RPC_URL=https://eth-sepolia.g.alchemy.com/v2/0LbxEqeygolntidHOcpI9VbfC7BsDLL2`
// We also replace our PRIVATE_KEY in .env which we got the private key from our MetaMask account
// from `PRIVATE_KEY=0x28d4e992352a1620c330ddac22b542b2423db8195581f17995d26a441a9b63ba` to `PRIVATE_KEY=4bdb35f6b9c5a50db14ff00d395aeff95e97e2308e2fc2600cda1f3a6855d8af`


const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  console.log(`Contract Address: ${contract.address}`); // We added this line of code so that we can see the address 

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);

  const updatedNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedNumber}`);

// When we run node deploy.js, we notice that it took longer this is bcos we are using a real test blockchain network

// Now when we copy the address from the command line and paste it on sepolia etherscan it would show us info about the contract address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

*/

// Here we have finished with LESSON 5

const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8",
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)

    console.log(`Contract Address: ${contract.address}`)

    const currentFavoriteNumber = await contract.retrieve()
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`)

    const transactionResponse = await contract.store("7")
    const transactionReceipt = await transactionResponse.wait(1)

    const updatedNumber = await contract.retrieve()
    console.log(`Updated Favorite Number : ${updatedNumber}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
