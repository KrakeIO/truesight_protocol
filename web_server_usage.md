Overview
===

This document describes how to consume the exposed web services


Write Prediction Record
---
  
  - Parameters
    - pyth_symbol_account: STRING - The location at which the stock symbol information is stored on the pyth network
    - pyth_price_account: STRING - The location at which the price information is stored on the pyth network
    - holdout_period_seconds: Integer - Number of seconds before prediction matures
    - direction: STRING - The direction in which we are betting on
        "UP" or "DOWN"

Sample Request
```
HTTP POST http://localhost:8081
  
  {
    "pyth_symbol_account": "GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R",
    "pyth_price_account": "9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh",
    "holdout_period_seconds": 100,
    "direction": "UP"
  }

```

Sample Response
```
  {
      "direction": "UP",
      "asset": "Equity.US.TSLA/USD",
      "isCorrect": false,
      "expiryDate": "629f06f5",
      "bidderTokenWalletKey": "9iyp4DrLuDp2RZrNtzMb1s5FL2qcNcEjHwAYyJY7k4nm",
      "pythProductPublicKey": "GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R",
      "pythPricePublicKey": "9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh",
      "validationDate": "00",
      "entryPrice": "0320c8",
      "entryExpo": -5,
      "validationPrice": "00",
      "validationExpo": 0,
      "bidAmount": "0a",
      "record_address": "HMdCfYbmbpS63H7pQenfzmfBwJh6KYHv2iMDLmmyEQRx"
  }
```

Read Prediction Record
---

  - Parameters
    - prediction_record: STRING - The address at the prediction record is stored
    

Sample Request
```
HTTP GET http://localhost:8081/prediction?prediction_record=HMdCfYbmbpS63H7pQenfzmfBwJh6KYHv2iMDLmmyEQRx

```

```
  {
    "direction": "UP",
    "asset": "Equity.US.TSLA/USD",
    "isCorrect": false,
    "expiryDate": "629f06f5",
    "bidderTokenWalletKey": "9iyp4DrLuDp2RZrNtzMb1s5FL2qcNcEjHwAYyJY7k4nm",
    "pythProductPublicKey": "GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R",
    "pythPricePublicKey": "9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh",
    "validationDate": "00",
    "entryPrice": "0320c8",
    "entryExpo": -5,
    "validationPrice": "00",
    "validationExpo": 0,
    "bidAmount": "0a"
  }
```

Withdraw TSD tokens
---

  - Parameters
    - to_address: STRING - The address of the player's offline wallet
    - withdraw_amount: FLOAT - The amount of TSD Tokens to withdraw into player's offline wallet

Sample Request
```
HTTP POST http://localhost:8081/transfer-tsd

  {
      "to_address": "7fHHgY6Rpx63ancGYJKUgtQ6JdzQ3SuLj991KvqHmZu5",
      "withdraw_amount": 398
  }

```

```
  {
    "to_address": "7fHHgY6Rpx63ancGYJKUgtQ6JdzQ3SuLj991KvqHmZu5",
    "withdrawal_amount": 398,
    "transaction_hash": "29sVpMUFnt5q8LPYHa9wDFumWaRCA4yEdUSyX5KUUzdwgDrbCWBm4NTwXpqyMEG1WUWD419pjr9CvQz5JQCrrgjn"
  }
```