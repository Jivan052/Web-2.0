// script.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageInput = document.getElementById('imageInput');
    const stickerLayer = document.getElementById('stickerLayer');
    
    let currentImage = null;
    let currentFilter = 'normal';
    const adjustments = {
        brightness: 0,
        contrast: 0,
        saturation: 0
    };

    // Image upload handling
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    currentImage = img;
                    resetCanvas();
                    applyFilters();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Filter application
    function applyFilters() {
        if (!currentImage) return;

        canvas.width = currentImage.width;
        canvas.height = currentImage.height;
        ctx.filter = `
            brightness(${100 + adjustments.brightness}%)
            contrast(${100 + adjustments.contrast}%)
            saturate(${100 + adjustments.saturation}%)
        `;

        ctx.drawImage(currentImage, 0, 0);

        // Apply Instagram-like filters
        switch(currentFilter) {
            case 'clarendon':
                ctx.globalCompositeOperation = 'overlay';
                ctx.fillStyle = 'rgba(127, 187, 227, 0.2)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                break;
            case 'gingham':
                ctx.globalCompositeOperation = 'soft-light';
                ctx.fillStyle = 'rgba(230, 230, 230, 0.5)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                break;
            case 'moon':
                ctx.globalCompositeOperation = 'hard-light';
                ctx.fillStyle = 'rgba(160, 160, 160, 0.6)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                break;
        }
    }

    // Sticker handling
    document.querySelectorAll('.sticker').forEach(sticker => {
        sticker.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.innerHTML);
        });
    });

    stickerLayer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    stickerLayer.addEventListener('drop', (e) => {
        e.preventDefault();
        const stickerContent = e.dataTransfer.getData('text/plain');
        const stickerElement = document.createElement('div');
        stickerElement.className = 'placed-sticker';
        stickerElement.innerHTML = stickerContent;
        stickerElement.style.left = `${e.offsetX}px`;
        stickerElement.style.top = `${e.offsetY}px`;
        stickerLayer.appendChild(stickerElement);
        makeStickerDraggable(stickerElement);
    });

    function makeStickerDraggable(element) {
        let pos = { x: 0, y: 0 };
        
        element.addEventListener('mousedown', dragStart);

        function dragStart(e) {
            pos = {
                x: e.clientX - element.offsetLeft,
                y: e.clientY - element.offsetTop
            };
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        }

        function drag(e) {
            element.style.left = `${e.clientX - pos.x}px`;
            element.style.top = `${e.clientY - pos.y}px`;
        }

        function dragEnd() {
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', dragEnd);
        }
    }

    // Event listeners for adjustments
    document.querySelectorAll('input[type="range"]').forEach(input => {
        input.addEventListener('input', (e) => {
            adjustments[e.target.id] = parseInt(e.target.value);
            applyFilters();
        });
    });

    // Save functionality
    document.getElementById('saveBtn').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'filtered-image.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Share functionality
    document.getElementById('shareBtn').addEventListener('click', async () => {
        try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve));
            const file = new File([blob], 'filtered-image.png', { type: 'image/png' });
            await navigator.share({
                files: [file],
                title: 'Filtered Image',
            });
        } catch (err) {
            console.error('Error sharing:', err);
        }
    });
});