async function generateKey(secretKey) {
    const encodedKey = new TextEncoder().encode(secretKey.padEnd(16, ' '));
    return window.crypto.subtle.importKey(
        'raw',
        encodedKey,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    );
}

async function encryptMessage(message, key) {
    const encodedMessage = new TextEncoder().encode(message);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        encodedMessage
    );

    return { encryptedData, iv };
}

async function decryptMessage(encryptedData, iv, key) {
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        encryptedData
    );

    return new TextDecoder().decode(decryptedData);
}

(async () => {
    try {
        // 16 Character secret key
        const secretKey = 'MySecretKey12345';
        const key = await generateKey(secretKey);
        const message = 'It's a secret to everyone!';

        const { encryptedData, iv } = await encryptMessage(message, key);
        console.log('Encrypted Data:', encryptedData);

        const decryptedMessage = await decryptMessage(encryptedData, iv, key);
        console.log('Decrypted Message:', decryptedMessage);
    } catch (error) {
        console.error('Encryption / Decryption error:', error);
    }
})();
