$(document).ready(function() {
	setupFooter();
});

function isMobileStyle() {
	return window.innerWidth < 960
}

function customScrollTo(start, to, duration, completeFn) {
	var currentTime = 0;
	var increment = 25;
	var change = to - start;
	var startTime = Date.now();

	function easeOutQuint(t, b, c, d) {
		t /= d;
		t--;
		return c * (t * t * t * t * t + 1) + b
	}
	var animateScroll = function() {
		currentTime = Date.now() - startTime;
		var val = easeOutQuint(currentTime, start, change, duration);
		window.scroll({
			top: val,
			behavior: "instant"
		});
		if (currentTime < duration) {
			setTimeout(animateScroll, increment)
		} else if (completeFn) {
			completeFn()
		}
	};
	animateScroll()
}


function setupFooter() {
	var $footer = $(".site-footer");
	var $page = $("#content, .footer_wrapper");
	var lastScrollVal = 0;

	function toggleFooter() {
		var menuIsVisible = $footer.hasClass('slideup');
		if (menuIsVisible) {
			$footer.css("position", "");
			$page.css("display", "");
			$page.removeClass('fade_out');
			$footer.removeClass("slideup");
			$footer.addClass("slidedown");
			$(window).scrollTop(lastScrollVal);
			setTimeout(function() {
				$footer.removeClass('slidedown');
			}, 500)
		} else {
			$footer.removeClass("slidedown");
			lastScrollVal = $(window).scrollTop();
			$page.addClass("fade_out");
			$footer.addClass("slideup");
			setTimeout(function() {
				$(window).scrollTop(0);
				$page.css("display", "none");
				$footer.css('position', 'absolute');
			}, 500);
		}
		console.log($(window).scrollTop());
		$(window).scroll();
		console.log($(window).scrollTop());
		menuIsVisible = !menuIsVisible
	}
	$(".header_wrapper .js_hello_button, .header_wrapper .js_work_button").click(toggleFooter);
}
