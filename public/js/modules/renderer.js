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

	function drawImageCover(ctx, canvas, image) {
		const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
		const drawWidth = image.width * scale;
		const drawHeight = image.height * scale;
		const x = (canvas.width - drawWidth) / 2;
		const y = (canvas.height - drawHeight) / 2;

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
			drawImageCover(ctx, canvas, state.image);
		} else {
			drawPlaceholder(ctx, canvas);
		}

		drawFrame(ctx, canvas, state.frameColor, state.frameWidth);
	}

	return {
		render
	};
})();
