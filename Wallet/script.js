// script.js
document.addEventListener('DOMContentLoaded', () => {
    const generateWalletBtn = document.getElementById('generateWallet');
    const walletDetails = document.getElementById('walletDetails');
    const privateKeySpan = document.getElementById('privateKey');
    const publicKeySpan = document.getElementById('publicKey');
    const walletAddressSpan = document.getElementById('walletAddress');

    generateWalletBtn.addEventListener('click', () => {
        // Simulate wallet generation
        const privateKey = '0x' + Math.random().toString(36).substring(2);
        const publicKey = '0x' + Math.random().toString(36).substring(2);
        const walletAddress = '0x' + Math.random().toString(36).substring(2);

        privateKeySpan.textContent = privateKey;
        publicKeySpan.textContent = publicKey;
        walletAddressSpan.textContent = walletAddress;

        walletDetails.classList.remove('hidden');
        walletDetails.classList.add('visible');
    });
});