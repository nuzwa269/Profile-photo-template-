document.addEventListener('DOMContentLoaded', function () {
	const app = document.getElementById('ppt-app');

	if (!app) {
		return;
	}

	const fileInput = document.getElementById('ppt-file-input');
	const uploadTrigger = document.getElementById('ppt-upload-trigger');
	const emptyUploadBtn = document.getElementById('ppt-empty-upload-btn');
	const dropZone = document.getElementById('ppt-drop-zone');
	const emptyState = document.getElementById('ppt-empty-state');
	const previewShell = document.getElementById('ppt-preview-shell');
	const previewCanvas = document.getElementById('ppt-preview-canvas');
	const previewRatioLabel = document.getElementById('ppt-preview-ratio-label');
	const statusText = document.getElementById('ppt-status-text');
	const summaryStatus = document.getElementById('ppt-summary-status');
	const summaryRatio = document.getElementById('ppt-summary-ratio');
	const summaryBackground = document.getElementById('ppt-summary-background');
	const summaryFrame = document.getElementById('ppt-summary-frame');
	const downloadBtn = document.getElementById('ppt-download-btn');
	const ratioButtons = document.querySelectorAll('[data-ratio]');
	const removeBgCheckbox = document.getElementById('ppt-remove-bg');
	const frameColorInput = document.getElementById('ppt-frame-color');
	const frameWidthInput = document.getElementById('ppt-frame-width');
	const bgColorInput = document.getElementById('ppt-bg-color');

	const ctx = previewCanvas.getContext('2d');

	const state = {
		image: null,
		imageName: '',
		selectedRatio: '1:1',
		frameColor: frameColorInput ? frameColorInput.value : '#7c3aed',
		frameWidth: frameWidthInput ? parseInt(frameWidthInput.value, 10) : 8,
		backgroundRemoved: false,
		backgroundColor: bgColorInput ? bgColorInput.value : '#ffffff'
	};

	const ratioMap = {
		'1:1': { width: 1080, height: 1080 },
		'4:5': { width: 1080, height: 1350 },
		'3:4': { width: 1080, height: 1440 },
		'16:9': { width: 1600, height: 900 },
		'9:16': { width: 900, height: 1600 },
		custom: { width: 1080, height: 1080 }
	};

	function getRatioDimensions(ratio) {
		return ratioMap[ratio] || ratioMap['1:1'];
	}

	function updateSummary() {
		summaryRatio.textContent = state.selectedRatio;
		summaryBackground.textContent = state.backgroundRemoved ? 'Removed (placeholder)' : 'Original';
		summaryFrame.textContent = state.frameWidth > 0 ? `Enabled (${state.frameWidth}px)` : 'Disabled';
		summaryStatus.textContent = state.image ? `Loaded: ${state.imageName}` : 'Waiting for upload';
		statusText.textContent = state.image ? 'Image loaded' : 'No image uploaded';
		previewRatioLabel.textContent = `Ratio: ${state.selectedRatio}`;
		downloadBtn.disabled = !state.image;
	}

	function resizeCanvasForRatio() {
		const { width, height } = getRatioDimensions(state.selectedRatio);
		previewCanvas.width = width;
		previewCanvas.height = height;
	}

	function renderPlaceholderCanvas() {
		resizeCanvasForRatio();

		const width = previewCanvas.width;
		const height = previewCanvas.height;

		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = state.backgroundColor;
		ctx.fillRect(0, 0, width, height);

		if (state.image) {
			const scale = Math.min(width / state.image.width, height / state.image.height);
			const drawWidth = state.image.width * scale;
			const drawHeight = state.image.height * scale;
			const x = (width - drawWidth) / 2;
			const y = (height - drawHeight) / 2;

			ctx.drawImage(state.image, x, y, drawWidth, drawHeight);
		} else {
			ctx.fillStyle = '#f3f4f6';
			ctx.fillRect(0, 0, width, height);

			ctx.fillStyle = '#6b7280';
			ctx.font = 'bold 32px Segoe UI';
			ctx.textAlign = 'center';
			ctx.fillText('Preview Area', width / 2, height / 2 - 10);

			ctx.font = '16px Segoe UI';
			ctx.fillText('Upload an image to begin editing', width / 2, height / 2 + 24);
		}

		if (state.frameWidth > 0) {
			ctx.strokeStyle = state.frameColor;
			ctx.lineWidth = state.frameWidth;
			ctx.strokeRect(0, 0, width, height);
		}
	}

	function showPreview() {
		emptyState.style.display = 'none';
		previewShell.style.display = 'block';
	}

	function showEmptyState() {
		previewShell.style.display = 'none';
		emptyState.style.display = 'flex';
	}

	function handleFile(file) {
		if (!file || !file.type.startsWith('image/')) {
			return;
		}

		const reader = new FileReader();

		reader.onload = function (event) {
			const image = new Image();

			image.onload = function () {
				state.image = image;
				state.imageName = file.name;
				showPreview();
				updateSummary();
				renderPlaceholderCanvas();
			};

			image.src = event.target.result;
		};

		reader.readAsDataURL(file);
	}

	function bindUpload() {
		if (uploadTrigger) {
			uploadTrigger.addEventListener('click', function () {
				fileInput.click();
			});
		}

		if (emptyUploadBtn) {
			emptyUploadBtn.addEventListener('click', function () {
				fileInput.click();
			});
		}

		if (fileInput) {
			fileInput.addEventListener('change', function (event) {
				const file = event.target.files[0];
				handleFile(file);
			});
		}
	}

	function bindDropZone() {
		if (!dropZone) {
			return;
		}

		['dragenter', 'dragover'].forEach(function (eventName) {
			dropZone.addEventListener(eventName, function (event) {
				event.preventDefault();
				event.stopPropagation();
				dropZone.classList.add('ppt-drop-active');
			});
		});

		['dragleave', 'drop'].forEach(function (eventName) {
			dropZone.addEventListener(eventName, function (event) {
				event.preventDefault();
				event.stopPropagation();
				dropZone.classList.remove('ppt-drop-active');
			});
		});

		dropZone.addEventListener('drop', function (event) {
			const files = event.dataTransfer.files;
			if (files && files.length > 0) {
				handleFile(files[0]);
			}
		});
	}

	function bindRatioButtons() {
		ratioButtons.forEach(function (button) {
			button.addEventListener('click', function () {
				ratioButtons.forEach(function (btn) {
					btn.classList.remove('is-active');
				});

				this.classList.add('is-active');
				state.selectedRatio = this.getAttribute('data-ratio') || '1:1';

				updateSummary();
				renderPlaceholderCanvas();
			});
		});
	}

	function bindControls() {
		if (removeBgCheckbox) {
			removeBgCheckbox.addEventListener('change', function () {
				state.backgroundRemoved = this.checked;
				updateSummary();
				renderPlaceholderCanvas();
			});
		}

		if (frameColorInput) {
			frameColorInput.addEventListener('input', function () {
				state.frameColor = this.value;
				renderPlaceholderCanvas();
			});
		}

		if (frameWidthInput) {
			frameWidthInput.addEventListener('input', function () {
				state.frameWidth = parseInt(this.value, 10) || 0;
				updateSummary();
				renderPlaceholderCanvas();
			});
		}

		if (bgColorInput) {
			bgColorInput.addEventListener('input', function () {
				state.backgroundColor = this.value;
				renderPlaceholderCanvas();
			});
		}
	}

	function bindDownloadPlaceholder() {
		if (!downloadBtn) {
			return;
		}

		downloadBtn.addEventListener('click', function () {
			if (!state.image) {
				return;
			}

			const link = document.createElement('a');
			link.download = 'profile-photo-preview.png';
			link.href = previewCanvas.toDataURL('image/png');
			link.click();
		});
	}

	function init() {
		showEmptyState();
		updateSummary();
		renderPlaceholderCanvas();
		bindUpload();
		bindDropZone();
		bindRatioButtons();
		bindControls();
		bindDownloadPlaceholder();

		console.log('Step 3 editor shell initialized.', window.pptAppConfig || {});
	}

	init();
});
