const nacl = require('tweetnacl');
const bs58 = require('bs58');
const { Keypair } = require('@solana/web3.js');


//Example usage

const testRun = () => {


  nonce = nacl.randomBytes(nacl.box.nonceLength);

  const keyPair = nacl.box.keyPair();
  const publicKeyA = keyPair.publicKey;
  const privateKeyA = keyPair.secretKey;


  const keyPairB = nacl.box.keyPair();
  const publicKeyB = keyPairB.publicKey;
  const privateKeyB = keyPairB.secretKey;

  console.log('Public Key A:', (publicKeyA));
  console.log(typeof publicKeyA)
  console.log('Private Key A:', (privateKeyA));
  console.log(typeof privateKeyA)

  console.log('Public Key B:', (publicKeyB));
  console.log(typeof publicKeyB)
  console.log('Private Key B:', (privateKeyB));
  console.log(typeof privateKeyB)
  console.log('Nonce:', nonce);
  console.log(typeof nonce)



  const message = 'Hello Solana';
  console.log('Message:', message);

  const encryptedMessage = nacl.box(message, nonce, publicKeyB, privateKeyA);
  console.log('Encrypted Message:', encryptedMessage);

  // const decryptedMessage = nacl.box.open(encryptedMessage, nonce, publicKeyA, privateKeyB)
  // console.log('Decrypted Message:', decryptedMessage);
}

testRun();

