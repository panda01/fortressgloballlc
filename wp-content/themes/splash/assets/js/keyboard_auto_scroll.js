/*
 * Keyboard Assisted Scroll
 *
 *
 */
(function(_) {
	if(!window.PLUSMINUS) {
		window.PLUSMINUS = {};
	}
	var elSelector = '.js_assisted_scroll, .js_assisted_top_scroll';
	var DIFF_THRESHOLD = 10;
	function getMapOfElementPosition() {
		var windowScrollPos = window.scrollY;
		var targetEls = getAllElems();
		return _.map(targetEls, function(el) {
			var elRect = el.getBoundingClientRect();
			var elY = elRect.y + windowScrollPos;
			var isTopScrollItem = el.className.indexOf('js_assisted_top_scroll') > -1;
			if(isTopScrollItem) {
				return { midPoint: elY - negHalfWindowHeight() };
			}
			return { midPoint: elY + (elRect.height * 0.5) };
		});
	}
	function getAllElems() {
		return document.querySelectorAll(elSelector);
	}
	function negHalfWindowHeight() {
		return window.innerHeight * -0.5;
	}
	function scrollToSlideIdx(slideIdx, completeFn) {
		var targetScrollPos = getMapOfElementPosition()[slideIdx].midPoint + negHalfWindowHeight();
		customScrollTo(window.scrollY, targetScrollPos, 700, completeFn);
	}
	function attachKeyboardEvents() {
		var SPACEBAR 		= 32;
		var PAGE_UP_KEY 	= 33;
		var PAGE_DOWN_KEY 	= 34;
		var UP_KEY_CODE 	= 38;
		var DOWN_KEY_CODE 	= 40;
		var isTransitioning = false;
		document.addEventListener('keydown', function(evt) {
			var keyCode = evt.keyCode;
			var shouldGoDown = keyCode === DOWN_KEY_CODE || keyCode === SPACEBAR || keyCode === PAGE_DOWN_KEY;
			var shouldGoUp = keyCode === UP_KEY_CODE || keyCode === PAGE_UP_KEY;
			if(isTransitioning) {
				if(shouldGoUp || shouldGoDown) {
					evt.preventDefault();
				}
				return;
			}
			if(!shouldGoUp && !shouldGoDown) {
				return;
			}
			var elementMap = getMapOfElementPosition();

			var currScrollPos = window.scrollY;
			for(var i = 0; i < elementMap.length; i++) {
				var curr = elementMap[i];
				var topPos = curr.midPoint + negHalfWindowHeight();
				var difference = Math.abs(currScrollPos - topPos);
				var isWithinThreshold = difference < DIFF_THRESHOLD;
				if (isWithinThreshold) {
					var targetSlide = i - 1;
					if(shouldGoDown) {
						targetSlide = i + 1;
					}
					break;
				}
				var isPastScrollPoint = currScrollPos < topPos;
				if (isPastScrollPoint) {
					targetSlide = i - 1;
					if(shouldGoDown) {
						targetSlide++;
					}
					break;
				}
			}
			var idxOutOfBounds = targetSlide < 0 || targetSlide >= elementMap.length || targetSlide === undefined;
			if(idxOutOfBounds) {
				return;
			}
			isTransitioning = true;
			evt.preventDefault();

			scrollToSlideIdx(targetSlide, function() {
				isTransitioning = false;
			});
		});

		window.PLUSMINUS.scrollToClosestSlide = function(completeFn) {
			if(isTransitioning) {
				return false;
			}
			isTransitioning = true;
			var elementMap = getMapOfElementPosition();

			var currScrollPos = window.scrollY;
			var scrollOffDiff = 1000;
			// first get a list of all of the differences from the center
			var closestIdx = elementMap
				.map(function(currElement) {
					var topPos = currElement.midPoint + negHalfWindowHeight();
					var difference = Math.abs(currScrollPos - topPos);
					return difference;
				})
				.reduce(function(smallestDiffIdxSoFar, currDiff, idx, diffList) {
					var isFirstDiff = (smallestDiffIdxSoFar === false);
					if(isFirstDiff) {
						return idx;
					}

					var isCurrDiffSmaller = currDiff < diffList[smallestDiffIdxSoFar];
					if(isCurrDiffSmaller) {
						scrollOffDiff = currDiff;
						return idx;
					}

					return smallestDiffIdxSoFar;
				}, false);

			var isAlreadyCentered = scrollOffDiff < DIFF_THRESHOLD;
			if(isAlreadyCentered) {
				isTransitioning = false;
				completeFn(getAllElems()[closestIdx]);
			} else {
				scrollToSlideIdx(closestIdx, function() {
					isTransitioning = false;
					completeFn(getAllElems()[closestIdx]);
				});
			}
		};

		// TODO test this and make sure it works well.
		window.PLUSMINUS.scrollToSlide = function(elemToFind, completeFn) {
			isTransitioning = true;

			var slideToGoTo = _.reduce(getAllElems(), function(prev, curr, idx) {
				var isMatchingElem = curr === elemToFind;
				if(isMatchingElem) {
					return idx;
				}
				return prev;
			}, false);
			var elementMap = getMapOfElementPosition();

			var hasElem = elementMap[slideToGoTo];
			scrollToSlideIdx(slideToGoTo, function() {
				isTransitioning = false;
				completeFn(elemToFind);
			});
		};
	}
	function customScrollTo(start, to, duration, completeFn) {
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


	attachKeyboardEvents();
}(_));
