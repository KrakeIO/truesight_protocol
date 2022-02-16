import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TruesightProtocol } from '../target/types/truesight_protocol';
import assert from 'assert';

describe('truesight_protocol', () => {

  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.TruesightProtocol as Program<TruesightProtocol>;



  describe('initialize', () => {

    it('Is initialized!', async () => {
      // Add your test here.
      const predictionAccount = anchor.web3.Keypair.generate();
      
      await program.rpc.initialize("truesight_protocol", {
        accounts: {
          predictionAccount: predictionAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [predictionAccount]
      });

      const predictionAccountData = await program.account.predictionAccount.fetch(predictionAccount.publicKey);

      assert(predictionAccountData.direction.eq(new anchor.BN(1)))
      assert(predictionAccountData.asset == "truesight_protocol")
    });

  });

  describe('CreatePrediction', () => {

    it('prediction was created', async () => {
      // Add your test here.
      const predictionAccount = anchor.web3.Keypair.generate();
      
      await program.rpc.createPrediction("truesight_protocol", new anchor.BN(11), {
        accounts: {
          predictionAccount: predictionAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [predictionAccount]
      });

      const predictionAccountData = await program.account.predictionAccount.fetch(predictionAccount.publicKey);

      assert(predictionAccountData.direction.eq(new anchor.BN(11)))
      assert(predictionAccountData.asset == "truesight_protocol")
    });

  })   

  describe('ValidatePrediction', () => {

    it('prediction was validated', async () => {
      // Add your test here.
      const predictionAccount = anchor.web3.Keypair.generate();
      
      await program.rpc.validatePrediction({
        accounts: {
          predictionAccount: predictionAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [predictionAccount]
      });

      const predictionAccountData = await program.account.predictionAccount.fetch(predictionAccount.publicKey);
      assert(predictionAccountData.isCorrect == true)
    });

  })   
  
  describe('create and validate prediction', () => {

    it('prediction was validated', async () => {
      // Add your test here.
      const predictionAccount = anchor.web3.Keypair.generate();

      await program.rpc.createPrediction("truesight_protocol", new anchor.BN(11), {
        accounts: {
          predictionAccount: predictionAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [predictionAccount]
      });
      
      await program.rpc.validatePrediction({
        accounts: {
          predictionAccount: predictionAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [predictionAccount]
      });

      const predictionAccountData = await program.account.predictionAccount.fetch(predictionAccount.publicKey);
      assert(predictionAccountData.isCorrect == true)
    });

  })   


});
