<div class="ai-tool-container" style="max-width: 800px; margin: 40px auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fff; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #eee;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #333; margin-bottom: 10px;">AI Profile Photo Maker</h2>
        <p style="color: #666;">اپنی تصویر اپ لوڈ کریں اور اسے سوشل میڈیا کے لیے تیار کریں</p>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 30px; justify-content: center;">
        
        <!-- Upload & Preview Area -->
        <div style="flex: 1; min-width: 300px;">
            <div id="drop-zone" style="width: 100%; height: 350px; border: 2px dashed #3498db; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; position: relative; overflow: hidden; background: #f9fbfd;">
                <input type="file" id="file-input" style="display: none;" accept="image/*">
                
                <div id="upload-prompt" style="text-align: center; color: #3498db;">
                    <span style="font-size: 50px;">📸</span>
                    <p style="margin-top: 15px; font-weight: bold;">تصویر یہاں ڈریگ کریں یا کلک کریں</p>
                </div>
                
                <!-- Canvas for Preview -->
                <canvas id="preview-canvas" style="display: none; max-width: 100%; height: auto; border-radius: 5px;"></canvas>
            </div>
        </div>

        <!-- Controls Area -->
        <div style="flex: 1; min-width: 250px; background: #fdfdfd; padding: 20px; border-radius: 10px; border: 1px solid #f0f0f0;">
            <h4 style="margin-top: 0; color: #444;">1. پلیٹ فارم منتخب کریں</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px;">
                <button class="size-btn active" data-size="1080x1080" style="padding: 10px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">Instagram</button>
                <button class="size-btn" data-size="400x400" style="padding: 10px; background: #eee; color: #333; border: none; border-radius: 5px; cursor: pointer;">LinkedIn</button>
                <button class="size-btn" data-size="500x500" style="padding: 10px; background: #eee; color: #333; border: none; border-radius: 5px; cursor: pointer;">Twitter (X)</button>
                <button class="size-btn" data-size="800x800" style="padding: 10px; background: #eee; color: #333; border: none; border-radius: 5px; cursor: pointer;">Facebook</button>
            </div>

            <h4 style="color: #444;">2. اے آئی سیٹنگز</h4>
            <div style="margin-bottom: 25px;">
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="checkbox" id="remove-bg" style="margin-right: 10px;"> بیک گراؤنڈ ختم کریں (AI)
                </label>
                <div style="margin-top: 10px;">
                    <label style="display: block; margin-bottom: 5px;">فریم کا رنگ:</label>
                    <input type="color" id="border-color" value="#3498db" style="width: 100%; height: 30px; border: none; cursor: pointer;">
                </div>
            </div>

            <button id="download-btn" disabled style="width: 100%; padding: 15px; background: #27ae60; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: not-allowed; opacity: 0.6;">
                فوٹو ڈاؤن لوڈ کریں ✨
            </button>
        </div>

    </div>

    <!-- AI Loading Spinner (Hidden by default) -->
    <div id="ai-loader" style="display: none; text-align: center; margin-top: 20px; color: #3498db;">
        <p>AI آپ کی تصویر پر کام کر رہا ہے، براہ کرم انتظار کریں...</p>
    </div>
</div>
