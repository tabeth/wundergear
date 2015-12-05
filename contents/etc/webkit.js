/*jslint unparam: true */
(function() {
	var page = document.getElementById("page_webkitui");

	page.addEventListener("pagecreate", function(ev) {
		var btn = document.getElementById("button_webkitui_hiddendateopener"),
			itime = document.getElementById("input_webkitui_hiddentime"),
			val = document.getElementById("webkitui_hiddentime_value");
		btn.addEventListener("click", function(e) {
			itime.click();
		});
		itime.addEventListener("change", function(ev) {
			val.innerText = itime.value;
		});
	});

}());