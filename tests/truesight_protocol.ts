import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TruesightProtocol } from '../target/types/truesight_protocol';
import assert from 'assert';

describe('truesight_protocol', () => {

  // Pyth Test Accounts on DevNet - TSLA
  //    https://pyth.network/markets/?cluster=devnet#Equity.US.TSLA/USD

  const SolSymbolAccount  = new anchor.web3.PublicKey("GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R");
  const SolPriceAccount   = new anchor.web3.PublicKey("9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh");  

  const TSDMintAccount          = new anchor.web3.PublicKey("dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia");  
  const TokenProgramAccountID   = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

  // Account used for testing
  const TestAccount             = new anchor.web3.PublicKey("5iSkxWSbBM3nDYg8T85zCVXSD9baRoDRZuweqxDdYmUY");  
  const TestAccountTokenWallet  = new anchor.web3.PublicKey("9iyp4DrLuDp2RZrNtzMb1s5FL2qcNcEjHwAYyJY7k4nm");  

  // Account where all bids (TSD) are stored
  const BettingPool             = new anchor.web3.PublicKey("7fHHgY6Rpx63ancGYJKUgtQ6JdzQ3SuLj991KvqHmZu5");  
  const BettingPoolTokenAccount = new anchor.web3.PublicKey("J8NFzW9c1R9PwVfD7W8cW61VUJEzPb3TrykwwoWZPjwJ");

  // Account where accumulated TSDs from previous loses and DAO contributions are stored
  const PrizePool               = new anchor.web3.PublicKey("5Bbk3FGwXzLCbPSoiHYtHBwsBfYqndBY8cCg5r3xedvy");  
  const PrizePoolTokenAccount   = new anchor.web3.PublicKey("CyTUhGP9DWYWAAsZJW5J75RutKiMhnCTCMv7bprEDz8a");  


  // Use the defined cluster - change in Anchor.toml 
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  // Configure the client to use the local cluster.
  // const provider = anchor.Provider.local();  
  // anchor.setProvider(provider);

  const program = anchor.workspace.TruesightProtocol as Program<TruesightProtocol>;

  const printPredicitonRecord = (recordPublicKey, predictionRecordData) => {
    console.log("Prediction Record Account: " + recordPublicKey);
    console.log(predictionRecordData);
    console.log("entryPrice: " + predictionRecordData.entryPrice.toNumber());

    let expiryDate = new Date(predictionRecordData.expiryDate.toNumber() * 1000);
    console.log("expiryDate: " + expiryDate);
    console.log("validationPrice: " + predictionRecordData.validationPrice.toNumber());

    console.log("Entry Expo: " + predictionRecordData.entryExpo);
    console.log("Validation Expo: " + predictionRecordData.validationExpo);

    let validationDate = new Date(predictionRecordData.validationDate.toNumber() * 1000);
    console.log("validationDate: " + validationDate);
  }

  describe('CreatePrediction', () => {

    it('creates prediction', async () => {

      let predictionRecord = anchor.web3.Keypair.generate();
      let holdoutPeriodSec = 100;
      let bidAmount = 7;
      let direction = "UP";
      
      await program.rpc.createPrediction(
        direction, 
        new anchor.BN(holdoutPeriodSec), 
        new anchor.BN(bidAmount),
        {
          accounts: {
            predictionRecord: predictionRecord.publicKey,
            assetRecord: SolSymbolAccount,
            assetPriceRecord: SolPriceAccount,
            user: provider.wallet.publicKey,
            mint: TSDMintAccount,
            userTokenWallet: TestAccountTokenWallet,
            bettingPoolTokenWallet: BettingPoolTokenAccount,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TokenProgramAccountID,
          },
          signers: [predictionRecord]
        }
      );

      let predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
      assert(predictionRecordData.direction == "UP");
      assert(predictionRecordData.asset == "Equity.US.TSLA/USD");
      assert(predictionRecordData.validationDate.toNumber() == 0);
      assert(predictionRecordData.entryPrice > 0);
      assert(predictionRecordData.pythPricePublicKey == "9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh");
      printPredicitonRecord(predictionRecord.publicKey, predictionRecordData);
    });

    // it('creates prediction with entry_price set', async () => {
    //   let predictionRecord = anchor.web3.Keypair.generate();
    //   let holdoutPeriodSec = 100;    
    //   let direction = "UP";
      
    //   await program.rpc.createPrediction(
    //     direction, 
    //     new anchor.BN(holdoutPeriodSec), 
    //     {
    //       accounts: {
    //         predictionRecord: predictionRecord.publicKey,
    //         assetRecord: SolSymbolAccount,
    //         assetPriceRecord: SolPriceAccount,
    //         user: provider.wallet.publicKey,
    //         token_program: TSDMintAccount,
    //         user_token_wallet: TestAccountTokenWallet,
    //         betting_pool: BettingPoolTokenAccount,   
    //         systemProgram: anchor.web3.SystemProgram.programId,
    //       },
    //       signers: [predictionRecord]
    //     }
    //   );

    //   let predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
    //   assert(predictionRecordData.direction == "UP");
    //   assert(predictionRecordData.asset == "Equity.US.TSLA/USD");
    //   assert(predictionRecordData.validationDate.toNumber() == 0);
    //   assert(predictionRecordData.entryPrice > 0);
    //   assert(predictionRecordData.pythPricePublicKey == "9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh");
    // });

    // it('does not create prediction when holdout period is invalid', async () => {
    //   let predictionRecord = anchor.web3.Keypair.generate();
    //   let holdoutPeriodSec = 0;
    //   let direction = "UP";
      
    //   await program.rpc.createPrediction(
    //     direction, 
    //     new anchor.BN(holdoutPeriodSec), 
    //     {
    //       accounts: {
    //         predictionRecord: predictionRecord.publicKey,
    //         assetRecord: SolSymbolAccount,
    //         assetPriceRecord: SolPriceAccount,
    //         user: provider.wallet.publicKey,
    //         token_program: TSDMintAccount,
    //         user_token_wallet: TestAccountTokenWallet,
    //         betting_pool: BettingPoolTokenAccount,
    //         systemProgram: anchor.web3.SystemProgram.programId,
    //       },
    //       signers: [predictionRecord]
    //     }
    //   );

    //   let predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
    //   assert(predictionRecordData.asset != "Equity.US.TSLA/USD");
    //   assert(predictionRecordData.validationDate.toNumber() == 0);
    // });

  })   

  // describe('ValidatePrediction', () => {

  //   it('validates prediction', async () => {
  //     let predictionRecord = anchor.web3.Keypair.generate();
  //     let holdoutPeriodSec = 5;
  //     let direction = "UP";

  //     await program.rpc.createPrediction(
  //       new anchor.BN(11), 
  //       new anchor.BN(holdoutPeriodSec),        
  //       {
  //         accounts: {
  //           predictionRecord: predictionRecord.publicKey,
  //           assetRecord: SolSymbolAccount,
  //           assetPriceRecord: SolPriceAccount,
  //           user: provider.wallet.publicKey,
  //           token_program: TSDMintAccount,            
  //           systemProgram: anchor.web3.SystemProgram.programId,
  //         },
  //         signers: [predictionRecord]
  //       }
  //     );
  //     await new Promise((r) => setTimeout(r, 6000));

  //     await program.rpc.validatePrediction({
  //       accounts: {
  //         predictionRecord: predictionRecord.publicKey,
  //         assetRecord: SolSymbolAccount,
  //         assetPriceRecord: SolPriceAccount,
  //         user: provider.wallet.publicKey,
  //         token_program: TSDMintAccount,          
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       }
  //     });

  //     let predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
  //     assert(predictionRecordData.validationDate.toNumber() * 1000 < Date.now());
      
  //     console.log("Entry price (" +predictionRecordData.entryPrice + ") versus validation price (" + predictionRecordData.validationPrice + ")")
  //     if(predictionRecordData.entryPrice > predictionRecordData.validationPrice) {
  //       console.log("Predicted up and Price went down")
  //       assert(predictionRecordData.isCorrect == false);

  //     } else if (predictionRecordData.entryPrice < predictionRecordData.validationPrice) {
  //       console.log("Predicted up and Price went up")        
  //       assert(predictionRecordData.isCorrect == true);
  //     } else {
  //       console.log("Price has not changed");
  //       assert(predictionRecordData.isCorrect == false);
  //     }

  //     printPredicitonRecord(predictionRecord.publicKey, predictionRecordData);

  //   });

  //   it('does not validate prediction if original prediction was invalid', async () => {
  //     const predictionRecord = anchor.web3.Keypair.generate();
  //     const holdoutPeriodSec = 0;
  //     let direction = "UP";
      
  //     await program.rpc.createPrediction(
  //       new anchor.BN(11), 
  //       new anchor.BN(holdoutPeriodSec),        
  //       {
  //         accounts: {
  //           predictionRecord: predictionRecord.publicKey,
  //           assetRecord: SolSymbolAccount,
  //           assetPriceRecord: SolPriceAccount,
  //           user: provider.wallet.publicKey,
  //           token_program: TSDMintAccount,            
  //           systemProgram: anchor.web3.SystemProgram.programId,
  //         },
  //         signers: [predictionRecord]
  //       }
  //     );
  //     await new Promise((r) => setTimeout(r, 6000));

  //     await program.rpc.validatePrediction({
  //       accounts: {
  //         predictionRecord: predictionRecord.publicKey,
  //         assetRecord: SolSymbolAccount,
  //         assetPriceRecord: SolPriceAccount,
  //         user: provider.wallet.publicKey,
  //         token_program: TSDMintAccount,          
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       }
  //     });

  //     const predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);
  //     assert(predictionRecordData.asset != "Equity.US.TSLA/USD");
  //     assert(predictionRecordData.isCorrect == false);
  //     assert(predictionRecordData.validationDate.toNumber() == 0);

  //   });

  //   it('does not validate prediction if expiry date is still in the future', async () => {
  //     const predictionRecord = anchor.web3.Keypair.generate();
  //     const holdoutPeriodSec = 5;
  //     let direction = "UP";

  //     await program.rpc.createPrediction(
  //       direction, 
  //       new anchor.BN(holdoutPeriodSec),      
  //       {
  //         accounts: {
  //           predictionRecord: predictionRecord.publicKey,
  //           assetRecord: SolSymbolAccount,
  //           assetPriceRecord: SolPriceAccount,
  //           user: provider.wallet.publicKey,
  //           token_program: TSDMintAccount,            
  //           systemProgram: anchor.web3.SystemProgram.programId,
  //         },
  //         signers: [predictionRecord]
  //       }
  //     );

  //     await program.rpc.validatePrediction({
  //       accounts: {
  //         predictionRecord: predictionRecord.publicKey,
  //         assetPriceRecord: SolPriceAccount,
  //         user: provider.wallet.publicKey,
  //         token_program: TSDMintAccount,
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       }
  //     });

  //     let predictionRecordData = await program.account.predictionRecord.fetch(predictionRecord.publicKey);     
  //     assert(predictionRecordData.isCorrect == false);
  //     assert(predictionRecordData.validationDate.toNumber() == 0);

  //     printPredicitonRecord(predictionRecord.publicKey, predictionRecordData);

  //   });

  // })   
  

});
