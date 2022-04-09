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


#### Upgrading Anchor
```
cargo install --git https://github.com/project-serum/anchor --tag v0.23.0 anchor-cli --locked

```

#### Node based dependencies
```
npm i -D @types/node
```

```
yarn install
```

## Wallet Environment Setup

Test Player Wallet
```
solana-keygen new --outfile "player.json"

# Public Key - 6F3zXV4Kic7VJwvctojfeskyFDP24n9cQL5BEg7YFvJT
# Private Key location - tests/test_wallets/player.json
```

Test Betting Pool Wallet
```
solana-keygen new --outfile "betting_pool.json"

# Public Key - Ha6KdoiEVc4veZGkJmkhRZnMTayseWnNEd94aekov1Au
# Private Key location - tests/test_wallets/betting_pool.json
```

Test Prize Pool Wallet
```
solana-keygen new --outfile "prize_pool.json"

# Public Key - 25BWqDfqF7a65hJC833HgP6k2BFJJTgUKPEZya4NDJ84
# Private Key location - tests/test_wallets/prize_pool.json
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
