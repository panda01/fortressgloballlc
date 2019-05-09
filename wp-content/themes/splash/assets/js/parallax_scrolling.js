(function() {
	// TODO this can easily be on a per element basis.
	var PARALLAX_SCROLL_RATIO = 1.35;
	var PARALLAX_IMG_SELECTOR = '.js_parallax_img_wrap';
	function _findImgEl($parentEl) {
		for(var idx = 0; idx < $parentEl.children.length; idx++) {
			var currChild = $parentEl.children[idx];
			var isImgEl = currChild.nodeName.toUpperCase() === 'IMG';
			if(isImgEl) {
				return currChild;
			}
		}

	}
	function attachScrollEvents() {
		var $imgWrappers = document.querySelectorAll(PARALLAX_IMG_SELECTOR);
		$imgWrappers.forEach(function($img_wrapper) {
			var $imgEl = _findImgEl($img_wrapper);
			var wrapperHeight = $img_wrapper.getBoundingClientRect().height;
			var image_src = $imgEl.src;
			$imgEl.setAttribute('style', 'visibility: hidden');
			$img_wrapper.setAttribute('style', 'background-image: url(' + image_src + '); height: 100%; position: relative; background-position-x: 50%; background-size: auto ' + (PARALLAX_SCROLL_RATIO * 100) + 'vh;');
		});
		window.addEventListener('scroll', debounce(function(evt) {
			$imgWrappers.forEach(function($wrapper) {
				var wrapperPos = $wrapper.getBoundingClientRect();
				var screenHeight = window.innerHeight;
				var windowScroll = window.scrollY;
				var elY = wrapperPos.y + windowScroll;
				var elBottom = elY + wrapperPos.height;
				var isVisible = elY < windowScroll + screenHeight && elBottom > windowScroll;
				if(isVisible) {
					var elCenter = elY + (wrapperPos.height * 0.5);
					var screenCenter = windowScroll + 0.5 * screenHeight;
					var backgroundImageSize = screenHeight 
					var diff = screenCenter - elCenter;
					var adjustedDiff = diff + wrapperPos.height;
					var progressThrough = adjustedDiff / (wrapperPos.height * 2) * 100;
					jQuery($wrapper).css('background-position-y',  progressThrough + '%');
					console.log(diff);
					console.log($wrapper);
				}
			});
		}, 10));
		var fakeScrollEvt = new Event('scroll');
		window.dispatchEvent(fakeScrollEvt);
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

	if(window.innerWidth > 1024) {
		attachScrollEvents();
	}
}());
