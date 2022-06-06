import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TruesightProtocol } from '../target/types/truesight_protocol';

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

import { readByRecord } from './read_prediction';

function init() {
  let holdoutPeriodSec = 100;

  // Smallest unit is 0.0000000001
  let bidAmount                 = 7; // 7TSD   
  let direction                 = "UP";
  let tesla_pyth_symbol_account = "GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R";
  let tesla_pyth_price_account  = "9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh"

  writePrediction(
    tesla_pyth_symbol_account,
    tesla_pyth_price_account,
    holdoutPeriodSec,
    bidAmount,
    direction    
  );

}

function writePrediction(
  pyth_symbol_account_address: string, 
  pyth_price_account_address: string,
  holdoutPeriodSec: number,
  bidAmount: number,
  direction: string
) {

  let PythSymbolAccount  = new anchor.web3.PublicKey(pyth_symbol_account_address);
  let PythPriceAccount   = new anchor.web3.PublicKey(pyth_price_account_address);  
  let predictionRecord = anchor.web3.Keypair.generate();
  console.log("Record written at location: " + predictionRecord.publicKey.toString());  

  program.rpc.createPrediction(
    direction, 
    new anchor.BN(holdoutPeriodSec), 
    new anchor.BN(bidAmount),
    {
      accounts: {
        predictionRecord:       predictionRecord.publicKey,
        assetRecord:            PythSymbolAccount,
        assetPriceRecord:       PythPriceAccount,
        user:                   provider.wallet.publicKey,
        mint:                   TSDMintAccount,
        userTokenWallet:        TestAccountTokenWallet,
        bettingPoolTokenWallet: BettingPoolTokenAccount,
        systemProgram:          anchor.web3.SystemProgram.programId,
        tokenProgram:           TokenProgramAccountID,
      },
      signers: [predictionRecord]
    }

  ).then(function (result) { 
    console.log("This is the result");
    console.log(arguments); 
    
    readByRecord(predictionRecord).then( function( predictionRecordData ) {
      console.log("Prediction record");
      console.log(predictionRecordData);
    });

  }).catch(function (error) { 
    console.log("This is an error");
    console.log(arguments); 

  });;
}

// When function is called directly
if (require.main === module) {
  init();

}


export { writePrediction };