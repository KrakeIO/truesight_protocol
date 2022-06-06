import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { PythStake } from "../target/types/pyth_stake";
import {PublicKey, Keypair} from '@solana/web3.js'
import * as spl from "@solana/spl-token";
const assert = require("assert");
import bs58 from 'bs58';

describe("pyth_stake", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PythStake as Program<PythStake>;

  const assetRecord = new PublicKey("3m1y5h2uv7EQL3KaJZehvAJa4yDNvgc5yAdL9KPMKwvk");
  const assetPriceRecord = new PublicKey("HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J");
  const assetName = "BTCUSD";

  const alice = anchor.web3.Keypair.generate();

  // const realmAuthority = "XkDizufzXzMMjFmKER8hy9vtr3S7wBy7ZiBsneTSqt7mEKbWf7Qk5pCyVByqj3zA2aZEqqmCmm9iqSQjdWn7jDY";

  // const alice = Keypair.fromSecretKey(new Uint8Array(bs58.decode(realmAuthority)));

  let TSDMint: anchor.web3.PublicKey;
  let aliceTokenAccount: anchor.web3.PublicKey; 

  let initialMintAmount = 10000;

  it("is wallet funded", async () => {

    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(alice.publicKey, 2000000000),
      "confirmed"
    );

    const aliceUserBalance = await provider.connection.getBalance(
      alice.publicKey
    );

    assert.strictEqual(2000000000, aliceUserBalance);

  })

  it("creates TSD token and token account", async() => {

    TSDMint = await spl.createMint(
      provider.connection,
      alice,
      alice.publicKey,
      null,
      6
    );

    aliceTokenAccount = await spl.createAccount(
      provider.connection,
      alice,
      TSDMint,
      alice.publicKey
    );

    await spl.mintTo(
      provider.connection,
      alice,
      TSDMint,
      aliceTokenAccount,
      alice.publicKey,
      initialMintAmount,
      [alice]
    );
    let _aliceTokenAccount = await spl.getAccount(
      provider.connection,
      aliceTokenAccount
    );

    assert.equal(initialMintAmount, _aliceTokenAccount.amount);

  })
  

  it("creates prediction!", async () => {
    // Add your test here.

    

    const holdoutPeriod = 100;
    const bidAmount = 1000;

    const [predictionPDA, predictionBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("prediction"), Buffer.from(assetName), alice.publicKey.toBuffer()],
      program.programId
    )

    const [bettingPoolPDA, bettingPoolBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("betting_pool"), alice.publicKey.toBuffer()],
      program.programId
    )

    let _aliceTokenWallet = await spl.getAccount(
      provider.connection,
      aliceTokenAccount
    );

    console.log("Amount before staking: ", _aliceTokenWallet.amount.toString());
    
    const tx = await program.methods.createPrediction(assetName,predictionBump, bettingPoolBump,  new anchor.BN(3238769000000), new anchor.BN(holdoutPeriod), new anchor.BN(bidAmount), ).accounts({
      baseAccount: predictionPDA,
      authority: alice.publicKey,
      assetRecord: assetRecord,
      assetPriceRecord: assetPriceRecord,
      tokenMint: TSDMint,
      bettingPoolWallet: bettingPoolPDA,
      walletToWithdrawFrom: aliceTokenAccount,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    }).signers([alice]).rpc();

    const state = await program.account.predictionRecord.fetch(predictionPDA);
    console.log(state.direction) 

    _aliceTokenWallet = await spl.getAccount(
      provider.connection,
      aliceTokenAccount
    );

    console.log("Amount after staking : ", _aliceTokenWallet.amount.toString());


    assert.equal(_aliceTokenWallet.amount, initialMintAmount - bidAmount);


    console.log("Your transaction signature", tx);
  });

  it("Fund the betting pool wallet with some tokens for rewards", async() => {

    const [bettingPoolPDA, bettingPoolBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("betting_pool"), alice.publicKey.toBuffer()],
      program.programId
    )

    await spl.mintTo(
      provider.connection,
      alice,
      TSDMint,
      bettingPoolPDA,
      alice.publicKey,
      initialMintAmount,
      [alice]
    );
  })

  it("validates prediction", async() => {

    const [predictionPDA, predictionBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("prediction"), Buffer.from(assetName), alice.publicKey.toBuffer()],
      program.programId
    )

    const [bettingPoolPDA, bettingPoolBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("betting_pool"), alice.publicKey.toBuffer()],
      program.programId
    )

    let _aliceTokenWallet = await spl.getAccount(
      provider.connection,
      aliceTokenAccount
    );

    console.log("Amount before staking: ", _aliceTokenWallet.amount.toString());
    
    const tx = await program.methods.validatePrediction(assetName, predictionBump, bettingPoolBump, new anchor.BN(5000)).accounts({
      baseAccount: predictionPDA,
      authority: alice.publicKey,
      assetRecord: assetRecord,
      assetPriceRecord: assetPriceRecord,
      tokenMint: TSDMint,
      bettingPoolWallet: bettingPoolPDA,
      walletToDepositTo: aliceTokenAccount,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    }).signers([alice]).rpc();

    const state = await program.account.predictionRecord.fetch(predictionPDA);
    console.log(state.direction) 

    _aliceTokenWallet = await spl.getAccount(
      provider.connection,
      aliceTokenAccount
    );

    console.log("Amount after staking : ", _aliceTokenWallet.amount.toString());


  })
  
});
