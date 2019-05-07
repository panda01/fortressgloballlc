
(function() {

	function attachHashChangeEvent() {

		var $anchors = document.querySelectorAll('a[href]');

		$anchors.forEach(function($anchor) {
			$anchor.addEventListener('click', function(evt) {
				var hashUrl = window.location.hash;
				var anchorHash = evt.currentTarget.hash;
				var shouldSmoothTransition = anchorHash !== undefined;
				if(!shouldSmoothTransition) {
					return true;
				}
				var $targetSection = document.querySelector(anchorHash);
				var targetTopPos = $targetSection.getBoundingClientRect().top;
				evt.preventDefault();

				customScrollTo(window.scrollY, targetTopPos, 900);
			});
		});
	}

	function customScrollTo(start, to, duration, completeFn) {
		if(start === undefined) {
			start = window.scrollY;
		}
		if(duration === undefined) {
			duration = 700;
		}
		var currentTime = 0;
		var increment = 25;
		var change = to - start;

		var startTime = Date.now();
		function easeOutQuint(t, b, c, d) {
			t /= d;
			t--;
			return c * (t*t*t*t*t + 1) + b;
		}

		var animateScroll = function() {
			currentTime = (Date.now()) - startTime;
			var val = easeOutQuint(currentTime, start, change, duration);
			window.scroll({
				top: val,
				behavior: 'instant'
			});

			if (currentTime < duration) {
				setTimeout(animateScroll, increment);
			} else if(completeFn) {
				completeFn();
			}
		};
		animateScroll();
	}

	attachHashChangeEvent();
}());
