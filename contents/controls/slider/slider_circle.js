/*global tau */
(function() {
	var page = document.getElementById("circleSliderPage"),
		sliderElement = page.querySelector("#circle");

	page.addEventListener("pagebeforeshow", function() {
		tau.widget.Slider(sliderElement);
	});
}());