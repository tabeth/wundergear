(function() {
	var page = document.getElementById("customIndicatorPage"),
		selector = document.getElementById("selector"),
		indicator = page.querySelector(".custom-indicator"),
		mainText = indicator.querySelector(".main-text"),
		subText = indicator.querySelector(".sub-text");

	page.addEventListener("pagebeforeshow", function() {
		tau.widget.Selector(selector);
	});
	selector.addEventListener("selectoritemchange", function(event) {
		var layerIndex = event.detail.layerIndex,
			title = event.detail.title;
		mainText.textContent = title;
		subText.textContent = "Layer index " + layerIndex;
	});
	indicator.addEventListener("click", function() {
		//console.log("click");
	});
})();