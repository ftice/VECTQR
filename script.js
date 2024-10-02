async function generateQRCode() {
    const url = document.getElementById('urlInput').value;
    const qrCodeDiv = document.getElementById('qrCode');
    const downloadButton = document.getElementById('downloadButton');
    
    if (url.trim() !== '') {
        qrCodeDiv.innerHTML = ''; // Clear previous QR code
        
        try {
            const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`);
            const blob = await response.blob();
            
            const img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            
            qrCodeDiv.appendChild(img);
            downloadButton.disabled = false; // Enable download button
            
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    }
}

function downloadSVG() {
    const qrCodeImg = document.querySelector('#qrCode img');
    
    if (qrCodeImg) {
        const a = document.createElement('a');
        a.href = qrCodeImg.src;
        a.download = 'qrcode.svg';
        a.click();
        console.log('SVG downloaded.');
    } else {
        alert('Please generate a QR code first!');
        console.log('No QR code available for download.');
    }
}

function clearQRCode() {
    const qrCodeDiv = document.getElementById('qrCode');
    const urlInput = document.getElementById('urlInput');
    const downloadButton = document.getElementById('downloadButton');
    
    // Clear input
    urlInput.value = '';
    
    // Clear QR code
    qrCodeDiv.innerHTML = '<i class="fa-solid fa-code"></i>';
    
    // Disable download button
    downloadButton.disabled = true;
}