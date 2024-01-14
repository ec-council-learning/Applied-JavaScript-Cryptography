document.getElementById('encryptButton').addEventListener('click', () => processFile(true));
document.getElementById('decryptButton').addEventListener('click', () => processFile(false));

let globalKey; // To store the generated key globally

async function processFile(isEncrypting) {
    const fileInput = isEncrypting ? document.getElementById('fileInput') : document.getElementById('encryptedFileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    try {
        if (isEncrypting && !globalKey) {
            globalKey = await generateKey();
        }
        const fileData = await readFile(file);
        const processedData = isEncrypting ? await encryptData(fileData, globalKey) : await decryptData(fileData, globalKey);
        if (isEncrypting) {
            downloadFile(processedData, file.name + '.encrypted', 'application/octet-stream');
        } else {
            const originalName = file.name.replace('.encrypted', '');
            downloadFile(processedData, 'decrypted_' + originalName, file.type);
        }
    } catch (error) {
        console.error('Error processing file:', error);
        alert('Error processing file.');
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

function downloadFile(data, fileName, fileType) {
    const blob = new Blob([data], { type: fileType });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

async function generateKey() {
    const key = await window.crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        },
        true, // Whether the key is extractable
        ['encrypt', 'decrypt']
    );
    return key;
}

async function encryptData(data, key) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        data
    );
    return new Uint8Array([...iv, ...new Uint8Array(encryptedData)]);
}

async function decryptData(data, key) {
    const iv = data.slice(0, 12);
    const encryptedData = data.slice(12);
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        encryptedData
    );
return new Uint8Array(decryptedData);
}