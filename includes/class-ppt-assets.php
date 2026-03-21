<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class PPT_Assets {

	public function init() {
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
	}

	public function register_assets() {
		wp_register_style(
			'ppt-app-style',
			ppt_get_asset_url( 'public/css/profile-tool-app.css' ),
			array(),
			PPT_VERSION
		);

		wp_register_script(
			'ppt-state-script',
			ppt_get_asset_url( 'public/js/modules/state.js' ),
			array(),
			PPT_VERSION,
			true
		);

		wp_register_script(
			'ppt-renderer-script',
			ppt_get_asset_url( 'public/js/modules/renderer.js' ),
			array( 'ppt-state-script' ),
			PPT_VERSION,
			true
		);

		wp_register_script(
			'ppt-uploader-script',
			ppt_get_asset_url( 'public/js/modules/uploader.js' ),
			array(),
			PPT_VERSION,
			true
		);

		wp_register_script(
			'ppt-app-script',
			ppt_get_asset_url( 'public/js/profile-tool-app.js' ),
			array( 'ppt-state-script', 'ppt-renderer-script', 'ppt-uploader-script' ),
			PPT_VERSION,
			true
		);

		wp_localize_script(
			'ppt-app-script',
			'pptAppConfig',
			array(
				'pluginUrl'     => PPT_URL,
				'defaultFormat' => 'png',
				'defaultRatio'  => '1:1',
			)
		);
	}

	public function enqueue_frontend_assets() {
		wp_enqueue_style( 'ppt-app-style' );
		wp_enqueue_script( 'ppt-state-script' );
		wp_enqueue_script( 'ppt-renderer-script' );
		wp_enqueue_script( 'ppt-uploader-script' );
		wp_enqueue_script( 'ppt-app-script' );
	}
}
