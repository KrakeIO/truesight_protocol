import { readByAddress } from './helpers/read_prediction';
import { writePrediction } from './helpers/write_prediction';
import express from 'express';

let app = express()

app.get('/', function (req, res) {
   res.send('Hello World');

});

app.get('/prediction', function (req, res) {
   let prediction_record_address = req.query.prediction_record;
   readByAddress(prediction_record_address).then(function(predictionRecordData) {
      res.send(predictionRecordData);
   })
});

let server = app.listen(8081, function() {
  let host = server.address().address;
  let port = server.address().port;
});