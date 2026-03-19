<div class="ai-tool-wrapper" style="max-width: 800px; margin: 20px auto; background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
        <h3>AI Profile Photo Maker</h3>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
        <div id="drop-zone" style="flex: 1; min-width: 300px; height: 350px; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
            <input type="file" id="file-input" style="display: none;" accept="image/*">
            <div id="upload-prompt">📸 تصویر یہاں لائیں</div>
            <canvas id="preview-canvas" style="display: none; max-width: 100%; height: auto;"></canvas>
        </div>

        <div style="flex: 1; min-width: 250px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
            <p><strong>سوشل میڈیا سائز:</strong></p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                <button class="size-btn" data-size="1080x1080">Instagram</button>
                <button class="size-btn" data-size="400x400">LinkedIn</button>
            </div>
            
            <hr style="margin: 15px 0;">
            <label><input type="checkbox" id="remove-bg"> بیک گراؤنڈ ختم کریں (AI)</label>
            <br><br>
            <button id="download-btn" disabled style="width: 100%; padding: 10px; background: #27ae60; color: #fff; border: none; cursor: pointer;">ڈاؤن لوڈ کریں</button>
        </div>
    </div>
    <div id="ai-loader" style="display: none; text-align: center; margin-top: 10px; color: blue;">AI کام کر رہا ہے...</div>
</div>
