const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {

  // What this piece of code will do is that before we run deploy.js, we will run encryptKey.js just once so that
  // we can remove our private key from anywhere in our workspace so that it no longer in plain text anywhere

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY); // We create a new wallet which is different

  // This code will return an encrypted key in json format
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  console.log(encryptedJsonKey); // We would see the json object in our console
  
  // Here it would create a new file called `.encryptedKey.json` and it will paste the output we got in the command line into the new file created
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey); 

  // When the file is created we will add to our .gitignore -> .encryptedKey.json
  // After that we can delete our `PRIVATE_KEY` and `PRIVATE_KEY_PASSWORD` from the .env file bcos we dont need it again

  // Also we dont need `.encryptedKey.json` and encryptedKey.js file anymore since it just to illustrate Basic Private Key Management 
  // But i wont delete it, i will just leave it 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
