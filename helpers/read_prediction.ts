import * as anchor from '@project-serum/anchor';
import { program } from './configurations';

function init(address: string) {
  return readByAddress(address);
}

function readByRecord(predictionRecord) {
  return program.account.predictionRecord.fetch(predictionRecord.publicKey);
}

function readByAddress(address: string) {
  let predictionRecord = new anchor.web3.PublicKey(address);
  return program.account.predictionRecord.fetch(predictionRecord)
}

// When function is called directly
if (require.main === module) {
  console.log('Read Prediction: called directly');
  let prediction_record_address = "8oFaLsTQfVjMbKRdeFdMAySjax4wEgTXCbHscxu8BU73";
  init(prediction_record_address).then( function( predictionRecordData ) {
    console.log("Prediction record");
    console.log(predictionRecordData);
  });

}

export { readByRecord, readByAddress };