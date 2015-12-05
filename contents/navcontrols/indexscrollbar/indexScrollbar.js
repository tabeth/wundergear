/*global tau */
/*jslint unparam: true */
(function() {
	var page = document.getElementById("pageIndexScrollbar"),
		listviewElement = document.getElementById("list1"),
		scroller,
		indexScrollbar;

	page.addEventListener("pageshow", function(ev) {
		var indexScrollbarElement = document.getElementById("indexscrollbar"),
			listDividers = listviewElement.getElementsByClassName("ui-listview-divider"),	// list dividers
			dividers = {},	// collection of list dividers
			indices = [],	// index list
			divider,
			i, idx;

		// For all list dividers,
		for(i = 0; i < listDividers.length; i++) {
			// Add the list divider elements to the collection
			divider = listDividers[i];
			idx = divider.innerText;
			dividers[idx] = divider;

			// Add the index to the index list
			indices.push(idx);
		}

		scroller = tau.util.selectors.getScrollableParent(listviewElement);

		// Create IndexScrollbar
		indexScrollbar = new tau.widget.IndexScrollbar(indexScrollbarElement, {index: indices, container: scroller});

		// Add IndexScrollbar index "select" event handler.
		indexScrollbarElement.addEventListener("select", function (ev) {
			var divider,
				idx = ev.detail.index;

			divider = dividers[idx];
			if (divider && scroller) {
				// Scroll to the ui-listview-divider element
				scroller.scrollTop = divider.offsetTop - scroller.offsetTop;
			}
		});
	});

	page.addEventListener("pagehide", function(ev) {
		indexScrollbar.destroy();
	});
} ());
