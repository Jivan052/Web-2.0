// script.js
function generateQRCode() {
    const link = document.getElementById('link').value;
    const qrcodeContainer = document.getElementById('qrcode');
    const emoji = document.getElementById('emoji');
    qrcodeContainer.innerHTML = ''; 
    emoji.innerHTML = ''; 

    new QRCode(qrcodeContainer, link);
}
