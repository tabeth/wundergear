/*global tau */
(function() {
	var page = document.getElementById("pageMarqueeList"),
		elScroller,
		listHelper;

	page.addEventListener( "pagebeforeshow", function() {
		var list;

		elScroller = page.querySelector(".ui-scroller");
		if (elScroller) {
			list = elScroller.querySelector(".ui-listview")
		}

		if (elScroller && list) {
			listHelper = tau.helper.SnapListMarqueeStyle.create(list, {
				marqueeDelay: 1000
			});

			tau.widget.SnapListview(list);

			elScroller.setAttribute("tizen-circular-scrollbar", "");
		}
	});

	page.addEventListener( "pagebeforehide", function() {
		if (listHelper) {
			listHelper.destroy();
			listHelper = null;
			if(elScroller) {
				elScroller.removeAttribute("tizen-circular-scrollbar");
			}
		}
	});

}());
