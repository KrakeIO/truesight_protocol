import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { 
  getPythProgramKeyForCluster, 
  PythHttpClient,
  parseProductData,
  parsePriceData,
  parseMappingData
} from '@pythnetwork/client'

import { 
  program, 
  provider,   
  targetNetwork,
  TSDMintAccount,
  TSDMintAddress,
  TokenProgramAccountID,
  TestAccount,
  TestAccountTokenWallet,
  BettingPool,
  BettingPoolTokenAccount,
  PrizePool,
  PrizePoolTokenAccount,
  pythNetworkMappingAddress
} from '../CONFIGURATION';


const programKey = getPythProgramKeyForCluster(targetNetwork);
const pyth_client = new PythHttpClient(provider.connection, programKey);

function getProductListings() {
  pyth_client.getData().then(function(result) {
    console.log(result.products)
  })     
}

function getProduct(pyth_symbol_account_address) {
  let pythSymbolPublicKey = new PublicKey(pyth_symbol_account_address)

  provider.connection.getAccountInfo(pythSymbolPublicKey).then(function(accountInfo) {
    let product = parseProductData(accountInfo.data)
    console.log(product)

    return  provider.connection.getAccountInfo(product.priceAccountKey)

  }).then(function(accountInfo) {
    let priceData = parsePriceData(accountInfo.data);
    console.log(priceData.price);
  })
}

function getMapping() {
  let pythSymbolPublicKey = new PublicKey(pythNetworkMappingAddress)

  provider.connection.getAccountInfo(pythSymbolPublicKey).then(function(accountInfo) {
    let mapping = parseMappingData(accountInfo.data)
    console.log(mapping)
    console.log(mapping.productAccountKeys[0].toBase58())

  })
}


// When function is called directly
if (require.main === module) {
  // getProductListings();
  // getProduct("89GseEmvNkzAMMEXcW9oTYzqRPXTsJ3BmNerXmgA1osV");
  getMapping();

}
