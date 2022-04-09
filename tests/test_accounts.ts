import * as anchor from '@project-serum/anchor';

// Pyth Test Accounts on DevNet - TSLA
//    https://pyth.network/markets/?cluster=devnet#Equity.US.TSLA/USD

export const SolSymbolAccount  = new anchor.web3.PublicKey("GaBJpKtnyUbyKe34XuyegR7W98a9PT5cg985G974NY8R");
export const SolPriceAccount   = new anchor.web3.PublicKey("9TaWcpX3kdfdWQQdNtAjW12fNEKdiicmVXuourqn3xJh");  

export const TSDMintAccount          = new anchor.web3.PublicKey("dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia");  
export const TokenProgramAccountID   = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

// Account used for testing
export const TestAccount             = new anchor.web3.PublicKey("5iSkxWSbBM3nDYg8T85zCVXSD9baRoDRZuweqxDdYmUY");  
export const TestAccountTokenWallet  = new anchor.web3.PublicKey("9iyp4DrLuDp2RZrNtzMb1s5FL2qcNcEjHwAYyJY7k4nm");  

// Account where all bids (TSD) are stored
export const BettingPool             = new anchor.web3.PublicKey("7fHHgY6Rpx63ancGYJKUgtQ6JdzQ3SuLj991KvqHmZu5");  
export const BettingPoolTokenAccount = new anchor.web3.PublicKey("J8NFzW9c1R9PwVfD7W8cW61VUJEzPb3TrykwwoWZPjwJ");

// Account where accumulated TSDs from previous loses and DAO contributions are stored
export const PrizePool               = new anchor.web3.PublicKey("5Bbk3FGwXzLCbPSoiHYtHBwsBfYqndBY8cCg5r3xedvy");  
export const PrizePoolTokenAccount   = new anchor.web3.PublicKey("CyTUhGP9DWYWAAsZJW5J75RutKiMhnCTCMv7bprEDz8a");  