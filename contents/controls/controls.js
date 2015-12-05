(function(){
	var toggleSwitch = document.getElementById("toggleControl"),
		toggleSubText = document.getElementsByClassName("ui-switch-sub-text")[0],
		checkbox = document.getElementById("checkboxControl"),
		checkboxSubText = document.getElementsByClassName("checkbox-sub-text")[0],
		r1 = document.getElementById("radioControl1"),
		r2 = document.getElementById("radioControl2"),
		radioSubText = document.getElementsByClassName("radio-sub-text")[0];

	if (toggleSwitch) {
		toggleSwitch.addEventListener("change", function(){
			toggleSubText.innerText =
				toggleSwitch.checked === true ? "On" : "Off";
		});
	}

	if (checkbox) {
		checkbox.addEventListener("change", function(){
			checkboxSubText.innerText =
				checkbox.checked === true ? "Checked" : "Unchecked";
		});
	}

	if (r1&&r2) {
		r1.addEventListener("change", function(){
			radioSubText.innerText =
				r1.checked ? "Radio 1" : "";
		});
		r2.addEventListener("change", function(){
			radioSubText.innerText =
				r2.checked ? "Radio 2" : "";
		});
	}

}());
