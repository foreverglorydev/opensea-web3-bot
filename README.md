# opensea-web3-bot

This is OpenSea sniper bot that only uses web3.js instead of opensea.js

`How to use`
1. Fill the RPC(Infura recommended) in config.json
    `https://mainnet.infura.io/v3/{Infura ID}`
2. Fill the Private Key that will be used to purchase the NFT
3. Fill the collectionSlug
   
    `"collectionSlug": [
        "beepos",
        ".crypto",
        "XBoys"
    ],`
   
   These are opensea slugs of Collections that you want to monitor.   
4. Run `yarn install`
5. Run `yarn start`
