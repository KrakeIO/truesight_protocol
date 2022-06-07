# TrueSight DAO protocol

## Overview
This repository holds the smart contracts that support both our game as well as the operation of our DAO's governance

### Prerequisites
- Rust
- Solana
- Yarn
- Anchor

## Deployment

To deploy secret key at .env at the root location of your project
```
HOT_WALLET_SECRET_KEY="YOUR_SECRET_KEY"
```

## Development
Starting the local validator
```
solana-test-validator
```

Compiling the smart contract
```
anchor build
```

Deploying the smart contract
```
anchor deploy
```

Testing the client (make sure local validator is not running)

```
anchor test
```

Running a simple standalone script to write a prediction record
```
anchor run write_prediction
```

Running a simple standalone script to read a prediction record
```
anchor run read_prediction
```

Running a simple web server to allow users the ability to read and write prediction records to the blockchain
```
anchor run run_server
```


## Codebase Setup
[Install Anchor and Deps](https://project-serum.github.io/anchor/getting-started/installation.html#install-rust)


#### Upgrading Anchor
```
cargo install --git https://github.com/project-serum/anchor --tag v0.23.0 anchor-cli --locked

```

#### Node based dependencies
```
yarn install
```

#### Link your own solana wallet
Update the following file ```Anchor.toml``` 

```
// The private key file for your wallet
wallet = "..."

// The cluster you are pointing to
cluster = "localnet"
```

#### File directories
- programs: location of the smart contracts
- tests: location of the test files


#### Mint information
  - MainNet mint address: 6R98EWBJALzZxtN4iUQwCifuXK9jB7CeX4wRC7d6RBbK

  - DevNet mint address: dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia
    - DevNet test token account: 9iyp4DrLuDp2RZrNtzMb1s5FL2qcNcEjHwAYyJY7k4nm