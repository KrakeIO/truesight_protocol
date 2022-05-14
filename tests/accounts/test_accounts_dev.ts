import * as anchor from '@project-serum/anchor';

// Pyth Test Accounts on DevNet - TSLA
//    https://pyth.network/markets/?cluster=devnet#Equity.US.TSLA/USD
export const SolSymbolAccount  = new anchor.web3.PublicKey("GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R");
export const SolPriceAccount   = new anchor.web3.PublicKey("9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh");  

export const TSDMintAccount          = new anchor.web3.PublicKey("dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia");  
export const TokenProgramAccountID   = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

// Account used for testing
export const TestAccount             = new anchor.web3.PublicKey("25mmR3DSSvAxHMynzbHWyu71fK7Z6QopHWPGCVafPdjD");  
export const TestAccountTokenWallet  = new anchor.web3.PublicKey("GmncVDrX9zT8YfVy5bw9bHeaFmexFogn6Vw9aGNd7EdP");  

// Account used for testing
export const PlayerAccount             = new anchor.web3.PublicKey("25mmR3DSSvAxHMynzbHWyu71fK7Z6QopHWPGCVafPdjD");  
export const PlayerAccountTokenWallet  = new anchor.web3.PublicKey("GmncVDrX9zT8YfVy5bw9bHeaFmexFogn6Vw9aGNd7EdP");  

// Account where all bids (TSD) are stored
export const BettingPool             = new anchor.web3.PublicKey("86GLqjnFDFnniT7QdXafmUbQmyb8aEuz9tQytccgCWu6");  
export const BettingPoolTokenAccount = new anchor.web3.PublicKey("Bs7ceU6r1TZGu4sLZeU22crZkkaY5LSce5G3PgbrfnUe");

// Account where accumulated TSDs from previous loses and DAO contributions are stored
export const PrizePool               = new anchor.web3.PublicKey("4Uea6DkewHxY7HSoY8VWzydkaBXa3rbzfjFdpDqiYScD");  
export const PrizePoolTokenAccount   = new anchor.web3.PublicKey("3phNpx8hteQ9Tn7d7JZmrkETrStWa5Zxdqc4o5Ua4iu3");  




// // Account where all bids (TSD) are stored
// export const BettingPool             = new anchor.web3.PublicKey("86GLqjnFDFnniT7QdXafmUbQmyb8aEuz9tQytccgCWu6");  
// export const BettingPoolTokenAccount = new anchor.web3.PublicKey("Bs7ceU6r1TZGu4sLZeU22crZkkaY5LSce5G3PgbrfnUe");

// // Account where accumulated TSDs from previous loses and DAO contributions are stored
// export const PrizePool               = new anchor.web3.PublicKey("4Uea6DkewHxY7HSoY8VWzydkaBXa3rbzfjFdpDqiYScD");  
// export const PrizePoolTokenAccount   = new anchor.web3.PublicKey("3phNpx8hteQ9Tn7d7JZmrkETrStWa5Zxdqc4o5Ua4iu3");  