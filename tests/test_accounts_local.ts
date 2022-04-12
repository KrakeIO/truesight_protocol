import * as anchor from '@project-serum/anchor';

// Pyth Test Accounts on DevNet - TSLA
//    https://pyth.network/markets/?cluster=devnet#Equity.US.TSLA/USD
export const SolSymbolAccount  = new anchor.web3.PublicKey("");
export const SolPriceAccount   = new anchor.web3.PublicKey("");  

export const TSDMintAccount          = new anchor.web3.PublicKey("AZmRbejh6Nc2ZeBQQ1gPiBU5ExHvqnzdCXKYtdYvHLTG");  
export const TokenProgramAccountID   = "";


// Account used for testing
export const TestAccount             = new anchor.web3.PublicKey("");  
export const TestAccountTokenWallet  = new anchor.web3.PublicKey("");  

// Account where all bids (TSD) are stored
export const BettingPool             = new anchor.web3.PublicKey("");  
export const BettingPoolTokenAccount = new anchor.web3.PublicKey("");

// Account where accumulated TSDs from previous loses and DAO contributions are stored
export const PrizePool               = new anchor.web3.PublicKey("");  
export const PrizePoolTokenAccount   = new anchor.web3.PublicKey("");  


// Account used for testing
//   https://stackoverflow.com/questions/68761789/solana-anchor-how-to-test-different-signers-interacting-with-program-functions
export const PlayerAccount             = new anchor.web3.PublicKey("");  
export const PlayerAccountTokenWallet  = new anchor.web3.PublicKey("");  



// // Account where all bids (TSD) are stored
// export const BettingPool             = new anchor.web3.PublicKey("86GLqjnFDFnniT7QdXafmUbQmyb8aEuz9tQytccgCWu6");  
// export const BettingPoolTokenAccount = new anchor.web3.PublicKey("Bs7ceU6r1TZGu4sLZeU22crZkkaY5LSce5G3PgbrfnUe");

// // Account where accumulated TSDs from previous loses and DAO contributions are stored
// export const PrizePool               = new anchor.web3.PublicKey("4Uea6DkewHxY7HSoY8VWzydkaBXa3rbzfjFdpDqiYScD");  
// export const PrizePoolTokenAccount   = new anchor.web3.PublicKey("3phNpx8hteQ9Tn7d7JZmrkETrStWa5Zxdqc4o5Ua4iu3");  