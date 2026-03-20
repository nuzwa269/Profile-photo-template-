<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class PPT_Plugin {

	/**
	 * @var PPT_Assets
	 */
	protected $assets;

	/**
	 * @var PPT_Shortcode
	 */
	protected $shortcode;

	public function init() {
		$this->assets    = new PPT_Assets();
		$this->shortcode = new PPT_Shortcode();

		$this->assets->init();
		$this->shortcode->init();
	}
}
