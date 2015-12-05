/*global tau, JSON_DATA */
(function() {
	var page = document.getElementById("pageTestVirtualList"),
		elList = document.getElementById("vlist1"),
		vlist;

	page.addEventListener("pagebeforeshow", function() {
		vlist = tau.widget.VirtualListview(elList, {
			dataLength: JSON_DATA.length,
			bufferSize: 40,
			scrollElement: "ui-scroller"
		});

		// Update listitem
		vlist.setListItemUpdater(function(elListItem, newIndex) {
			//TODO: Update listitem here
			var data =  JSON_DATA[newIndex];
			elListItem.innerHTML = '<span class="ui-li-text-main">' + data.NAME+'</span>';
		});
		// Draw child elements
		vlist.draw();
	});
	page.addEventListener("pagehide", function() {
		// Remove all children in the vlist
		vlist.destroy();

	});

}());
