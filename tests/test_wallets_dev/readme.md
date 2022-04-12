## Wallet Environment Setup - DevNet

Test TSD token minting
```
# Mint Address: dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia

# Creating a new token
spl-token create-token
spl-token mint dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia 1000000000
```

Test Player Wallet
```
solana-keygen new --outfile "player.json"

# Public Key            - 25mmR3DSSvAxHMynzbHWyu71fK7Z6QopHWPGCVafPdjD
# Testing TSD account   - GmncVDrX9zT8YfVy5bw9bHeaFmexFogn6Vw9aGNd7EdP
# Seed Phrase           - puppy fault suspect scan twelve cherry mail gospel animal fog forest assault
# Private Key location  - tests/test_wallets/player.json

# Topping up
spl-token transfer dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia 1000000 25mmR3DSSvAxHMynzbHWyu71fK7Z6QopHWPGCVafPdjD  --allow-unfunded-recipient --fund-recipient
```

Test Betting Pool Wallet
```
solana-keygen new --outfile "betting_pool.json"

# Public Key - 86GLqjnFDFnniT7QdXafmUbQmyb8aEuz9tQytccgCWu6
# Testing TSD account   - Bs7ceU6r1TZGu4sLZeU22crZkkaY5LSce5G3PgbrfnUe
# Seed Phrase - crane police furnace wagon worth scout liquid like first tape furnace hamster
# Private Key location - tests/test_wallets/betting_pool.json


# Topping up
spl-token transfer dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia 100 86GLqjnFDFnniT7QdXafmUbQmyb8aEuz9tQytccgCWu6  --allow-unfunded-recipient --fund-recipient
```

Test Prize Pool Wallet
```
solana-keygen new --outfile "prize_pool.json"

# Public Key - 4Uea6DkewHxY7HSoY8VWzydkaBXa3rbzfjFdpDqiYScD
# Testing TSD account   - 3phNpx8hteQ9Tn7d7JZmrkETrStWa5Zxdqc4o5Ua4iu3
# Seed Phrase - surround upgrade snap walk reason steel chuckle hybrid trust water water rice
# Private Key location - tests/test_wallets/prize_pool.json

# Topping up
spl-token transfer dUxFDBEsiDHcWULa6Zr9cDHJHg8uy1PAH69aY74oXia 100 4Uea6DkewHxY7HSoY8VWzydkaBXa3rbzfjFdpDqiYScD  --allow-unfunded-recipient --fund-recipient
```