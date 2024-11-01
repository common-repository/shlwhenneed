/*
 * Syntaxhighlighter - Load When Need jQuery plugin
 * 按需加载语法高亮
 * Version: 1.0.5(09/09/2010)
 * Author: damonpeng http://impng.com/
*/
;(function($) {

	$.fn.SHLwhenneed = function() {
		var needbrush = needBrush();
		if(needbrush) {
			// mix config from page
			if(typeof SHLCONFIG != 'undefined') {
				$.extend($.fn.SHLwhenneed.config, SHLCONFIG);
			}
			$.fn.SHLwhenneed.build(needbrush);
		}
	};

	$.fn.SHLwhenneed.build = function(brushes) {
		loadCore();
		loadBrush(brushes);
		_run();
	};

	var _jsB = '%3Cscript type="text/javascript" src="',
		_jsE = '"%3E%3C/script%3E',
		_cssB = '%3Clink rel="stylesheet" type="text/css" href="',
		_cssE = '" /%3E';

	function loadCore() {
		var cfg = $.fn.SHLwhenneed.config,
			file;
		file = [
			_cssB + cfg.BASE_PATH + cfg.STYLE_CORE + _cssE,
			_cssB + cfg.BASE_PATH + cfg.STYLE_THEME + _cssE
		];

		_load(file.join(''), 'head');
	}

	function loadBrush(brushes) {
		var cfg = $.fn.SHLwhenneed.config,
			cnt = brushes.length,
			file = [],
			filestr,
			brushfile;

		/* fix chrome bug. At least load 2 brushes. This will cost 1ms.*/
		/**
		if(cnt === 1) {
			file.push('about:blank');
		}
		/**/
		file.push(cfg.BASE_PATH + cfg.SCRIPT_CORE);  // load core.js here to avoid some bugs in chrome.

		brushes = $.unique(brushes);
		while(cnt--) {
			brushfile = cfg.BRUSH_MAP[brushes[cnt]];
			brushfile && file.push( cfg.BASE_PATH + cfg.SCRIPT_PATH + brushfile );
		}

		filestr = _jsB + file.join(_jsE + _jsB) + _jsE;

		_load(filestr);
	}

	function _run() {
		try {
			SyntaxHighlighter.defaults.toolbar = false;
			SyntaxHighlighter.all();
		} catch(e) {}
	}

	function _load(filestr, tag) {
		tag = tag || 'body';

		$('&lt;script type="text/javascript"&gt;document.write("'+ unescape(filestr) +'");&lt;/script&gt;').appendTo(tag);
	}

	/* which brush the page needs */
	function needBrush() {
		var needBrush = [], brush;
		/* Compatible with old versions and other plugins, such as WP-Syntax */
		$("pre[name=code], pre[lang]").each(function() {
			var _classname = this.className || this.lang;
			this.className = 'brush:'+ _classname;
		});
		/* supported <pre> tags, without other classname expcet brush:xxx*/
		$("pre[class^='brush:']").each(function(){
			brush = this.className.substr(6).replace(';', '');
			needBrush.push( $.trim(brush) );
		});

		return needBrush.length>0 ? needBrush : false;
	};

	/* SyntaxHighlighter file location */
	$.fn.SHLwhenneed.config = {
		BASE_PATH : 'syntaxhighlighter/',
		SCRIPT_PATH : 'scripts/',
		SCRIPT_CORE : 'scripts/shCore.js',
		STYLE_CORE : 'styles/shCore.css',
		STYLE_THEME : 'styles/shThemeDefault.css',
		CLIPBOARD : 'scripts/clipboard.swf',
		/* Highlighter rules file */
		BRUSH_MAP : {
			as3: 'shBrushAS3.js',
			actionscript3: 'shBrushAS3.js',
			bash: 'shBrushBash.js',
			shell: 'shBrushBash.js',
			'c-sharp': 'shBrushCSharp.js',
			csharp: 'shBrushCSharp.js',
			cpp:'shBrushCpp.js',
			c: 'shBrushCpp.js',
			css: 'shBrushCss.js',
			delphi:'shBrushDelphi.js',
			pas:'shBrushDelphi.js',
			pascal: 'shBrushDelphi.js',
			diff: 'shBrushDiff.js',
			patch: 'shBrushDiff.js',
			groovy: 'shBrushGroovy.js',
			js: 'shBrushJScript.js',
			jscript: 'shBrushJScript.js',
			javascript: 'shBrushJScript.js',
			java: 'shBrushJava.js',
			jfx: 'shBrushJavaFX.js',
			javafx: 'shBrushJavaFX.js',
			perl:'shBrushPerl.js',
			pl: 'shBrushPerl.js',
			php: 'shBrushPhp.js',
			plain: 'shBrushPlain.js',
			text: 'shBrushPlain.js',
			ps: 'shBrushPowerShell.js',
			powershell: 'shBrushPowerShell.js',
			py: 'shBrushPython.js',
			python: 'shBrushPython.js',
			rails: 'shBrushRuby.js',
			ror: 'shBrushRuby.js',
			ruby: 'shBrushRuby.js',
			scala: 'shBrushScala.js',
			sql: 'shBrushSql.js',
			vb: 'shBrushVb.js',
			vbnet: 'shBrushVb.js',
			xml: 'shBrushXml.js',
			xhtml: 'shBrushXml.js',
			xslt: 'shBrushXml.js',
			html: 'shBrushXml.js',
			xhtml: 'shBrushXml.js'
		}
	};

	$(document).ready(function() {
		$.fn.SHLwhenneed();
	});
})(jQuery);
