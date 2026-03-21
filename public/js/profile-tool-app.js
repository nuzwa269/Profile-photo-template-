document.addEventListener('DOMContentLoaded', function () {
	const app = document.getElementById('ppt-app');

	if (!app || !window.PPTEditorState || !window.PPTRenderer || !window.PPTUploader) {
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
	const exportFormatInput = document.getElementById('ppt-export-format');
	const exportSizeInput = document.getElementById('ppt-export-size');
	const exportQualityInput = document.getElementById('ppt-export-quality');
	const zoomRange = document.getElementById('ppt-zoom-range');
	const controlButtons = document.querySelectorAll('.ppt-control-actions .ppt-btn');

	const State = window.PPTEditorState;
	const Renderer = window.PPTRenderer;
	const Uploader = window.PPTUploader;

	let isDragging = false;
	let dragStartX = 0;
	let dragStartY = 0;
	let dragStartOffsetX = 0;
	let dragStartOffsetY = 0;

	function getState() {
		return State.getState();
	}

	function setState(updates) {
		State.setState(updates);
		updateUI();
	}

	function showPreview() {
		emptyState.style.display = 'none';
		previewShell.style.display = 'block';
	}

	function showEmptyState() {
		previewShell.style.display = 'none';
		emptyState.style.display = 'flex';
	}

	function updateSummary(state) {
		summaryRatio.textContent = state.selectedRatio;
		summaryBackground.textContent = state.backgroundRemoved ? 'Removed (placeholder)' : 'Original';
		summaryFrame.textContent = state.frameWidth > 0 ? `Enabled (${state.frameWidth}px)` : 'Disabled';
		summaryStatus.textContent = state.image ? `Loaded: ${state.imageName}` : 'Waiting for upload';
		statusText.textContent = state.image ? 'Image loaded' : 'No image uploaded';
		previewRatioLabel.textContent = `Ratio: ${state.selectedRatio}`;
		downloadBtn.disabled = !state.image;

		if (zoomRange) {
			zoomRange.value = state.zoom;
		}
	}

	function renderPreview(state) {
		Renderer.render(previewCanvas, state, {
			getRatioDimensions: State.getRatioDimensions
		});
	}

	function updateUI() {
		const state = getState();

		if (state.image) {
			showPreview();
		} else {
			showEmptyState();
		}

		updateSummary(state);
		renderPreview(state);
	}

	function handleLoadedFile(payload) {
		State.resetTransform();

		setState({
			image: payload.image,
			imageName: payload.imageName,
			zoom: 1,
			offsetX: 0,
			offsetY: 0,
			fitMode: 'fill'
		});
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

				Uploader.loadImageFile(file, handleLoadedFile);
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
				Uploader.loadImageFile(files[0], handleLoadedFile);
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

				setState({
					selectedRatio: this.getAttribute('data-ratio') || '1:1'
				});
			});
		});
	}

	function bindControls() {
		if (removeBgCheckbox) {
			removeBgCheckbox.addEventListener('change', function () {
				setState({
					backgroundRemoved: this.checked
				});
			});
		}

		if (frameColorInput) {
			frameColorInput.addEventListener('input', function () {
				setState({
					frameColor: this.value
				});
			});
		}

		if (frameWidthInput) {
			frameWidthInput.addEventListener('input', function () {
				setState({
					frameWidth: parseInt(this.value, 10) || 0
				});
			});
		}

		if (bgColorInput) {
			bgColorInput.addEventListener('input', function () {
				setState({
					backgroundColor: this.value
				});
			});
		}

		if (exportFormatInput) {
			exportFormatInput.addEventListener('change', function () {
				setState({
					exportFormat: this.value
				});
			});
		}

		if (exportSizeInput) {
			exportSizeInput.addEventListener('change', function () {
				setState({
					exportSize: this.value
				});
			});
		}

		if (exportQualityInput) {
			exportQualityInput.addEventListener('input', function () {
				setState({
					exportQuality: parseFloat(this.value) || 0.92
				});
			});
		}

		if (zoomRange) {
			zoomRange.addEventListener('input', function () {
				setState({
					zoom: parseFloat(this.value) || 1
				});
			});
		}
	}

	function bindTransformButtons() {
		if (!controlButtons.length) {
			return;
		}

		controlButtons.forEach(function (button) {
			button.addEventListener('click', function () {
				const label = this.textContent.trim().toLowerCase();

				if (label === 'fit') {
					setState({
						fitMode: 'fit',
						zoom: 1,
						offsetX: 0,
						offsetY: 0
					});
				}

				if (label === 'fill') {
					setState({
						fitMode: 'fill',
						zoom: 1,
						offsetX: 0,
						offsetY: 0
					});
				}

				if (label === 'reset') {
					State.resetTransform();
					updateUI();
				}
			});
		});
	}

	function getPointerPosition(event) {
		if (event.touches && event.touches.length > 0) {
			return {
				x: event.touches[0].clientX,
				y: event.touches[0].clientY
			};
		}

		return {
			x: event.clientX,
			y: event.clientY
		};
	}

	function bindCanvasDragging() {
		if (!previewCanvas) {
			return;
		}

		function startDrag(event) {
			const state = getState();

			if (!state.image) {
				return;
			}

			const point = getPointerPosition(event);

			isDragging = true;
			dragStartX = point.x;
			dragStartY = point.y;
			dragStartOffsetX = state.offsetX;
			dragStartOffsetY = state.offsetY;

			previewCanvas.style.cursor = 'grabbing';
			event.preventDefault();
		}

		function moveDrag(event) {
			if (!isDragging) {
				return;
			}

			const point = getPointerPosition(event);
			const deltaX = point.x - dragStartX;
			const deltaY = point.y - dragStartY;

			setState({
				offsetX: dragStartOffsetX + deltaX,
				offsetY: dragStartOffsetY + deltaY
			});
		}

		function endDrag() {
			isDragging = false;
			previewCanvas.style.cursor = 'grab';
		}

		previewCanvas.style.cursor = 'grab';

		previewCanvas.addEventListener('mousedown', startDrag);
		previewCanvas.addEventListener('touchstart', startDrag, { passive: false });

		window.addEventListener('mousemove', moveDrag);
		window.addEventListener('touchmove', moveDrag, { passive: false });

		window.addEventListener('mouseup', endDrag);
		window.addEventListener('touchend', endDrag);
	}

	function bindDownloadPlaceholder() {
		if (!downloadBtn) {
			return;
		}

		downloadBtn.addEventListener('click', function () {
			const state = getState();

			if (!state.image) {
				return;
			}

			const link = document.createElement('a');
			link.download = `profile-photo-${state.selectedRatio}.png`;
			link.href = previewCanvas.toDataURL('image/png');
			link.click();
		});
	}

	function init() {
		updateUI();
		bindUpload();
		bindDropZone();
		bindRatioButtons();
		bindControls();
		bindTransformButtons();
		bindCanvasDragging();
		bindDownloadPlaceholder();

		console.log('Step 5 transform engine initialized.', window.pptAppConfig || {});
	}

	init();
});
