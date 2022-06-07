import * as web3 from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import bs58 from "bs58";
import { SECRET_KEY_STRING } from './hot_wallet';

import { 
  program, 
  provider,   
  TSDMintAccount,
  TSDMintAddress,
  TokenProgramAccountID,
  TestAccount,
  TestAccountTokenWallet,
  BettingPool,
  BettingPoolTokenAccount,
  PrizePool,
  PrizePoolTokenAccount
} from './configurations';

const fromWallet = web3.Keypair.fromSecretKey(
  bs58.decode(SECRET_KEY_STRING)
);

function transferTSD(to_address: string, withdraw_amount: number) {

  let toWallet = new web3.PublicKey(to_address)
  // Prints the public key
  console.log(`${toWallet.toBase58()}`);
    
  // Construct my token class
  let myMint = new web3.PublicKey(TSDMintAddress);
  let TSDToken = new spl.Token(
    provider.connection,
    myMint,
    spl.TOKEN_PROGRAM_ID,
    fromWallet
  );

  let fromTokenAccount, toTokenAccount, signature

  // Create associated token accounts for my token if they don't exist yet
  return TSDToken.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey

  ).then( function(originatingAccount) {
    fromTokenAccount = originatingAccount
    console.log(`Origin Owner Wallet: ${fromTokenAccount.owner.toBase58()}`);
    console.log(`Origin Account Address: ${fromTokenAccount.address.toBase58()}`);

    return TSDToken.getOrCreateAssociatedAccountInfo(
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
          withdraw_amount
        )
      );
    // Sign transaction, broadcast, and confirm
    return web3.sendAndConfirmTransaction(
      provider.connection,
      transaction,
      [fromWallet]
    )

  })

}


// When function is called directly
if (require.main === module) {
  console.log('Transfer TSD: called directly');
  // Prints the public key
  console.log(`${fromWallet.publicKey.toBase58()}`);

  transferTSD("7fHHgY6Rpx63ancGYJKUgtQ6JdzQ3SuLj991KvqHmZu5", 88888888888).then(function(transaction_signature) {
    let signature = transaction_signature;
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
  });

}

export { transferTSD };