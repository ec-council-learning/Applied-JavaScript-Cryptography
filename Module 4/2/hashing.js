function hashData(data, secretKey) {
    // Make sure secret key is 16 chars long
    const paddedKey = secretKey.padEnd(16, ' ');
    const key = CryptoJS.enc.Utf8.parse(paddedKey);

    // Combine the key with the data
    const combinedData = key + data;

    // Hash the combined data
    return CryptoJS.SHA256(combinedData).toString();
}


const secretKey = 'MySecretKey12345'; // 16 chars
const originalData = 'Secret message!';
const hashedData = hashData(originalData, secretKey);

console.log('Original Data:', originalData);
console.log('Hashed Data:', hashedData);
