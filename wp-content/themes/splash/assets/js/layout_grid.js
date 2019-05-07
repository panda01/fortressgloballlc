/*
 * A standalone Grid tester that adds an overlay grid, to make sure that items on the page line up
 *
 * @author: Khalah Jones-Golden
 *
 */
(function() {
	var overlayId = 'grid_overlay';
	function addClickAreaForGrid() {
		var clickAreaEl = document.createElement('div');
		clickAreaEl.setAttribute('style', 'position: fixed; left: 0; bottom: 0; height: 150px; width: 150px; z-index: 1000;');
		clickAreaEl.addEventListener('click', function(evt) {
			if(gridIsVisible()) {
				removeGrid();
			} else {
				showGrid();
			}
		});
		window.document.body.appendChild(clickAreaEl);
	}
	function gridIsVisible() {
		return (document.getElementById(overlayId) !== null);
	}
	function urlHasGridQuery() {
		return (window.location.search.indexOf('grid') > -1);
	}

	function showGrid() {
		var colClassName = 'col-lg-1 col-md-1 col-sm-1';

		var gridOverlay = document.createElement('div');
		gridOverlay.setAttribute('class', 'row no_wrap');
		gridOverlay.setAttribute('style', 'height: 100%');
		for(var i = 0; i < 12; i++) {
			var colDiv = document.createElement('div');
			colDiv.setAttribute('class', colClassName);
			colDiv.setAttribute('style', 'background-color: rgba(255, 0, 0, 0.3); height: 100%;');
			gridOverlay.appendChild(colDiv);
		}
		var container = document.createElement('div');
		container.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999; pointer-events: none;');
		container.setAttribute('class', 'container');
		container.setAttribute('id', overlayId);

		container.appendChild(gridOverlay);
		window.document.body.appendChild(container);
	}
	function removeGrid() {
		var gridEl = document.getElementById(overlayId);
		gridEl.parentNode.removeChild(gridEl);
	}
	function initGrid() {
		if(urlHasGridQuery()) {
			showGrid();
		}
		addClickAreaForGrid();
	}

	var documentIsLoading = (document.readyState === 'loading');
	if(documentIsLoading) {
		document.addEventListener('DOMContentLoaded', initGrid);
	} else {
		initGrid();
	}
}());
