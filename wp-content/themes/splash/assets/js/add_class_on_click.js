(function() {
	var TRIGGER_ATTRIBUTE = 'data-js-click';
	var ACTIVATED_CLASS = 'js_clicked_open'
	function attachMouseEvents() {
		var $triggers = document.querySelectorAll('[' + TRIGGER_ATTRIBUTE + ']');
		$triggers.forEach(function($trigger) {
			$trigger.addEventListener('click', function(evt) {
				var elSelector = $trigger.attributes.getNamedItem(TRIGGER_ATTRIBUTE).value;
				var $elToOpen = document.querySelector(elSelector);
				var isOpen = $trigger.classList.contains(ACTIVATED_CLASS)
				var $body = document.body;

				if(isOpen) {
					$trigger.classList.remove(ACTIVATED_CLASS);
					$elToOpen.classList.remove(ACTIVATED_CLASS);
					$body.classList.remove(ACTIVATED_CLASS);
				} else {
					$trigger.classList.add(ACTIVATED_CLASS);
					$elToOpen.classList.add(ACTIVATED_CLASS);
					$body.classList.add(ACTIVATED_CLASS);
				}
			});
		});
	}
	function _map(arrayLikeObject, fn) {
		for(var idx = 0; idx < arrayLikeObject.length; idx++) {
			fn(arrayLikeObject, idx);
		}
	}


	attachMouseEvents();
}());
