window.PPTEditorState = (function () {
	const ratioMap = {
		'1:1': { width: 1080, height: 1080 },
		'4:5': { width: 1080, height: 1350 },
		'3:4': { width: 1080, height: 1440 },
		'16:9': { width: 1600, height: 900 },
		'9:16': { width: 900, height: 1600 },
		custom: { width: 1080, height: 1080 }
	};

	const defaultState = {
		image: null,
		imageName: '',
		selectedRatio: '1:1',
		frameColor: '#7c3aed',
		frameWidth: 8,
		backgroundRemoved: false,
		backgroundColor: '#ffffff',
		exportFormat: 'png',
		exportSize: '1080',
		exportQuality: 0.92,
		zoom: 1,
		offsetX: 0,
		offsetY: 0,
		fitMode: 'fill'
	};

	const state = { ...defaultState };

	function getState() {
		return state;
	}

	function setState(updates) {
		Object.assign(state, updates);
		return state;
	}

	function resetTransform() {
		state.zoom = 1;
		state.offsetX = 0;
		state.offsetY = 0;
		state.fitMode = 'fill';
	}

	function getRatioDimensions(ratio) {
		return ratioMap[ratio] || ratioMap['1:1'];
	}

	return {
		getState,
		setState,
		resetTransform,
		getRatioDimensions
	};
})();
