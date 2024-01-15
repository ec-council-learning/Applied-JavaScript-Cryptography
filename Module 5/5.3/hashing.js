document.getElementById('md5Button').addEventListener('click', () => hashText('MD5'));
document.getElementById('shaButton').addEventListener('click', () => hashText('SHA-256'));

async function hashText(algorithm) {
    const text = document.getElementById('textInput').value;
    let hashedText;

    if (algorithm === 'MD5') {
        hashedText = md5(text);
    } else if (algorithm === 'SHA-256') {
        hashedText = await hashWithSHA256(text);
    }

    document.getElementById('hashOutput').textContent = `Hashed with ${algorithm}: ${hashedText}`;
}

async function hashWithSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
}

function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
