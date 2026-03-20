<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ppt_get_asset_url( $relative_path ) {
	return PPT_URL . ltrim( $relative_path, '/' );
}

function ppt_get_asset_path( $relative_path ) {
	return PPT_PATH . ltrim( $relative_path, '/' );
}
