import gradient from 'gradient-string';
import chalk from 'chalk';
import Web3 from 'web3';

//initial-message
var start = (data) => { console.log(gradient.pastel.multiline(data) + "\n\nv0.0.1\n\n" + chalk.bold("Welcome! Enter your URL to start connecting the Ethereum network with Web3.") + "\n\nIf you don't know what it is or how to start the JSON-RPC API on the ethereum network, visit: https://ethereum.org/pt-br/developers/docs/apis/json-rpc/\n\n")}

var invalid = () => {console.info("Error:", "Invalid data, please fill in the field correctly.")}

var n1 = (r) => {console.log("\nOK\nRPC URL: ", r + "\n")}

var n2 = (s) => {console.log("\nOK\nAddress: ", s + "\n")}

var n3 = (r) => {console.log("\nOK\nSlug Collection Name: ", r)}

var atl = () => {console.log("\nOK\nUpdating data...")}

var anali = (b) => {console.log("\nInitiating ERC721 token scan for the pre-defined Slug Collection in the initial configuration.\nScan starting from block " + b)}

var blockg = (b,q) => {console.log("\nAnalyzing " + q + " transactions from block " + b + ", please wait.")}

var nftm = (k) => {console.log("NFT from " + k + " collection slug successfully located, checking prices, please wait.")}

var errNFT = (s) => {console.log("No NFT found in block " + s + " belonging to the collection slug given for the request, going to block " + parseFloat(s + 1))}

var blockF = (k) => {console.log("Block " + k + " successfully parsed by parsing the block " + parseFloat(k+1) + "    name: beepos 6018, previous price: 0.15, current price: 0.14")}

var nentx = (c,k) => {console.log("Block " + c + " - Transaction " + k + " successfully parsed, moving to the next transaction.")}

var invalidConfig = () => {console.log("Config.json file not found or characters present in config.json are invalid or incorrect.")}

var faltData = () => {console.log('Missing data for CLI startup, check that "rpc", "privateKey" and "collectionSlug" exist in the config.json file.')}

var testB = (b) => {console.log('Identified test block mode, starting with the block '+ b)}

export { invalid,start, n1, n2, n3, atl, anali, blockg, nftm, errNFT, blockF, nentx, invalidConfig, faltData, testB }
