// script.js
function generateQRCode() {
    const link = document.getElementById('link').value;
    const qrcodeContainer = document.getElementById('qrcode');
    const emoji = document.getElementById('emoji');
    qrcodeContainer.innerHTML = ''; // Clear previous QR code
    emoji.innerHTML = ''; // Clear previous emoji

    new QRCode(qrcodeContainer, link);
}