
var inicial = {
    name: "rpc",
    type: "input",
    message: "Write your Ethereum network JSON-RPC API url below to get started.",
}

var key = {
    name: "seed",
    type: "input",
    message: "Write your private key to continue",
}
 
var slug = {
    name: "slug",
    type: "input",
    message: "Write the name of each slug collection you want to monitor, separating each with a comma ( , ). Example: 3Landers, CryptoPunks, Azuki",
}

var exist = (l) => {
    var x = {
    name: 'exist',
    type: 'list',
    message: l,
    choices: ["Yes", "No"],
    default: "No"
    }
    return x;
}

export {inicial,key,slug,exist};