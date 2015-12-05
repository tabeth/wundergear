/*global tau */
(function() {
	var page = document.getElementById("normalSliderPage"),
		sliderElement = page.querySelector("#normal");

	page.addEventListener("pagebeforeshow", function() {
		tau.widget.Slider(sliderElement);
	});
}());