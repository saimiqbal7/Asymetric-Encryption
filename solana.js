const nacl = require('tweetnacl');
const bs58 = require('bs58');
const { Keypair } = require('@solana/web3.js');

// Generate a new key pair
const generateKeyPair = () => {
  const keyPair = nacl.box.keyPair();
  const publicKey = bs58.encode(keyPair.publicKey);
  const privateKey = bs58.encode(keyPair.secretKey);
  return { publicKey, privateKey };
};

// Encrypt a message with the recipient's public key
const encryptMessage = (message, recipientPublicKey, senderPrivateKey) => {
  const recipientPublicKeyBytes = bs58.decode(recipientPublicKey);
  const senderPrivateKeyBytes = bs58.decode(senderPrivateKey);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  
  const messageBytes = Buffer.from(message, 'utf-8');
  const encryptedBytes = nacl.box(messageBytes, nonce, recipientPublicKeyBytes, senderPrivateKeyBytes);
  const encryptedMessage = bs58.encode(nonce) + bs58.encode(encryptedBytes);
  return encryptedMessage;
};

// Decrypt a message with the recipient's private key and sender's public key
const decryptMessage = (encryptedMessage, recipientPrivateKey, senderPublicKey) => {
  const recipientPrivateKeyBytes = bs58.decode(recipientPrivateKey);
  const senderPublicKeyBytes = bs58.decode(senderPublicKey);
  const nonce = bs58.decode(encryptedMessage.slice(0, bs58.decode('A').length));
  const encryptedBytes = bs58.decode(encryptedMessage.slice(bs58.decode('A').length));
  const decryptedBytes = nacl.box.open(encryptedBytes, nonce, senderPublicKeyBytes, recipientPrivateKeyBytes);
  if (!decryptedBytes) {
    throw new Error('Unable to decrypt message. Invalid key or ciphertext.');
  }
  const decryptedMessage = Buffer.from(decryptedBytes).toString('utf-8');
  return decryptedMessage;
};

// Example usage
const testRun = () => {
  const { publicKey: publicKeyA, privateKey: privateKeyA } = generateKeyPair();
  const { publicKey: publicKeyB, privateKey: privateKeyB } = generateKeyPair();

  const message = 'Hello Solana';
  console.log('Message:', message);

  const encryptedMessage = encryptMessage(message, publicKeyB, privateKeyA);
  console.log('Encrypted Message:', encryptedMessage);

  const decryptedMessage = decryptMessage(encryptedMessage, privateKeyB, publicKeyA);
  console.log('Decrypted Message:', decryptedMessage);
};

testRun();
