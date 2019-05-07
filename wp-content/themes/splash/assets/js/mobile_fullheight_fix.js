(function($) {
	// FIXME make this script not depend on anything
	var lastWindowWidth = -1;
	function isMobile() {
		return window.innerWidth < 960;
	}
	function updateFullHeightElements() {
		var $fullHeightElems = $('.js_mobile_height_fix');
		$fullHeightElems.css('height', '');
		var staticWindowHeight = $(window).height();
		if (isMobile()) {
			setTimeout(function() {
				$fullHeightElems.each(function(idx, el) {
					var $el = $(el);
					var elHeightIsWindowheight = $el.innerHeight() === staticWindowHeight;
					if(elHeightIsWindowheight) {
						$el.css('height', (staticWindowHeight + 'px'));
					}
				});
			}, 1);
		}
	}

	//Taken from Underscore
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	$(document).ready(function() {
		if(!window.PLUSMINUS) {
			window.PLUSMINUS = {};
		}
		window.PLUSMINUS.mobileHeightFix = debounce(updateFullHeightElements, 50);;

		lastWindowWidth = $(window).width();
		$(window).on('resize', debounce(function(evt) {
			var currWindowWidth = $(window).width();
			var widthHasChanged = lastWindowWidth !== currWindowWidth;
			if(widthHasChanged) {
				updateFullHeightElements();
				lastWindowWidth = currWindowWidth;
			}
		}, 100));
	});
}(jQuery));
