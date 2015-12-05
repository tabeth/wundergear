/*global tau */
(function(){

	var page = document.getElementById( "swipelist" ),
		listElement = page.getElementsByClassName( "ui-swipelist-list" )[0],
		swipeList;

	page.addEventListener( "pagebeforeshow", function() {
		// make SwipeList object
		swipeList = tau.widget.SwipeList( listElement, {
			swipeTarget: "li",
			swipeElement: ".ui-swipelist"
		});
	});

	page.addEventListener( "pagebeforehide", function() {
		// release object
		swipeList.destroy();
	});

}());
