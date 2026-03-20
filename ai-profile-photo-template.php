<?php
/**
 * Plugin Name:       AI Profile Photo Template
 * Plugin URI:        https://github.com/nuzwa269/Profile-photo-template-
 * Description:       An AI-powered tool to create profile photos for social media platforms.
 * Version:           1.0.0
 * Author:            nuzwa269
 * Author URI:        https://github.com/nuzwa269
 * Text Domain:       ai-profile-tool
 */

// اگر براہ راست رسائی حاصل کی جائے تو فائل کو بند کر دیں
if ( ! defined( 'WPINC' ) ) {
    exit;
}

// شارٹ کوڈ رجسٹر کرنا [ai_profile_tool]
add_shortcode( 'ai_profile_tool', 'display_ai_profile_tool' );

function display_ai_profile_tool() {
    // ضروری لائبریریز اور اسکرپٹس کو شامل کرنا
    wp_enqueue_script('ml5-js', 'https://unpkg.com/ml5@latest/dist/ml5.min.js', array(), null, true);
    wp_enqueue_script('ppt-main-script', plugins_url('/public/js/profile-tool-main.js', __FILE__), array('ml5-js'), '1.0.0', true);
    wp_enqueue_style('ppt-main-style', plugins_url('/public/css/profile-tool-style.css', __FILE__));
    
    // HTML فائل کو لوڈ کرنا
    ob_start();
    include plugin_dir_path( __FILE__ ) . 'public/partials/tool-display-html.php';
    return ob_get_clean();
}
