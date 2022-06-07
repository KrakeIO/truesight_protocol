import { readByAddress }    from './helpers/read_prediction';
import { writePrediction }  from './helpers/write_prediction';
import { transferTSD }      from './helpers/transfer_tsd';
import express from 'express';

let app = express()
app.use(express.json());

app.get('/', function (req, res) {
   res.send('Hello World');

});

app.get('/prediction', function (req, res) {
   let prediction_record_address = req.query.prediction_record;
   readByAddress(prediction_record_address).then(function(predictionRecordData) {
      res.send(predictionRecordData);
   })
});


app.post('/prediction', function (req, res) {
  let bidAmount                 = 10; // 10TSD   
  // let holdoutPeriodSec          = 100;  
  // let direction                 = "UP";
  // let tesla_pyth_symbol_account = "GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R";
  // let tesla_pyth_price_account  = "9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh"

  writePrediction(
    req.body.pyth_symbol_account,
    req.body.pyth_price_account,
    req.body.holdout_period_seconds,
    10,
    req.body.direction    
    
  ).then( function( predictionRecordData ) {
    console.log("Prediction record");
    res.send(predictionRecordData);
  });
});


app.post('/transfer-tsd', function (req, res) {
  let to_address        = req.body.to_address;
  let display_amount    = req.body.withdraw_amount;
  let actual_amount     = display_amount * 1000000000;

  transferTSD(to_address, actual_amount).then(function(transaction_signature) {
    let signature = transaction_signature;
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
    res.send({
      to_address: to_address,
      withdrawal_amount: display_amount,
      transaction_hash: signature
    });
  });  
});

let server = app.listen(8081, function() {
  let host = server.address().address;
  let port = server.address().port;
});