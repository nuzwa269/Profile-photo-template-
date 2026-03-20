<?php
/**
 * Plugin Name: AI Profile Photo Template
 * Plugin URI: https://github.com/nuzwa269/Profile-photo-template-
 * Description: A profile photo editor plugin for WordPress.
 * Version: 1.1.0
 * Author: nuzwa269
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PPT_VERSION', '1.1.0' );
define( 'PPT_FILE', __FILE__ );
define( 'PPT_PATH', plugin_dir_path( __FILE__ ) );
define( 'PPT_URL', plugin_dir_url( __FILE__ ) );

require_once PPT_PATH . 'includes/helpers.php';
require_once PPT_PATH . 'includes/class-ppt-assets.php';
require_once PPT_PATH . 'includes/class-ppt-shortcode.php';
require_once PPT_PATH . 'includes/class-ppt-plugin.php';

function ppt_run_plugin() {
	$plugin = new PPT_Plugin();
	$plugin->init();
}

ppt_run_plugin();
