var DetailsTaskModel = function () {
    /* Observerables */
    var self = this;
    self.taskId = localStorage.getItem('taskId');
    self.taskDetails = ko.observable({'task_id': '', 'title': ''});
    self.taskComments = ko.observableArray();
    self.taskSubtasks = ko.observableArray();
    self.cleanDate = function(dirtyDate) {
    	return new Date(dirtyDate).toLocaleString();
    };

    /* Helper functions */
    var saveTaskDetails = function() {
	WunderlistAPI.http.tasks.getID(self.taskId)
	.done(function(taskDetails, statusCode){ self.taskDetails(taskDetails); })
	.fail(function(resp, code) { });
    };

    var saveCommentDetails = function() {
    	WunderlistAPI.http.task_comments.forTask(self.taskId)
	.done(function(taskComments, statusCode){ debugger; self.taskComments(taskComments); })
	.fail(function(resp, code) { });
    };

    var saveSubtaskDetails = function() {
    	WunderlistAPI.http.subtasks.forTask(self.taskId)
	.done(function(subtasks, statusCode){ self.taskSubtasks(subtasks); })
	.fail(function(resp, code) { });
    };

    self.changeData = function(property, attribute) {
	var oldTask = self.taskDetails();
	var newTask = oldTask;
    };

    WunderlistAPI.initialized.done(function() {
    	saveTaskDetails();
    	saveCommentDetails();
    	saveSubtaskDetails();
    });

    self.sectionChanger = ko.observable();
    self.changer = document.getElementById('tabsectionchanger');
    self.makeSectionChanger = function() {
	self.sectionChanger(
		tau.widget.SectionChanger(self.changer, {
		    circular: true,
		    orientation: 'horizontal',
		    scrollbar: 'tab'
		})
	);
    };

    self.destroySectionChanger = function() {
	self.sectionChanger().destroy();
	self.sectionChanger(null);
    };

};

    var detailsForTask = new DetailsTaskModel();
    ko.applyBindings(DetailsTaskModel, document.getElementById('details-for-task'));
