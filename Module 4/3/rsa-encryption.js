const encryptor = new JSEncrypt({default_key_size: 2048});
encryptor.getKey();

const publicKey = encryptor.getPublicKey();
const privateKey = encryptor.getPrivateKey();

function encryptMessage(message) {
    encryptor.setPublicKey(publicKey);
    return encryptor.encrypt(message);
}

function decryptMessage(encryptedMessage) {
    encryptor.setPrivateKey(privateKey);
    return encryptor.decrypt(encryptedMessage);
}

// Example usage
const originalMessage = 'Secret message!!!';
const encryptedMessage = encryptMessage(originalMessage);
console.log('Encrypted Message:', encryptedMessage);

const decryptedMessage = decryptMessage(encryptedMessage);
console.log('Decrypted Message:', decryptedMessage);
