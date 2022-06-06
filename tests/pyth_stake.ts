import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { PythStake } from "../target/types/pyth_stake";
import {PublicKey} from '@solana/web3.js'
import * as spl from "@solana/spl-token";
const assert = require("assert");

describe("pyth_stake", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PythStake as Program<PythStake>;

  const assetRecord = new PublicKey("3m1y5h2uv7EQL3KaJZehvAJa4yDNvgc5yAdL9KPMKwvk");
  const assetPriceRecord = new PublicKey("HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J");
  const assetName = "BTCUSD";

  const alice = anchor.web3.Keypair.generate();

  let TSDMint: anchor.web3.PublicKey;
  let aliceTokenAccount: anchor.web3.PublicKey; 

  let initialMintAmount = 100000000;

  it("is wallet funded", async () => {

    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(alice.publicKey, 10000000),
      "confirmed"
    );

    const aliceUserBalance = await provider.connection.getBalance(
      alice.publicKey
    );

    assert.strictEqual(10000000000, aliceUserBalance);

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
    const aliceUserBalance = await provider.connection.getBalance(
      alice.publicKey
    );
    console.log(aliceUserBalance)

    const holdoutPeriod = 100;
    const bidAmount = 1000;

    const [predictionPDA, predictionBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("prediction"), Buffer.from(assetName), alice.publicKey.toBuffer()],
      program.programId
    )
    
    const tx = await program.methods.createPrediction(assetName, new anchor.BN(3238769000000), new anchor.BN(holdoutPeriod), new anchor.BN(bidAmount)).accounts({
      baseAccount: predictionPDA,
      authority: alice.publicKey,
      assetRecord: assetRecord,
      assetPriceRecord: assetPriceRecord,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers([alice]).rpc();

    const state = await program.account.predictionRecord.fetch(predictionPDA);
    console.log(state.asset)

    console.log("Your transaction signature", tx);
  });
});
