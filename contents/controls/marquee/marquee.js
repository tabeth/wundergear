/*global tau */
(function() {
	var page = document.getElementById("marqueeTest"),
		marqueeEl = document.getElementById("marquee"),
		startBtn = document.getElementById("start"),
		resetBtn = document.getElementById("reset"),
		startFlag = true,
		marqueeWidget,
		pageShowHandler,
		pageHideHandler;

	function clearVariables () {
		page = null;
		marqueeEl = null;
		startBtn = null;
		resetBtn = null;
		marqueeWidget = null;
	}

	function marqueeEndHandler () {
		startFlag = false;
		startBtn.textContent = "START";
		console.log("marquee end!");
	}

	function marqueeStartHandler () {
		startFlag = true;
		console.log("marquee Start!");
	}

	function marqueeStoppedHandler () {
		startFlag = false;
		console.log("marquee Stopped!");
	}

	function marqueeStartandStop () {
		if (startFlag) {
			startBtn.textContent = "START";
			marqueeWidget.stop();
		} else {
			startBtn.textContent = "STOP";
			marqueeWidget.start();
		}
	}

	function marqueeReset () {
		startBtn.textContent = "START";
		marqueeWidget.reset();
	}

	function bindEvents () {
		marqueeEl.addEventListener("marqueeend", marqueeEndHandler);
		marqueeEl.addEventListener("marqueestart", marqueeStartHandler);
		marqueeEl.addEventListener("marqueestopped", marqueeStoppedHandler);
		startBtn.addEventListener("vclick", marqueeStartandStop);
		resetBtn.addEventListener("vclick", marqueeReset);
	}

	function unbindEvents () {
		page.removeEventListener("pageshow", pageShowHandler);
		page.removeEventListener("pagehide", pageHideHandler);
		startBtn.removeEventListener("vclick", marqueeStartandStop);
		resetBtn.removeEventListener("vclick", marqueeReset);
		marqueeEl.removeEventListener("marqueeend", marqueeEndHandler);
		marqueeEl.removeEventListener("marqueestart", marqueeStartHandler);
		marqueeEl.removeEventListener("marqueestopped", marqueeStoppedHandler);
	}

	pageShowHandler = function () {
		bindEvents();
		marqueeWidget = new tau.widget.Marquee(marqueeEl);
	};

	pageHideHandler = function() {
		marqueeWidget.destroy();
		unbindEvents();
		clearVariables();
	};

	page.addEventListener("pageshow", pageShowHandler, false);
	page.addEventListener("pagehide", pageHideHandler, false);
}());

