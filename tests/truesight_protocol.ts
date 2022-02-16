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

    it('creates prediction', async () => {
      const predictionRecord = anchor.web3.Keypair.generate();
      const holdoutPeriodSec = 100;it('creates prediction', async () => {
      const predictionRecord = anchor.web3.Keypair.generate();
      const holdoutPeriodSec = 100;
      
      await program.rpc.createPrediction(
        "truesight_protocol", 
        new anchor.BN(11), 
        new anchor.BN(holdoutPeriodSec), 
        {
          accounts: {
            predictionRecord: predictionRecord.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [predictionRecord]
        }
      );

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
      assert(predictionRecordData.direction.eq(new anchor.BN(11)));
      assert(predictionRecordData.asset == "truesight_protocol");
      assert(predictionRecordData.validationDate.toNumber() == 0);
    });
      
      await program.rpc.createPrediction(
        "truesight_protocol", 
        new anchor.BN(11), 
        new anchor.BN(holdoutPeriodSec), 
        {
          accounts: {
            predictionRecord: predictionRecord.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [predictionRecord]
        }
      );

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
      assert(predictionRecordData.direction.eq(new anchor.BN(11)));
      assert(predictionRecordData.asset == "truesight_protocol");
      assert(predictionRecordData.validationDate.toNumber() == 0);
    });

    it('does not create prediction when holdout period is invalid', async () => {
      const predictionRecord = anchor.web3.Keypair.generate();
      const holdoutPeriodSec = 0;
      
      await program.rpc.createPrediction(
        "truesight_protocol", 
        new anchor.BN(11), 
        new anchor.BN(holdoutPeriodSec), 
        {
          accounts: {
            predictionRecord: predictionRecord.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [predictionRecord]
        }
      );

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
      assert(predictionRecordData.direction.toNumber() == 0);
      assert(predictionRecordData.asset != "truesight_protocol");
      assert(predictionRecordData.validationDate.toNumber() == 0);
    });

  })   

  describe('ValidatePrediction', () => {

    it('validates prediction', async () => {
      const predictionRecord = anchor.web3.Keypair.generate();
      const holdoutPeriodSec = 5;
      
      await program.rpc.createPrediction(
        "truesight_protocol", 
        new anchor.BN(11), 
        new anchor.BN(holdoutPeriodSec),        
        {
          accounts: {
            predictionRecord: predictionRecord.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [predictionRecord]
        }
      );
      await new Promise((r) => setTimeout(r, 6000));

      await program.rpc.validatePrediction({
        accounts: {
          predictionRecord: predictionRecord.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        }
      });

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
      assert(predictionRecordData.isCorrect == true);
      assert(predictionRecordData.validationDate.toNumber() * 1000 < Date.now());

    });

    it('does not validate prediction if original prediction was invalid', async () => {
      const predictionRecord = anchor.web3.Keypair.generate();
      const holdoutPeriodSec = 0;
      
      await program.rpc.createPrediction(
        "truesight_protocol", 
        new anchor.BN(11), 
        new anchor.BN(holdoutPeriodSec),        
        {
          accounts: {
            predictionRecord: predictionRecord.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [predictionRecord]
        }
      );
      await new Promise((r) => setTimeout(r, 6000));

      await program.rpc.validatePrediction({
        accounts: {
          predictionRecord: predictionRecord.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        }
      });

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
      assert(predictionRecordData.asset != "truesight_protocol");      
      assert(predictionRecordData.isCorrect == false);
      assert(predictionRecordData.validationDate.toNumber() == 0);

    });

    it('does not validate prediction if expiry date is still in the future', async () => {
      const predictionRecord = anchor.web3.Keypair.generate();
      const holdoutPeriodSec = 5;
      
      await program.rpc.createPrediction(
        "truesight_protocol", 
        new anchor.BN(11), 
        new anchor.BN(holdoutPeriodSec),      
        {
          accounts: {
            predictionRecord: predictionRecord.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [predictionRecord]
        }
      );

      await new Promise((r) => setTimeout(r, 4000));

      await program.rpc.validatePrediction({
        accounts: {
          predictionRecord: predictionRecord.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        }
      });

      const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);     
      assert(predictionRecordData.isCorrect == false);
      assert(predictionRecordData.validationDate.toNumber() == 0);

    });

  })   
  

});
