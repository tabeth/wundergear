(function() {
	var page = document.getElementById("selectorPage"),
		selector = document.getElementById("selector"),
		selectorComponent,
		clickBound;

	function onClick(event) {
		var activeItem = selector.querySelector(".ui-item-active"),
			target = event.target;
		//console.log(activeItem.getAttribute("data-title"));
		/*
		 * Default indicator class selector is "ui-selector-indicator".
		 * If you want to show custom indicator sample code,
		 * check the 'customIndicator.js' please.
		 */
		if (target.classList.contains("ui-selector-indicator")) {
			//console.log("Indicator clicked");
		}
	}
	page.addEventListener("pagebeforeshow", function() {
		clickBound = onClick.bind(null);
		selectorComponent = tau.widget.Selector(selector);
		selector.addEventListener("click", clickBound, false);
	});
	page.addEventListener("pagebeforehide", function() {
		selector.removeEventListener("click", clickBound, false);
		selectorComponent.destroy();
	});
})();