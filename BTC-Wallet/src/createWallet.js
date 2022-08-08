//importando as dependencias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//define a rede
//testnet = rede de teste
//bitcoin = rede principal
const network = bitcoin.networks.testnet;

/*A carteira que iremos criar neste projeto será do tipo (deterministico) onde outras
carteiras podem derivar de uma principal.
*/
//derivação de carteiras HD
//Obs: quando utilizamos o `m/49'/1'/1'/0` é main net o contrário é o testnet.
const path = `m/49'/1'/0'/0`;

//Criadno o minemonico (Seed)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//Criando a conta que ira gerar a raiz que as novas carteiras serão derivadas.
let account = root.derivePath(path);

//Gerando uma conta nó que é gerada a partir  da raiz em que sempre que uma nova é criada e derivadas do nó raiz.
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada");
console.log("Endereço", btcAddress);
/*toWIF = Wallet Import Format ele formata a chave privada par que possa então ser realizado a importação 
para um sistema gerador de carteiras que no caso estamos utilizando o Elecrtrum.*/

console.log("Chave privada", node.toWIF());
console.log("Seed", mnemonic);