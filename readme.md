# TrueSight DAO protocol

## Overview
This repository holds the smart contracts that support both our game as well as the operation of our DAO's governance

### Prerequisites
- Rust
- Solana
- Yarn
- Anchor

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

## Codebase Setup
[Install Anchor and Deps](https://project-serum.github.io/anchor/getting-started/installation.html#install-rust)

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