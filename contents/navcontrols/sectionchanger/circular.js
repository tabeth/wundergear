/*global tau */
(function() {

var page = document.getElementById( "circularSectionchangerPage" ),
	changer = document.getElementById( "circularSectionchanger" ),
	sectionChanger;

page.addEventListener( "pagebeforeshow", function() {
	// make SectionChanger object
	sectionChanger = tau.widget.SectionChanger(changer, {
		circular: true,
		orientation: "horizontal"
	});
});

page.addEventListener( "pagehide", function() {
	// release object
	sectionChanger.destroy();
});
}());
