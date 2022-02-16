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

  describe('CreatePrediction', () => {

    it('prediction was created', async () => {
      // Add your test here.
      const predictionRecord = anchor.web3.Keypair.generate();
      
      await program.rpc.createPrediction("truesight_protocol", new anchor.BN(11), {
        accounts: {
          predictionRecord: predictionRecord.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [predictionRecord]
      });

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);

      assert(predictionRecordData.direction.eq(new anchor.BN(11)))
      assert(predictionRecordData.asset == "truesight_protocol")
    });

  })   

  describe('ValidatePrediction', () => {

    it('prediction was validated', async () => {
      // Add your test here.
      const predictionRecord = anchor.web3.Keypair.generate();
      
      await program.rpc.createPrediction("truesight_protocol", new anchor.BN(11), {
        accounts: {
          predictionRecord: predictionRecord.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [predictionRecord]
      });

      await program.rpc.validatePrediction({
        accounts: {
          predictionRecord: predictionRecord.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        }
      });

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
      assert(predictionRecordData.isCorrect == true)
    });

  })   
  

});
