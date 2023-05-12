# cBridge-brewery

Please refer doc here: https://cbridge-docs.celer.network/developer/cbridge-transfer-web-widget

# Testnet Env

testnet: .env.test
BAS testnet: .env.bas_testnet

using local env to run the project:

`$cp .env.test .env`


# Whitelist
whitelisted the support chains and tokens into chains_${env}.ts file

for example, add USDC to BSC Testnet chain .

```
bscTest: {
    name: "BSC Testnet",
    chainId: 97,
    rpcUrl: "https://bsc-testnet.nodereal.io/v1/bdc0906a6f534a4598cdb24425cc855a",
    iconUrl: "./bnbchain.png",
    symbol: "BNB",
    blockExplorerUrl: "https://testnet.bscscan.com",
    tokenSymbolList: ["USDC"], // USDC token to be whitelisted
    lqMintTokenSymbolBlackList: ["USDC"], // add if the token doesn't support liquidity pool
  }
```

## Add Bridge Functionality for Chain's Native Token

After you put native token symbol into token symbol whitelist, you will also have to configure it as a native token. 
To implement this, modify the following files. If you have any questions, you can refer this: 
https://github.com/celer-network/cBridge-transfer-widget/commit/b47a6e85eee480f8bb4440f13949766a2744369c

### Add below code snippets to .../src/components/transfer/TokenList.tsx
```
if (targetChainId === CHAIN_ID && tokenSymbol === CHAIN_NATIVE_TOKEN_SYMBOL) {
  return true;
}
```

### Add below code snippets to .../src/hooks/useNativeETHToken.ts
```
if (srcChain.id === CHAIN_ID && tokenInfo.token.symbol === CHAIN_NATIVE_TOKEN_SYMBOL) {
    nativeETHToken = true;
}
```

### Add below code snippets to .../src/views/History.tsx
```
if (item?.dst_received_info.chain.id === CHAIN_ID && item?.src_send_info?.token.symbol === CHAIN_NATIVE_TOKEN_SYMBOL) {
    shouldDisplayMetaMaskIcon = false;
}
```

# Tabs

specific support tab view in env configuration file.

for example, show both transfer and NFT Tabs in widget.

`REACT_APP_FEATURES_SUPPORTED="Transfer|NFT"`


## Terra Wallet Support

Since the bridge widget supports terra wallet, you have to getChainOptions and populate `WalletProvider` before render. Otherwise, you will face app crash. You can refer src/index.js for usage.
