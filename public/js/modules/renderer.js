window.PPTRenderer = (function () {
	function fitPreviewCanvas(canvas, ratioWidth, ratioHeight) {
		const maxPreviewWidth = 720;
		const maxPreviewHeight = 520;

		const scale = Math.min(
			maxPreviewWidth / ratioWidth,
			maxPreviewHeight / ratioHeight
		);

		canvas.width = ratioWidth;
		canvas.height = ratioHeight;
		canvas.style.width = `${Math.round(ratioWidth * scale)}px`;
		canvas.style.height = `${Math.round(ratioHeight * scale)}px`;
	}

	function drawPlaceholder(ctx, canvas) {
		ctx.fillStyle = '#f3f4f6';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = '#6b7280';
		ctx.textAlign = 'center';
		ctx.font = 'bold 32px Segoe UI';
		ctx.fillText('Preview Area', canvas.width / 2, canvas.height / 2 - 10);

		ctx.font = '16px Segoe UI';
		ctx.fillText('Upload an image to begin editing', canvas.width / 2, canvas.height / 2 + 24);
	}

	function getBaseScale(canvas, image, fitMode) {
		if (fitMode === 'fit') {
			return Math.min(canvas.width / image.width, canvas.height / image.height);
		}

		return Math.max(canvas.width / image.width, canvas.height / image.height);
	}

	function drawImageTransformed(ctx, canvas, image, state) {
		const baseScale = getBaseScale(canvas, image, state.fitMode);
		const scale = baseScale * state.zoom;

		const drawWidth = image.width * scale;
		const drawHeight = image.height * scale;
		const centerX = (canvas.width - drawWidth) / 2;
		const centerY = (canvas.height - drawHeight) / 2;

		const x = centerX + state.offsetX;
		const y = centerY + state.offsetY;

		ctx.drawImage(image, x, y, drawWidth, drawHeight);
	}

	function drawFrame(ctx, canvas, frameColor, frameWidth) {
		if (!frameWidth || frameWidth <= 0) {
			return;
		}

		ctx.strokeStyle = frameColor;
		ctx.lineWidth = frameWidth;
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
	}

	function render(canvas, state, helpers) {
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext('2d');
		const ratio = helpers.getRatioDimensions(state.selectedRatio);

		fitPreviewCanvas(canvas, ratio.width, ratio.height);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = state.backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (state.image) {
			drawImageTransformed(ctx, canvas, state.image, state);
		} else {
			drawPlaceholder(ctx, canvas);
		}

		drawFrame(ctx, canvas, state.frameColor, state.frameWidth);
	}

	return {
		render
	};
})();
