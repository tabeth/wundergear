var DetailsTaskModel = function () {
  /* Observerables */
  var self = this;
  self.taskDetails = ko.observable();
  self.taskComments = ko.observable({'task_id': '', 'text': ''});
  self.subtasks = ko.observable({'task_id': '', 'title': ''});
  
  /* Helper functions */
  var saveTaskDetails = function(taskData, statusCode) {
    self.taskDetails(taskData);
  };

  var saveCommentDetails = function(taskCommentsData, statusCode) {
	self.taskComments(taskCommentsData);
  };
  
  var saveSubtaskDetails = function(subtasksData, statusCode) {
    self.subtasks(subtasksData);
  };
  
  self.changeData = function(property, attribute) {
    var oldTask = self.taskDetails();
    var newTask = oldTask;
  };

  WunderlistAPI.initialized.done(function() {
    WunderlistAPI.http.tasks.getID(localStorage.getItem('taskId'))
    .done(saveTaskDetails, saveCommentDetails, saveSubtaskDetails)
    .fail(function(resp, code) { });
  });


  self.swipeList = ko.observable();
  self.makeSwipeList = function(){
	 self.swipeList(tau.widget.SwipeList(listElement, {
		swipeTarget: "li",
		swipeElement: ".ui-swipelist",
	 })) ;
  };
  
  self.destroySwipeList = function() {
	 self.swipeList().destroy();
	 self.swipeList(null);
  };
 
};
///*global tau */
//(function(){
//
//	var page = document.getElementById( "swipelist" ),
//		listElement = page.getElementsByClassName( "ui-swipelist-list" )[0],
//		swipeList;
//
//	page.addEventListener( "pagebeforeshow", function() {
//		// make SwipeList object
//		swipeList = tau.widget.SwipeList( listElement, {
//			swipeTarget: "li",
//			swipeElement: ".ui-swipelist"
//		});
//	});
//
//	page.addEventListener( "pagebeforehide", function() {
//		// release object
//		swipeList.destroy();
//	});
//
//}());
//};
//
  
var detailsForTask = new DetailsTaskModel();
ko.applyBindings(DetailsTaskModel, document.getElementById('details-for-task'));
