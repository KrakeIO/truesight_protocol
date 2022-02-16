# TrueSight DAO protocol

## Overview
This repository holds the smart contracts that support both our game as well as the operation of our DAO's governance

### Prerequisites
- Rust
- Solana
- Yarn
- Anchor

## Dev Mode
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

Testing the client
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
Update the following file to point to your own wallet's id.json file

-- Anchor.toml

```
wallet = "..."
```

#### File directories
- programs: location of the smart contracts
- tests: location of the clients