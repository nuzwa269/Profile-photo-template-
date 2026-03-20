<div id="ppt-app" class="ppt-app">
	<aside class="ppt-sidebar">
		<div class="ppt-panel ppt-brand-panel">
			<div class="ppt-brand">
				<div class="ppt-brand__icon">P</div>
				<div class="ppt-brand__text">
					<h2>Profile Photo Editor</h2>
					<p>Create polished profile images for social platforms.</p>
				</div>
			</div>
		</div>

		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Upload</h3>
				<span class="ppt-badge">Step 1</span>
			</div>

			<div class="ppt-upload-box" id="ppt-upload-box">
				<input type="file" id="ppt-file-input" class="ppt-hidden-input" accept="image/*" />
				<button type="button" class="ppt-btn ppt-btn--primary" id="ppt-upload-trigger">
					Upload Image
				</button>
				<p class="ppt-upload-help">Drag & drop or choose a JPG, PNG, or WebP image.</p>
			</div>
		</div>

		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Aspect Ratio</h3>
				<span class="ppt-badge">Step 2</span>
			</div>

			<div class="ppt-ratio-grid">
				<button type="button" class="ppt-chip is-active" data-ratio="1:1">1:1</button>
				<button type="button" class="ppt-chip" data-ratio="4:5">4:5</button>
				<button type="button" class="ppt-chip" data-ratio="3:4">3:4</button>
				<button type="button" class="ppt-chip" data-ratio="16:9">16:9</button>
				<button type="button" class="ppt-chip" data-ratio="9:16">9:16</button>
				<button type="button" class="ppt-chip" data-ratio="custom">Custom</button>
			</div>
		</div>

		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Crop Controls</h3>
				<span class="ppt-badge">Step 3</span>
			</div>

			<div class="ppt-control-group">
				<label for="ppt-zoom-range">Zoom</label>
				<input type="range" id="ppt-zoom-range" min="1" max="3" step="0.01" value="1" />
			</div>

			<div class="ppt-control-actions">
				<button type="button" class="ppt-btn ppt-btn--secondary">Fit</button>
				<button type="button" class="ppt-btn ppt-btn--secondary">Fill</button>
				<button type="button" class="ppt-btn ppt-btn--ghost">Reset</button>
			</div>
		</div>

		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Background</h3>
				<span class="ppt-badge">Step 4</span>
			</div>

			<label class="ppt-toggle">
				<input type="checkbox" id="ppt-remove-bg" />
				<span>Remove Background</span>
			</label>

			<div class="ppt-control-group">
				<label for="ppt-bg-color">Background Color</label>
				<input type="color" id="ppt-bg-color" value="#ffffff" />
			</div>
		</div>

		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Frame</h3>
				<span class="ppt-badge">Step 5</span>
			</div>

			<div class="ppt-control-group">
				<label for="ppt-frame-color">Frame Color</label>
				<input type="color" id="ppt-frame-color" value="#7c3aed" />
			</div>

			<div class="ppt-control-group">
				<label for="ppt-frame-width">Frame Width</label>
				<input type="range" id="ppt-frame-width" min="0" max="40" step="1" value="8" />
			</div>

			<div class="ppt-shape-grid">
				<button type="button" class="ppt-chip is-active" data-shape="square">Square</button>
				<button type="button" class="ppt-chip" data-shape="rounded">Rounded</button>
				<button type="button" class="ppt-chip" data-shape="circle">Circle</button>
			</div>
		</div>
	</aside>

	<main class="ppt-workspace">
		<div class="ppt-workspace__header">
			<div>
				<h1>Profile Photo Workspace</h1>
				<p>Upload an image and prepare it for social profile use.</p>
			</div>

			<div class="ppt-workspace__meta">
				<span class="ppt-status" id="ppt-status-text">No image uploaded</span>
			</div>
		</div>

		<div class="ppt-canvas-stage" id="ppt-drop-zone">
			<div class="ppt-empty-state" id="ppt-empty-state">
				<div class="ppt-empty-state__icon">🖼️</div>
				<h3>Drop your image here</h3>
				<p>Supports JPG, PNG, and WebP. Recommended portrait photos.</p>
				<button type="button" class="ppt-btn ppt-btn--primary" id="ppt-empty-upload-btn">
					Choose Image
				</button>
			</div>

			<div class="ppt-preview-shell" id="ppt-preview-shell" style="display: none;">
				<div class="ppt-preview-toolbar">
					<span class="ppt-preview-toolbar__item">Live Preview</span>
					<span class="ppt-preview-toolbar__item" id="ppt-preview-ratio-label">Ratio: 1:1</span>
				</div>

				<div class="ppt-preview-frame">
					<canvas id="ppt-preview-canvas"></canvas>
				</div>
			</div>
		</div>

		<div class="ppt-bottom-panels">
			<div class="ppt-panel">
				<div class="ppt-panel__header">
					<h3>Image Positioning</h3>
				</div>
				<p>Drag support, face alignment, and crop interaction will be wired in the next step.</p>
			</div>

			<div class="ppt-panel">
				<div class="ppt-panel__header">
					<h3>Background Processing</h3>
				</div>
				<p>AI segmentation and mask refinement will be connected after the editor shell is complete.</p>
			</div>
		</div>
	</main>

	<aside class="ppt-export">
		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Export</h3>
				<span class="ppt-badge">Step 6</span>
			</div>

			<div class="ppt-control-group">
				<label for="ppt-export-format">Format</label>
				<select id="ppt-export-format">
					<option value="png">PNG</option>
					<option value="jpg">JPG</option>
					<option value="webp">WebP</option>
				</select>
			</div>

			<div class="ppt-control-group">
				<label for="ppt-export-size">Resolution</label>
				<select id="ppt-export-size">
					<option value="512">512 x 512</option>
					<option value="1024">1024 x 1024</option>
					<option value="1080" selected>1080 x 1080</option>
					<option value="2048">2048 x 2048</option>
				</select>
			</div>

			<div class="ppt-control-group">
				<label for="ppt-export-quality">Quality</label>
				<input type="range" id="ppt-export-quality" min="0.1" max="1" step="0.01" value="0.92" />
			</div>

			<button type="button" class="ppt-btn ppt-btn--primary ppt-btn--block" id="ppt-download-btn" disabled>
				Download Image
			</button>
		</div>

		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Output Summary</h3>
			</div>

			<ul class="ppt-summary-list">
				<li><strong>Status:</strong> <span id="ppt-summary-status">Waiting for upload</span></li>
				<li><strong>Ratio:</strong> <span id="ppt-summary-ratio">1:1</span></li>
				<li><strong>Background:</strong> <span id="ppt-summary-background">Original</span></li>
				<li><strong>Frame:</strong> <span id="ppt-summary-frame">Enabled</span></li>
			</ul>
		</div>

		<div class="ppt-panel">
			<div class="ppt-panel__header">
				<h3>Tips</h3>
			</div>

			<ul class="ppt-tips-list">
				<li>Use a portrait image with clear lighting.</li>
				<li>For profile photos, 1:1 is usually best.</li>
				<li>Transparent PNG is ideal for custom branding.</li>
				<li>Use higher frame width for bold profile styles.</li>
			</ul>
		</div>
	</aside>
</div>
