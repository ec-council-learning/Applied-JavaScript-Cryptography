function hashData(data) {
    return CryptoJS.SHA256(data).toString();
}

// Example usage
const originalData = 'Shhhhh!';
const hashedData = hashData(originalData);

console.log('Original Data:', originalData);
console.log('Hashed Data:', hashedData);
