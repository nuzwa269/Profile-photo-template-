window.PPTUploader = (function () {
	function loadImageFile(file, onSuccess) {
		if (!file || !file.type.startsWith('image/')) {
			return;
		}

		const reader = new FileReader();

		reader.onload = function (event) {
			const image = new Image();

			image.onload = function () {
				onSuccess({
					image,
					imageName: file.name
				});
			};

			image.src = event.target.result;
		};

		reader.readAsDataURL(file);
	}

	return {
		loadImageFile
	};
})();
