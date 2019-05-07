(function(_) {
	function changeURL(newPath) {
		window.location.href = newPath;
	}
	function attachKeyboardEvents() {
		var RIGHT_KEY = 39;
		var LEFT_KEY = 37;
		var ENTER_KEY = 13;

		document.addEventListener('keydown', function(evt) {
			var keyCode = evt.keyCode;

			var shouldGoForward = keyCode === RIGHT_KEY || keyCode === ENTER_KEY;
			var shouldGoBack = keyCode === LEFT_KEY;
			var tryingToNavigate = evt.altKey;

			if(!shouldGoForward && !shouldGoBack || tryingToNavigate) {
				return;
			}

			evt.preventDefault();

			var isHomepage = window.document.body.className.indexOf('home') > -1;
			if(isHomepage) {
				if (shouldGoForward) {
					window.PLUSMINUS.scrollToClosestSlide(slideAndChangePage);
				}
			} else { // Internal Pages should go next 
				var href = document.querySelectorAll('.footer_wrapper .prev_link')[0].href;
				if(shouldGoForward) {
					href = document.querySelectorAll('.footer_wrapper .next_link')[0].href;
				}
				var notValidNavigation = href === window.location.href;
				if(notValidNavigation) {
					return;
				}
				makeTransitionEl(shouldGoForward, function() {
					changeURL(href);
				});
			}
		});

		document.querySelectorAll('.footer_wrapper .link').forEach(function(elem) {
			elem.addEventListener('click', function(evt) {
				evt.preventDefault();
				var $anchor = evt.currentTarget;
				var href = $anchor.href;
				var isNextLink = $anchor.className.indexOf('next_link') > -1;
				makeTransitionEl(isNextLink, function() {
					changeURL(href);
				});
			});
		});
		document.querySelectorAll('.featured_wrapper').forEach(function(elem) {
			elem.addEventListener('click', function(evt) {
				evt.preventDefault();
				var href = evt.currentTarget.href;
				makeTransitionEl(true, function() {
					changeURL(href);
				});
			});
		});
		document.querySelectorAll('[data-href]').forEach(function(elem) {
			elem.addEventListener('click', function(evt) {
				evt.preventDefault();
				window.PLUSMINUS.scrollToSlide(evt.currentTarget, slideAndChangePage);
			});
		});
		document.getElementById('home_nav').addEventListener('click', function(evt) {
			evt.preventDefault();
			makeTransitionEl(false, function() {
				changeURL('/');
			});
		});
	}
	function makeTransitionEl(isGoingForward, completeFn) {
		var $wipeOverlay = document.createElement('div');
		var TRANSITION_TIME_MS = 600;
		var TIMEOUT_OFFSET_MS = 100
		function cleanupAndComplete() {
			completeFn();
		}
		window.onpopstate = cleanupAndComplete;
		setTimeout(cleanupAndComplete, (TRANSITION_TIME_MS + TIMEOUT_OFFSET_MS));
		var staicStyles = 'position: fixed; top: 0; bottom: 0; z-index: 100; transition: left ' + TRANSITION_TIME_MS + 'ms, right ' + TRANSITION_TIME_MS + 'ms; background-color: #FFF;';
		var forwardInitialStyle = 'left: 100vw; right: 0; ' + staicStyles;
		var backwardInitialStyle = 'left: 0; right: 100vw; ' + staicStyles;
		var finalStyle = 'left: 0; right: 0; ' + staicStyles;
		$wipeOverlay.setAttribute('style', (isGoingForward ? forwardInitialStyle : backwardInitialStyle));
		window.document.body.appendChild($wipeOverlay);
		setTimeout(function() {
			$wipeOverlay.setAttribute('id', 'wipe_overlay');
		});
	}
	function slideAndChangePage(elem) {
		var href = elem.dataset.href;
		var isTargetable = href !== undefined;
		if(!isTargetable) {
			return;
		}
		makeTransitionEl(true, function() {
			changeURL(href);
		});
	}
	attachKeyboardEvents();
}(_));
