document.getElementById('generateHmacButton').addEventListener('click', generateHMAC);

function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

async function generateHMAC() {
    const message = document.getElementById('messageInput').value;
    const key = document.getElementById('keyInput').value;

    try {
        const hmac = await hmacDigest('SHA-256', key, message);
        document.getElementById('hmacOutput').textContent = `HMAC: ${hmac}`;
    } catch (error) {
        console.error('HMAC generation error:', error);
        alert('Error generating HMAC.');
    }
}

async function hmacDigest(algo, key, data) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const messageData = encoder.encode(data);

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw', keyData, { name: 'HMAC', hash: { name: algo } }, false, ['sign']
    );

    const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, messageData);
    return bufferToHex(signature);
}