document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const canvas = document.getElementById('preview-canvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('download-btn');
    const uploadPrompt = document.getElementById('upload-prompt');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const borderColorInput = document.getElementById('border-color');
    const removeBgCheckbox = document.getElementById('remove-bg');
    const aiLoader = document.getElementById('ai-loader');

    let uploadedImage = null;
    let currentSize = 1080; // Default size (Instagram)
    let bodypix = null;
    let segmentation = null;

    // Load AI model on page load
    async function loadAIModel() {
        try {
            bodypix = await ml5.bodyPix({
                multiplier: 0.75,
                outputStride: 16,
                segmentationThreshold: 0.5
            });
            console.log("AI Model loaded successfully!");
        } catch (error) {
            console.error("Error loading AI model:", error);
        }
    }
    loadAIModel();

    // 1. کلک کرنے پر فائل سلیکٹر کھولنا
    dropZone.addEventListener('click', () => fileInput.click());

    // 2. فائل اپ لوڈ ہونے پر ہینڈل کرنا
    fileInput.addEventListener('change', handleFile);

    // 3. ڈریگ اینڈ ڈراپ سپورٹ
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#27ae60';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#3498db';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFile({ target: fileInput });
        }
    });

    function handleFile(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedImage = new Image();
                uploadedImage.onload = function() {
                    renderCanvas();
                    enableTool();
                };
                uploadedImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // 4. کینوس پر تصویر بنانا اور ری سائز کرنا
    function renderCanvas() {
        if (!uploadedImage) return;

        // کینوس کا سائز سیٹ کرنا
        canvas.width = currentSize;
        canvas.height = currentSize;
        canvas.style.display = 'block';
        uploadPrompt.style.display = 'none';

        // بیک گراؤنڈ صاف کرنا
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // تصویر کو کینوس کے مطابق "Center Crop" کرنا
        const scale = Math.max(canvas.width / uploadedImage.width, canvas.height / uploadedImage.height);
        const x = (canvas.width / 2) - (uploadedImage.width / 2) * scale;
        const y = (canvas.height / 2) - (uploadedImage.height / 2) * scale;
        
        ctx.drawImage(uploadedImage, x, y, uploadedImage.width * scale, uploadedImage.height * scale);

        // بارڈر/فریم شامل کرنا
        ctx.strokeStyle = borderColorInput.value;
        ctx.lineWidth = currentSize * 0.05; // 5% border
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    // 5. پلیٹ فارم کے بٹنز پر کلک کرنا
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => {
                b.style.background = '#eee';
                b.style.color = '#333';
                b.classList.remove('active');
            });
            this.style.background = '#3498db';
            this.style.color = 'white';
            this.classList.add('active');

            const sizeStr = this.getAttribute('data-size');
            currentSize = parseInt(sizeStr.split('x')[0]);
            renderCanvas();
        });
    });

    // 6. رنگ تبدیل ہونے پر کینوس اپ ڈیٹ کرنا
    borderColorInput.addEventListener('input', renderCanvas);

    // 7. بیک گراؤنڈ ریموول
    removeBgCheckbox.addEventListener('change', async function() {
        if (this.checked && uploadedImage && bodypix) {
            aiLoader.style.display = 'block';
            try {
                segmentation = await bodypix.segment(uploadedImage);
                renderCanvasWithAI();
            } catch (error) {
                console.error("AI Processing error:", error);
            }
            aiLoader.style.display = 'none';
        } else {
            renderCanvas();
        }
    });

    function renderCanvasWithAI() {
        if (!segmentation) return;

        canvas.width = currentSize;
        canvas.height = currentSize;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // عارضی کینوس پر ماسک بنانا
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = uploadedImage.width;
        tempCanvas.height = uploadedImage.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCtx.drawImage(uploadedImage, 0, 0);
        
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const pixels = imageData.data;

        // AI ماسک کے مطابق پکسلز کو شفاف کرنا
        for (let i = 0; i < segmentation.data.length; i++) {
            if (segmentation.data[i] === 0) { // اگر یہ بیک گراؤنڈ ہے
                pixels[i * 4 + 3] = 0; // Alpha (شفافیت) کو زیرو کر دیں
            }
        }

        tempCtx.putImageData(imageData, 0, 0);

        // اب شفاف تصویر کو مین کینوس پر سینٹر کر کے ڈرا کریں
        const scale = Math.max(canvas.width / uploadedImage.width, canvas.height / uploadedImage.height);
        const x = (canvas.width / 2) - (uploadedImage.width / 2) * scale;
        const y = (canvas.height / 2) - (uploadedImage.height / 2) * scale;
        
        ctx.fillStyle = "#ffffff"; // ڈیفالٹ سفید بیک گراؤنڈ
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(tempCanvas, x, y, uploadedImage.width * scale, uploadedImage.height * scale);

        // فریم دوبارہ لگائیں
        ctx.strokeStyle = borderColorInput.value;
        ctx.lineWidth = currentSize * 0.05;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    // 8. ٹول کو فعال کرنا
    function enableTool() {
        downloadBtn.disabled = false;
        downloadBtn.style.cursor = 'pointer';
        downloadBtn.style.opacity = '1';
    }

    // 9. تصویر ڈاؤن لوڈ کرنا
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = `profile-photo-${currentSize}x${currentSize}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
