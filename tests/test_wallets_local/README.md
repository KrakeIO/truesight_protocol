## Wallet Environment Setup - LocalNet
## DOES NOT SUPPORT SPL TOKENS

Test TSD token minting
```
# Mint Address: MINT_ADDRESS

# Creating a new token
spl-token create-token
spl-token mint 9DuLpziPjWMAozm5gyytiXsC7GnsoRTQfXcCmHkyfdYo 1000000000
```

Test Player Wallet
```
solana-keygen new --outfile "player.json"

# Public Key            - BukwqukdpGUDTt3FuFfCN5N2xFyfYTHC9gJXVcfXrYvB
# Testing TSD account   - 
# Seed Phrase           - elevator rice route enter prison lunar follow novel attend key parent seed
# Private Key location  - tests/test_wallets_local/player.json

# Topping up
spl-token transfer 5dTdJbKcrmQakqcBAhTvKyF2AewcPL74kGRBos2wGdnC 1000000 BukwqukdpGUDTt3FuFfCN5N2xFyfYTHC9gJXVcfXrYvB  --allow-unfunded-recipient --fund-recipient
```

Test Betting Pool Wallet
```
solana-keygen new --outfile "betting_pool.json"

# Public Key - D6gW2tiDUCudUphZYNwRAgcJ13pjXw3a4M4DXXrX3w68
# Testing TSD account - 
# Seed Phrase - favorite assume page viable among defy tuition excess gas soldier blind normal
# Private Key location - tests/test_wallets_local/betting_pool.json


# Topping up
spl-token transfer 5dTdJbKcrmQakqcBAhTvKyF2AewcPL74kGRBos2wGdnC 100 D6gW2tiDUCudUphZYNwRAgcJ13pjXw3a4M4DXXrX3w68  --allow-unfunded-recipient --fund-recipient
```

Test Prize Pool Wallet
```
solana-keygen new --outfile "prize_pool.json"

# Public Key - G9sNcWYrSPZANc7tWicXVWvybKK2HduU4pCA6ojr74TA
# Testing TSD account   - 
# Seed Phrase - wet bicycle duty hurt vital chuckle puppy captain like winner claw swarm
# Private Key location - tests/test_wallets/prize_pool.json

# Topping up
spl-token transfer dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia 100 G9sNcWYrSPZANc7tWicXVWvybKK2HduU4pCA6ojr74TA  --allow-unfunded-recipient --fund-recipient
```