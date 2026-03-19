// --- فائل کے شروع میں یہ ویری ایبلز شامل کریں ---
let bodypix;
let segmentation;
const removeBgCheckbox = document.getElementById('remove-bg');
const aiLoader = document.getElementById('ai-loader');

// 1. AI ماڈل لوڈ کرنا (BodyPix)
async function loadAIModel() {
    console.log("AI ماڈل لوڈ ہو رہا ہے...");
    bodypix = await ml5.bodyPix({
        multiplier: 0.75, // اچھی رفتار کے لیے
        outputStride: 16,
        segmentationThreshold: 0.5
    });
    console.log("AI ماڈل تیار ہے!");
}

// صفحہ لوڈ ہوتے ہی ماڈل لوڈ کریں
loadAIModel();

// 2. بیک گراؤنڈ ہٹانے کا فنکشن
async function processAIImage() {
    if (!uploadedImage || !bodypix) return;

    aiLoader.style.display = 'block'; // لوڈنگ دکھائیں
    
    // تصویر کا تجزیہ کریں
    segmentation = await bodypix.segment(uploadedImage);
    
    // کینوس پر صرف 'انسان' کو ڈرا کرنا اور بیک گراؤنڈ کو شفاف (Transparent) کرنا
    renderCanvasWithAI();
    
    aiLoader.style.display = 'none'; // لوڈنگ ختم
}

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
    
    // تصویر کو عارضی طور پر ڈرا کریں
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
    
    // بیک گراؤنڈ رنگ (اگر صارف چاہے تو یہاں رنگ بھر سکتے ہیں)
    ctx.fillStyle = "#ffffff"; // ڈیفالٹ سفید بیک گراؤنڈ
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(tempCanvas, x, y, uploadedImage.width * scale, uploadedImage.height * scale);

    // فریم دوبارہ لگائیں
    drawFrame();
}

function drawFrame() {
    ctx.strokeStyle = document.getElementById('border-color').value;
    ctx.lineWidth = currentSize * 0.05;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// 3. جب صارف چیک باکس پر کلک کرے
removeBgCheckbox.addEventListener('change', function() {
    if (this.checked) {
        processAIImage();
    } else {
        renderCanvas(); // اصل تصویر پر واپس جائیں
    }
});
