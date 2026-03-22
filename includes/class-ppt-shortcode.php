<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class PPT_Shortcode {

	public function init() {
		add_shortcode( 'ai_profile_tool', array( $this, 'render_shortcode' ) );
	}

	public function render_shortcode( $atts = array(), $content = null ) {
		$assets = new PPT_Assets();
		$assets->enqueue_frontend_assets();

		$atts = shortcode_atts(
			array(
				'tool_url'        => '',
				'prompt_template' => '',
			),
			$atts,
			'ai_profile_tool'
		);

		$tool_url        = esc_url( $atts['tool_url'] );
		$prompt_template = sanitize_textarea_field( $atts['prompt_template'] );

		ob_start();
		include ppt_get_asset_path( 'public/partials/app-root.php' );
		return ob_get_clean();
	}
}
