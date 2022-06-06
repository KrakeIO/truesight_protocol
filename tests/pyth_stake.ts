import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { PythStake } from "../target/types/pyth_stake";
import {PublicKey} from '@solana/web3.js'

describe("pyth_stake", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PythStake as Program<PythStake>;

  const assetRecord = new PublicKey("3m1y5h2uv7EQL3KaJZehvAJa4yDNvgc5yAdL9KPMKwvk");
  const assetPriceRecord = new PublicKey("HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J");

  const alice = anchor.web3.Keypair.generate();

  it("is wallet funded", async () => {

    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(alice.publicKey, 10000000),
      "confirmed"
    );
  })
  

  it("Is initialized!", async () => {
    // Add your test here.
    const aliceUserBalance = await provider.connection.getBalance(
      alice.publicKey
    );
    console.log(aliceUserBalance)
    
    const tx = await program.methods.initialize().accounts({
      baseAccount: alice.publicKey,
      authority: alice.publicKey,
      assetRecord: assetRecord,
      assetPriceRecord: assetPriceRecord,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers([alice]).rpc();

    const state = await program.account.predictionRecord.fetch(alice.publicKey);
    console.log(state.assetRecord)

    console.log("Your transaction signature", tx);
  });
});
