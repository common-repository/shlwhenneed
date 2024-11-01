<?php
/*
Plugin Name: SHLwhenneed
Plugin URI: http://impng.com/
Description: Based on jQuery & SyntaxHighlighter, only load the brush file when need. Great appreciation to Satan's(http://sdvil.com/) help.
Version: 1.0.5
Author: damonpeng
Author URI: http://impng.com/
*/

if(is_admin()) {
	return FALSE;
}

if (!class_exists('SHLwhenneed')) {
     class SHLwhenneed {
		private $curpath;
		private $version;

        function SHLwhenneed() {
			$this->version = '1.0.5';
			$this->curpath = plugins_url(basename(dirname(__FILE__)));

			$this->load();
		}

		function load() {
			$this->load_jquery();

			wp_deregister_script('shlwhenneed');
			wp_register_script('shlwhenneed', ($this->curpath.'/shlwhenneed.js'), array('jquery'), $this->version, TRUE);  // if TRUE, do not work in some themes.
			wp_enqueue_script('shlwhenneed');

			wp_localize_script('shlwhenneed', 'SHLCONFIG', array(
					'BASE_PATH' => $this->curpath .'/syntaxhighlighter/',
					//'params' => get_option(''),
			));
		}

		function load_jquery() {
			wp_deregister_script('jquery');
			wp_register_script('jquery', ($this->curpath.'/jquery.js'), FALSE, '1.4.2', TRUE);
			wp_enqueue_script('jquery');

			add_action('wp_print_scripts', array(&$this, 'load_jquery'));
		}
     }
}

add_action('wp_print_scripts', create_function('', 'new SHLwhenneed();'));