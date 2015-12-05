/*global tau */
(function(){
	var page = document.getElementById( "pageSmallCircleProgressBar" ),
		progressBar = document.getElementById("circleprogress"),
		minusBtn = document.getElementById("minus"),
		plusBtn = document.getElementById("plus"),
		resultDiv = document.getElementById("result"),
		progressBarWidget,
		resultText,
		pageBeforeShowHandler,
		pageHideHandler,
		i;

	function printResult() {
		resultText = progressBarWidget.value();
		resultDiv.innerHTML = resultText + "%";
	}

	function rotaryDetentHandler() {
		// Get rotary direction
		var direction = event.detail.direction,
		value = parseInt(progressBarWidget.value(), 10);

		if (direction === "CW") {
			// Right direction
			if (value < 100) {
				value++;
			} else {
				value = 100;
			}
		} else if (direction === "CCW") {
			// Left direction
			if (value > 0) {
				value--;
			} else {
				value = 0;
			}
		}
		progressBarWidget.value(value);
		printResult();
	}

	function clearVariables() {
		page = null;
		progressBar = null;
		minusBtn = null;
		plusBtn = null;
		resultDiv = null;
	}

	function minusBtnClickHandler() {
		i = i-10;
		if (i < 0) {
			i=0;
		}
		progressBarWidget.value(i);
		printResult();
	}

	function plusBtnClickHandler() {
		i = i+10;
		if (i > 100) {
			i=100;
		}
		progressBarWidget.value(i);
		printResult();
	}

	function unbindEvents() {
		page.removeEventListener("pageshow", pageBeforeShowHandler);
		page.removeEventListener("pagehide", pageHideHandler);
		if (tau.support.shape.circle) {
			document.removeEventListener("rotarydetent", rotaryDetentHandler);
		} else {
			minusBtn.removeEventListener("click", minusBtnClickHandler);
			plusBtn.removeEventListener("click", plusBtnClickHandler);
		}
	}

	pageBeforeShowHandler = function () {
		progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: "small"});
		if (tau.support.shape.circle) {
			// make Circle Progressbar object
			document.addEventListener("rotarydetent", rotaryDetentHandler);
		} else {
			minusBtn.addEventListener("click", minusBtnClickHandler);
			plusBtn.addEventListener("click", plusBtnClickHandler);
		}

		i = parseInt(progressBarWidget.value(), 10);
		resultDiv.innerHTML = i + "%";
	};

	pageHideHandler = function () {
		unbindEvents();
		clearVariables();
		// release object
		progressBarWidget.destroy();
	};

	page.addEventListener( "pagebeforeshow", pageBeforeShowHandler);
	page.addEventListener( "pagehide", pageHideHandler);
}());
