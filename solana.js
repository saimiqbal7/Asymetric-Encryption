const nacl = require('tweetnacl');
const bs58 = require('bs58');

// Generate a new key pair
const generateKeyPair = () => {
  const keyPair = nacl.sign.keyPair();
  const publicKey = bs58.encode(keyPair.publicKey);
  const privateKey = bs58.encode(keyPair.secretKey);
  return { publicKey, privateKey };
};

// Sign a message with a private key
const signMessage = (message, privateKey) => {
  const secretKey = bs58.decode(privateKey);
  const messageBytes = Buffer.from(message, 'utf-8');
  const signatureBytes = nacl.sign.detached(messageBytes, secretKey);
  const signature = bs58.encode(signatureBytes);
  return signature;
};

// Verify the signature of a message with a public key
const verifySignature = (message, signature, publicKey) => {
  const publicKeyBytes = bs58.decode(publicKey);
  const messageBytes = Buffer.from(message, 'utf-8');
  const signatureBytes = bs58.decode(signature);
  const isVerified = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  return isVerified;
};

// Example usage
const testRun = () => {
  const { publicKey, privateKey } = generateKeyPair();

  const message = 'Hello Solana';
  console.log('Message:', message);

  const signature = signMessage(message, privateKey);
  console.log('Signature:', signature);

  const isVerified = verifySignature(message, signature, publicKey);
  console.log('Verified:', isVerified);
};

testRun();
