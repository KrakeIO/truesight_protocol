import * as web3 from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import bs58 from "bs58";

import { 
  program, 
  provider,   
  TSDMintAccount,
  TokenProgramAccountID,
  TestAccount,
  TestAccountTokenWallet,
  BettingPool,
  BettingPoolTokenAccount,
  PrizePool,
  PrizePoolTokenAccount
} from './configurations';

const private_key = "32KoZKge9ADzVUGH3q779AZSfyK2gvFL3eKsUrWoHwCuVvM4QK8ge9yTJ7gWGJ1foYcEEPJMWegg7aBQ8Zji2t5z";
const fromWallet = web3.Keypair.fromSecretKey(
  bs58.decode(private_key)
);

// Prints the public key
console.log(`${fromWallet.publicKey.toBase58()}`);


let toWallet = new web3.PublicKey("7fHHgY6Rpx63ancGYJKUgtQ6JdzQ3SuLj991KvqHmZu5")
// Prints the public key
console.log(`${toWallet.toBase58()}`);
  
// Construct my token class
let myMint = new web3.PublicKey("dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia");
let myToken = new spl.Token(
  provider.connection,
  myMint,
  spl.TOKEN_PROGRAM_ID,
  fromWallet
);

let fromTokenAccount, toTokenAccount, signature

// Create associated token accounts for my token if they don't exist yet
myToken.getOrCreateAssociatedAccountInfo(
  fromWallet.publicKey

).then( function(originatingAccount) {
  fromTokenAccount = originatingAccount
  console.log(`Origin Owner Wallet: ${fromTokenAccount.owner.toBase58()}`);
  console.log(`Origin Account Address: ${fromTokenAccount.address.toBase58()}`);

  return myToken.getOrCreateAssociatedAccountInfo(
    toWallet
  );

}).then( function(destinationAccount) {
  toTokenAccount = destinationAccount;
  console.log(`Origin Owner Wallet: ${toTokenAccount.owner.toBase58()}`);
  console.log(`Origin Account Address: ${toTokenAccount.address.toBase58()}`);

  // Add token transfer instructions to transaction
  let transaction = new web3.Transaction()
    .add(
      spl.Token.createTransferInstruction(
        spl.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        0
      )
    );
  // Sign transaction, broadcast, and confirm
  return web3.sendAndConfirmTransaction(
    provider.connection,
    transaction,
    [fromWallet]
  )

}).then(function(transaction_signature) {
  signature = transaction_signature;
  console.log("SIGNATURE", signature);
  console.log("SUCCESS");


})

