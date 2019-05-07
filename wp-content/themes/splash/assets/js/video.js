(function() {
	function forEachWithCb(elemQuery, cbEvt) {
		document.querySelectorAll(elemQuery).forEach(cbEvt);
	}
	var elSelector = '.js_autoplay_video';
	function getMapOfVideoElementPosition() {
		var windowScrollPos = window.scrollY;
		var targetEls = document.querySelectorAll(elSelector);
		return _.map(targetEls, function(el) {
			var elRect = el.getBoundingClientRect();
			var elY = elRect.y + windowScrollPos;
			var isTopScrollItem = el.className.indexOf('js_assisted_top_scroll') > -1;
			return { videoElem: el, y: elY, midPoint: elY + elRect.height / 2, alreadyPlayed: false };
		});
	}
	function attachVideoEvents() {
		forEachWithCb('.js_play_button', function(elem) {
			elem.addEventListener('click', function(evt) {
				var $overlayWrapper = evt.currentTarget;
				var video_id = $overlayWrapper.dataset.videoId;
				var $videos = document.querySelectorAll('.' + video_id);
				$videos.forEach(function($video) {
					$video.play();
					$video.setAttribute('controls', '');
					$overlayWrapper.classList.add('hide');
				});
			});
		});
	}
	attachVideoEvents();
}());
