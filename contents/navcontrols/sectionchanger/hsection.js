/*global tau */
(function() {

var page = document.getElementById( "hsectionchangerPage" ),
	changer = document.getElementById( "hsectionchanger" ),
	sectionChanger;

page.addEventListener( "pagebeforeshow", function() {
	// make SectionChanger object
	sectionChanger = tau.widget.SectionChanger(changer, {
		circular: false,
		orientation: "horizontal",
		useBouncingEffect: true
	});
});

page.addEventListener( "pagehide", function() {
	// release object
	sectionChanger.destroy();
});

}());
