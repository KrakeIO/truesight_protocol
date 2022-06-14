// DEVNET configuration
import * as anchor from '@project-serum/anchor';

const targetNetwork = "devnet"
const pythNetworkMappingAddress = "BmA9Z6FjioHJPpjT39QazZyhDRUdZy2ezwx4GiDdE2u2"

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const connection = provider.connection;
// const wallet     = provider.wallet;

const idl = JSON.parse(
  require("fs").readFileSync("./target/idl/truesight_protocol.json", "utf8")
); 

const programId   = new anchor.web3.PublicKey("6nDKKqTvzw3JNG1GmtWFSGwC1ZGuvzi5bZyXq2X2P9vx");
const program     = new anchor.Program(idl, programId);

const TokenProgramAccountID   = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TSDMintAddress          = "dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia"
const TSDMintAccount          = new anchor.web3.PublicKey(TSDMintAddress);  

// Account used for testing
const TestAccount             = new anchor.web3.PublicKey("5iSkxWSbBM3nDYg8T85zCVXSD9baRoDRZuweqxDdYmUY");  
const TestAccountTokenWallet  = new anchor.web3.PublicKey("9iyp4DrLuDp2RZrNtzMb1s5FL2qcNcEjHwAYyJY7k4nm");  

// Account where all bids (TSD) are stored
const BettingPool             = new anchor.web3.PublicKey("7fHHgY6Rpx63ancGYJKUgtQ6JdzQ3SuLj991KvqHmZu5");  
const BettingPoolTokenAccount = new anchor.web3.PublicKey("J8NFzW9c1R9PwVfD7W8cW61VUJEzPb3TrykwwoWZPjwJ");

// Account where accumulated TSDs from previous loses and DAO contributions are stored
const PrizePool               = new anchor.web3.PublicKey("5Bbk3FGwXzLCbPSoiHYtHBwsBfYqndBY8cCg5r3xedvy");  
const PrizePoolTokenAccount   = new anchor.web3.PublicKey("CyTUhGP9DWYWAAsZJW5J75RutKiMhnCTCMv7bprEDz8a");  

export { 
  connection,
  program, 
  provider,
  targetNetwork,
  TSDMintAddress,
  TSDMintAccount,
  TokenProgramAccountID,
  TestAccount,
  TestAccountTokenWallet,
  BettingPool,
  BettingPoolTokenAccount,
  PrizePool,
  PrizePoolTokenAccount,
  pythNetworkMappingAddress
};