import { abi } from './ABI.js';
import Web3 from 'web3';
// import inquirer from 'inquirer';
// import { getOldPrice, getCollectionSlug } from './Smart Contract/validation.js';
import {anali, blockg, nftm, errNFT, blockF, nentx, testB} from './msg.js';
import fs from 'fs';
// import { abiDecoder } from './decoder.js'

//variaveis
const smartContract = "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b";
var seed;
var account;
var data;
var web3;
// var content = [
//     [
//         '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b', 
//         '0xDa8814e77b687beB7ED15171F2F92Eb7f8E1c280', 
//         '0x04954e7CEA4944996Ea26fF3e409F94f9222fF28', 
//         '0x0000000000000000000000000000000000000000', 
//         '0xe12EDaab53023c75473a5A011bdB729eE73545e8', 
//         '0x0000000000000000000000000000000000000000', 
//         '0x0000000000000000000000000000000000000000', 
//         '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b', 
//         '0x04954e7CEA4944996Ea26fF3e409F94f9222fF28', 
//         '0x0000000000000000000000000000000000000000', 
//         '0x5b3256965e7C3cF26E11FCAf296DfC8807C01073', 
//         '0xe12EDaab53023c75473a5A011bdB729eE73545e8', 
//         '0x0000000000000000000000000000000000000000', 
//         '0x0000000000000000000000000000000000000000'
//     ],
// ]

//analizing
async function asyncAnalize(s,d,rpc,t){
    web3 = new Web3(rpc)
    seed = s;
    account = web3.eth.accounts.privateKeyToAccount(seed)
    data = JSON.parse(d);
    anali(await web3.eth.getBlockNumber().then())
    if(t){
        testB(t)
        verificTransaction(t) 
    }else{
        var block = await web3.eth.getBlockNumber();
        verificTransaction(block)
    }
    // var block = await web3.eth.getBlockNumber();
    // verificTransaction(14263246) 
    // verificTransaction(block)

    // await web3.eth.getBlock(block).then((snapshot) => {
    //     blockg(block, snapshot.transactions.length)
    //     var n = 0;
        // while(n < snapshot.transactions.length){
        //     web3.eth.getTransaction(snapshot.transactions[n], (err, data) => {
        //         console.log(data)
        //         n++;
        //     })
        // }
        // web3.eth.getTransactionReceipt("0xbf63ab06702674125464b3a23a275b7146f36902787762a64810f23214316022", (err,data1) => {
        //     console.log(data1.logs)
        //     if(data1.to == smartContract){
        //         var addN = new web3.eth.Contract(abi.erc721, data1.logs[0].address)
        //         addN.methods.name().call().then((dat) => {
        //             var mm = 0;
        //             while(mm <= data.length + 1){
        //                 if(mm == data.length){
        //                     if(dat == data[mm]){
        //                         nftm(dat)
        //                         return mm = data.length +1;
        //                     }else{
        //                         errNFT(block);
        //                         return mm = data.length +1;
        //                     }
        //                 }else{
        //                     if(dat == data[mm]){
        //                         nftm(dat)
        //                         return mm = data.length +1;
        //                     }else{
        //                         mm++;
        //                     }
        //                 }
        //             }
        //         })
        //     }
        // })
    // })
}

async function verificTransaction(k){
    var s = await web3.eth.getBlock(k).then()
    var n = 0;
    console.log(s)
    if(s == null || s == undefined || s.transactions == null || s.transactions == undefined || s.transactions == '' || s.transactions == []){
        console.log("Block " + k + " not yet confirmed, waiting for confirmation from block " + k)
        verificTransaction(k);
    }else{
    while(n < s.transactions.length){
        if(n == s.transactions.length -1){
            var tx = await web3.eth.getTransactionReceipt(s.transactions[n]).then();
            if(tx == null || tx.to == null || tx.to == undefined || tx.to == ''){
                nentx(k,s.transactions[n])
                blockF(k)
                return verificTransaction(k+1)
            }else if(tx.to == smartContract){
                try{
                var nftCode = await web3.utils.hexToNumberString(tx.logs[0].topics[3])
                var dd = await web3.eth.abi.decodeParameters(abi.log, tx.logs[1].data)
                var priceNft = web3.utils.fromWei(dd.price, 'ether')
                    var addN = new web3.eth.Contract(abi.erc721, tx.logs[0].address)
                    addN.methods.name().call().then(async (dt) => {
                        var mim = 0;
                        while(mim <= data.length +1){
                            if(mim == data.length){
                                if(dt == data[mim]){
                                    var vvx = '';
                                    try{
                                        vvx = JSON.parse(fs.readFileSync("./h.json", {encoding:'utf8'}));
                                    }catch(e){
                                        vvx = null
                                    }                                    if(vvx == null || vvx == undefined || vvx == ''){
                                        var dadd = `{"${tx.logs[0].address + nftCode}":{"price": ${priceNft}}}`;
                                        var rrw = await writeFileJson(dadd)
                                        if(rrw == 'sucess'){
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
        
                                            console.log("NFT not registered before, price registered for comparison with future trades of the same.");
                                            return verificTransaction(k+1)
                                        }else{
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
        
                                            
                                            mim = data.length +1;
                                            n++;;
                                        }
                                    }else if(vvx[tx.logs[0].address + nftCode] == undefined ||  vvx[tx.logs[0].address + nftCode] == '' || vvx[tx.logs[0].address + nftCode] == null){
                                        var dadd = JSON.stringify(vvx).slice(0,-1) + ',"' + tx.logs[0].address + nftCode + '" : { "price": ' + priceNft + '}}';
                                        var rrw = await writeFileJson(dadd);
                                        if(rrw == 'sucess'){
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
        
                                            console.log("NFT not registered before, price registered for comparison with future trades of the same.");
                                            return verificTransaction(k+1)
                                            }else{

                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
            
                                                
                                                mim = data.length +1;
                                                n++;
                                            }
                                    }else{
                                        if(parseFloat(vvx[tx.logs[0].address + nftCode].price) == priceNft || parseFloat(vvx[tx.logs[0].address + nftCode].price) < priceNft){
                                            vvx[tx.logs[0].address + nftCode].price = priceNft
                                            var rrw = await writeFileJson(JSON.stringify(vvx));
                                            if(rrw == 'sucess'){
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
            
                                                console.log("NFT is priced equal to or greater than the previous price, moving to the next transaction.");
                                                return verificTransaction(k+1)
                                            }else{
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
            
                                                
                                                mim = data.length +1;
                                                n++;
                                            }
                                        }else{
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
        
                                            console.log("NFT with price lower than the previous value, sending purchase transaction...")
                                            var compra = new web3.eth.Contract(abi.OpenSeaContract, smartContract);
                                            // compra.methods.atomicMatch_(content).then((s) => {
                                            //     if(s){
                                            //         var dadd = JSON.parse(v)
                                            //         dadd[nftCode].price = priceNft
                                            //         fs.writeFile("./data/history.json", dadd, (err) => {
                                            //             if(err){
                                            //                 console.log(err);
                                            //             }else{
                                            //                 console.log(s)
                                            //                 console.log("Purchase transaction sent successfully for NFT purchase!")
                                            //             }
                                            //         })
                                            //     }
                                            // }, (err) => {
                                            //     if(err){
                                            //         console.log(err)
                                            //     }
                                            // })
                                            return verificTransaction(k+1)
                                        }
                                    }
                                }else{
                                    blockF(k)
                                    errNFT(k);
                                    mim = data.length +1;
                                    n++;
                                    return verificTransaction(k+1)
                                }
                            }else{
                                if(dt == data[mim]){
                                    var vvx = '';
                                    try{
                                        vvx = JSON.parse(fs.readFileSync("./h.json", {encoding:'utf8'}));
                                    }catch(e){
                                        vvx = null
                                    }                                    console.log(vxx)
                                        if(vvx == null || vvx == undefined || vvx == ''){
                                            var dadd = '{"' + tx.logs[0].address + nftCode + '":{"price": '+ priceNft +'}}';
                                            var rrw = await writeFileJson(dadd)
                                            if(rrw == 'sucess'){
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                console.log("NFT not registered before, price registered for comparison with future trades of the same.");
                                                return verificTransaction(k+1)
                                            }else{
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                
                                                mim = data.length +1;
                                                n++;
                                            }
                                    }else if(vvx[tx.logs[0].address + nftCode] == undefined ||  vvx[tx.logs[0].address + nftCode] == '' || vvx[tx.logs[0].address + nftCode] == null){
                                        var dadd = JSON.stringify(vvx).slice(0,-1) + ',"' + tx.logs[0].address + nftCode + '" : { "price": ' + priceNft + '}}';
                                        var rrw = await writeFileJson(dadd);
                                        if(rrw == 'sucess'){
                                            nftm(dt)

                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            console.log("NFT not registered before, price registered for comparison with future trades of the same.");
                                            return verificTransaction(k+1)
                                        }else{
                                            nftm(dt)

                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            
                                            mim = data.length +1;
                                            n++;
                                        }
                                    }else{
                                        if(parseFloat(vvx[tx.logs[0].address + nftCode].price) == priceNft || parseFloat(vvx[tx.logs[0].address + nftCode].price) < priceNft){
                                            vvx[tx.logs[0].address + nftCode].price = priceNft
                                            var rrw = await writeFileJson(JSON.stringify(vvx));
                                            if(rrw == 'sucess'){
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                console.log("NFT is priced equal to or greater than the previous price, moving to the next transaction.");
                                                return verificTransaction(k+1)
                                            }else{
                                                nftm(dt)

                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                
                                                mim = data.length +1;
                                                n++;
                                            }
                                        }else{
                                            nftm(dt)

                                            console.log("NFT with price lower than the previous value, sending purchase transaction...")
                                            var compra = new web3.eth.Contract(abi.OpenSeaContract, smartContract);
                                            // compra.methods.atomicMatch_(content).then((s) => {
                                            //     if(s){
                                            //         var dadd = JSON.parse(v)
                                            //         dadd[nftCode].price = priceNft
                                            //         fs.writeFile("./data/history.json", dadd, (err) => {
                                            //             if(err){
                                            //                 console.log(err);
                                            //             }else{
                                            //                 console.log(s)
                                            //                 console.log("Purchase transaction sent successfully for NFT purchase!")
                                            //             }
                                            //         })
                                            //     }
                                            // }, (err) => {
                                            //     if(err){
                                            //         console.log(err)
                                            //     }
                                            // })
                                            return verificTransaction(k+1)
                                        }
                                    }
                                }else{
                                    mim++;
                                }
                            }
                        }
                    })
                }catch(e){
                    nentx(k,s.transactions[n])
                    blockF(k)
                    return verificTransaction(k+1)
                }
                }else{
                    nentx(k,s.transactions[n])
                    blockF(k)
                    return verificTransaction(k+1)
                }
        }else{
        var tx = await web3.eth.getTransactionReceipt(s.transactions[n]).then()
            if(tx == null || tx.to == null || tx.to == undefined || tx.to == '' || tx.logs == undefined || tx.logs.length <= 1 || tx.logs.length > 3 || tx.logs[1].data == undefined){
                nentx(k,s.transactions[n])
                n++;
            }else if(tx.to == smartContract){
                console.log(tx)
                // console.log(web3.eth.)
                try{
                    var nftCode = await web3.utils.hexToNumberString(tx.logs[0].topics[3])
                    var dd = await web3.eth.abi.decodeParameters(abi.log, tx.logs[parseFloat(tx.logs.length-1)].data) //verificate
                    var priceNft = web3.utils.fromWei(dd.price, 'ether')
                    var addN = new web3.eth.Contract(abi.erc721, tx.logs[0].address)
                    addN.methods.name().call().then(async (dt) => {
                        var mim = 0;
                        while(mim <= data.length +1){
                            if(mim == data.length){
                                if(dt == data[mim]){
                                    var vvx = '';
                                    try{
                                        vvx = JSON.parse(fs.readFileSync("./h.json", {encoding:'utf8'}));
                                    }catch(e){
                                        vvx = null
                                    }                                    // console.log("Hello, this is vvx:" + vvx)
                                        if(vvx == null || vvx == undefined || vvx == ''){
                                            var dadd = '{"' + tx.logs[0].address + nftCode + '":{"price": '+ priceNft +'}}';
                                            var rrw = await writeFileJson(dadd)
                                            if(rrw == 'sucess'){
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                console.log("NFT not registered before, price registered for comparison with future trades of the same.");
                                                mim = data.length +1;
                                                n++;
                                            }else{
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                
                                                mim = data.length +1;
                                                n++;
                                            }
                                    }else if(vvx[tx.logs[0].address + nftCode] == undefined ||  vvx[tx.logs[0].address + nftCode] == '' || vvx[tx.logs[0].address + nftCode] == null){
                                        var dadd = JSON.stringify(vvx).slice(0,-1) + ',"' + tx.logs[0].address + nftCode + '" : { "price": ' + priceNft + '}}';
                                        var rrw = await writeFileJson(dadd);
                                        if(rrw == 'sucess'){
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            console.log("NFT not registered before, price registered for comparison with future trades of the same.");
                                            mim = data.length +1;
                                            n++;
                                        }else{
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            
                                            mim = data.length +1;
                                            n++;
                                        }
                                    }else{
                                        if(parseFloat(vvx[tx.logs[0].address + nftCode].price) == priceNft || parseFloat(vvx[tx.logs[0].address + nftCode].price) < priceNft){
                                            vvx[tx.logs[0].address + nftCode].price = priceNft;
                                            var rrw = await writeFileJson(JSON.stringify(vvx));
                                            if(rrw == 'sucess'){
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
    
                                                console.log("NFT is priced equal to or greater than the previous price, moving to the next transaction.");
                                                mim = data.length +1;
                                                n++;
                                            }else{
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
    
                                                
                                                mim = data.length +1;
                                                n++;
                                            }
                                        }else{
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
    
                                            console.log("NFT with price lower than the previous value, sending purchase transaction...")
                                            var compra = new web3.eth.Contract(abi.OpenSeaContract, smartContract);
                                            // compra.methods.atomicMatch_(content).then((s) => {
                                            //     if(s){
                                            //         var dadd = JSON.parse(v)
                                            //         dadd[nftCode].price = priceNft
                                            //         fs.writeFile("./data/history.json", dadd, (err) => {
                                            //             if(err){
                                            //                 console.log(err);
                                            //             }else{
                                            //                 console.log(s)
                                            //                 console.log("Purchase transaction sent successfully for NFT purchase!")
                                            //             }
                                            //         })
                                            //     }
                                            // }, (err) => {
                                            //     if(err){
                                            //         console.log(err)
                                            //     }
                                            // })
                                            mim = data.length +1;
                                            n++;
                                        }
                                    }
                                }else{
                                    errNFT(k);
                                    mim = data.length +1;
                                    n++;
                                }
                            }else{
                                if(dt == data[mim]){
                                    var vvx = '';
                                    try{
                                        vvx = JSON.parse(fs.readFileSync("./h.json", {encoding:'utf8'}));
                                    }catch(e){
                                        vvx = null
                                    }
                                    // console.log("Hello, this is vvx:" + vvx)
    
                                    if(vvx == null || vvx == undefined || vvx == ''){
                                        var dadd = '{"' + tx.logs[0].address + nftCode + '":{"price": '+ priceNft +'}}';
                                        var rrw = await writeFileJson(dadd)
                                        if(rrw == 'sucess'){
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            
                                            mim = data.length +1;
                                            n++;
                                        }else{
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            
                                            mim = data.length +1;
                                            n++;
                                        }
                                    }else if(vvx[tx.logs[0].address + nftCode] == undefined ||  vvx[tx.logs[0].address + nftCode] == '' || vvx[tx.logs[0].address + nftCode] == null){
                                        var dadd = JSON.stringify(vvx).slice(0,-1) + ',"' + tx.logs[0].address + nftCode + '" : { "price": ' + priceNft + '}}';
                                        var rrw = await writeFileJson(dadd);
                                        if(rrw == 'sucess'){
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            console.log("NFT not registered before, price registered for comparison with future trades of the same.");
                                            mim = data.length +1;
                                            n++;
                                        }else{
                                            nftm(dt)
                                            console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                            mim = data.length +1;
                                            n++;
                                        }
                                    }else{
                                        if(parseFloat(vvx[tx.logs[0].address + nftCode].price) == priceNft || parseFloat(vvx[ tx.logs[0].address + nftCode].price) < priceNft){
                                            vvx[tx.logs[0].address + nftCode].price = priceNft;
                                            var rrw = await writeFileJson(JSON.stringify(vvx));
                                            if(rrw == 'sucess'){
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                mim = data.length +1;
                                                n++;
                                            }else{
                                                nftm(dt)
                                                console.log('\nNFT identified based on required standards in the amount of ' + priceNft + '\n\nContract: ' + smartContract + "\n\nCode: " + nftCode + "\n")
                                                console.log("NFT is priced equal to or greater than the previous price, moving to the next transaction.");
                                                mim = data.length +1;
                                                n++;
                                            }
                                        }else{
                                            console.log("NFT with price lower than the previous value, sending purchase transaction...")
                                            var compra = new web3.eth.Contract(abi.OpenSeaContract, smartContract);
                                            var OrderJSON = {
                                                "exchange": "",
                                                "maker": "",
                                                "taker": "",
                                                "makerRelayerFee": "",
                                                "takerRelayerFee": "",
                                                "makerProtocolFee": "",
                                                "takerProtocolFee": "",
                                                "makerReferrerFee": "",
                                                "feeRecipient": "",
                                                "feeMethod": "",
                                                "side": "",
                                                "saleKind": "",
                                                "target": "",
                                                "howToCall": "",
                                                "calldata": "",
                                                "replacementPattern": "",
                                                "staticTarget": "",
                                                "staticExtradata": "",
                                                "paymentToken": "",
                                              
                                                "quantity": 1,
                                                "basePrice": "",
                                                "englishAuctionReservePrice": "", //string or undefined
                                                "extra": "",
                                              
                                                // createdTime is undefined when order hasn't been posted yet
                                                "createdTime": "",
                                                "listingTime": "",
                                                "expirationTime": Math.round(Date.now() / 1000 + 60 * 60 * 24),
                                              
                                                "salt": "",
                                              
                                                "metadata": "",
                                              
                                                "hash": ""
                                            }
                                            var content = {

                                            }
                                            // compra.methods.atomicMatch_(content).then((s) => {
                                            //     if(s){
                                            //         var dadd = JSON.parse(v)
                                            //         dadd[nftCode].price = priceNft
                                            //         fs.writeFile("./data/history.json", dadd, (err) => {
                                            //             if(err){
                                            //                 console.log(err);
                                            //             }else{
                                            //                 console.log(s)
                                            //                 console.log("Purchase transaction sent successfully for NFT purchase!")
                                            //             }
                                            //         })
                                            //     }
                                            // }, (err) => {
                                            //     if(err){
                                            //         console.log(err)
                                            //     }
                                            // })
                                            mim = data.length +1;
                                            n++;
                                        }
                                    }
                                }else{
                                    mim++;
                                }
                            }
                        }
                    })
                }catch(e){
                    nentx(k,s.transactions[n])
                    n++;
                }
            }else{
                nentx(k,s.transactions[n])
                n++;
            }
       }
    }
}
}

async function writeFileJson(d){
    fs.writeFileSync("./h.json", d, (err,data) => {
        if(err){
            console.log(err)
            return err;
        }else{
            console.log("data: " + data)
            return 'sucess'
        }
    })
}

export {asyncAnalize}
