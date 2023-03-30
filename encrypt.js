const crypto = require('crypto'); 

// Encrypt a message with a public key
const encrypt = (message, publicKey) => {

    const buffer = Buffer.from(message, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');

}

// Decrypt a message with a private key
const decrypt = (encrypted, privateKey) => {
    
        const buffer = Buffer.from(encrypted, 'base64');
        const decrypted = crypto.privateDecrypt(privateKey, buffer);
        return decrypted.toString('utf8');
    
}


// Sign a message with a private key
const sign = (message, privateKey) => {
    const sign = crypto.createSign('SHA256');
    sign.write(message);
    sign.end();
    const signature = sign.sign(privateKey, 'base64');
    return signature;
  }
  
// Verify the signature of a message with a public key
  const verify = (message, signature, publicKey) => {
    const verify = crypto.createVerify('SHA256');
    verify.write(message);
    verify.end();
    const isVerified = verify.verify(publicKey, signature, 'base64');
    return isVerified;
  }

const testRun = () => {


    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    const message = 'Hello World';
    console.log('Message:', message);
    const encrypted = encrypt(message, publicKey);
    console.log('Encrypted:', encrypted);
    const decrypted = decrypt(encrypted, privateKey);
    console.log('Decrypted:', decrypted);
    //sign and verify
    const signature = sign(message, privateKey);
    console.log('Signature:', signature);
    const isVerified = verify(message, signature, publicKey);
    console.log('Verified:', isVerified);

}

testRun();

module.exports = {
  encrypt,
  decrypt,
  sign,
  verify,
};