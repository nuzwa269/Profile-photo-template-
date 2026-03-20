document.addEventListener('DOMContentLoaded', function () {
	const app = document.getElementById('ppt-app');

	if (!app) {
		return;
	}

	console.log('Profile Photo Editor app initialized.', window.pptAppConfig || {});
});
