(function() {
	var WINDOW_SCROLL_THRESHOLD = 10;
	var HEADER_SELECTOR = 'header';
	var HEADER_COLLAPSED_CLASS = 'collapsed';
	function attachScrollEvents() {
		window.addEventListener('scroll', debounce(function(evt) {
			var currentScrollPos = window.scrollY;
			var shouldHaveCollapsedClass = currentScrollPos > WINDOW_SCROLL_THRESHOLD;
			var $headers = document.querySelectorAll(HEADER_SELECTOR);
			if(shouldHaveCollapsedClass) {
				$headers.forEach(function($header) {
					$header.classList.add(HEADER_COLLAPSED_CLASS);
				});
			} else {
				$headers.forEach(function($header) {
					$header.classList.remove(HEADER_COLLAPSED_CLASS);
				});
			}
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
	attachScrollEvents();
}());
