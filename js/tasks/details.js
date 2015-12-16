var DetailsTaskModel = function () {
    /* Observerables */
    var self = this;
    self.taskId = localStorage.getItem('taskId');
    self.taskDetails = ko.observable({'task_id': '', 'title': ''});
    self.taskComments = ko.observableArray();
    self.taskSubtasks = ko.observableArray();
    self.taskSubtasks.extend({ notify: 'always' });
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
	.done(function(taskComments, statusCode){ self.taskComments(taskComments); })
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


    /* Task actions */

    self.toggleTask = function() {
	var currentTask = self.taskDetails();
	var taskId = currentTask.id;
	var revision = currentTask.revision;
	currentTask.completed = currentTask.completed === true ? false : true;
	WunderlistAPI.http.tasks.update(taskId, revision, currentTask)
	    .done(function() {
    	    	currentTask.revision += 1;
	    	self.taskDetails(currentTask);
	    })

	    .fail(function(resp, code) {} );

    };

    self.starTask = function() {
	var currentTask = self.taskDetails();
	var taskId = currentTask.id;
	var revision = currentTask.revision;
	currentTask.starred = currentTask.starred === true ? false : true;
	WunderlistAPI.http.tasks.update(taskId, revision, currentTask)
	    .done(function() {
    	    	currentTask.revision += 1;
	    	self.taskDetails(currentTask);
	    })

	    .fail(function(resp, code) {} );

    };

    self.deleteTask = function() {

    };

    /* Subtask actions */
    self.toggleSubtask = function() {
	var currentSubtask = self.taskSubtasks()[self.subtaskIndex()];
	var subtaskObservable = currentSubtask;
	var revision = currentSubtask.revision;
	var subtaskId = currentSubtask.id;
	currentSubtask.completed = currentSubtask.completed === true ? false : true;
    	WunderlistAPI.http.subtasks.update(subtaskId, revision, currentSubtask)
    	    .done(function() {
    	    	// Naive force update of DOM
    	    	self.taskSubtasks.remove(currentSubtask);
    	    	currentSubtask.revision += 1;
    	    	self.taskSubtasks.push(currentSubtask);
	    })

	    .fail(function(resp, code) {});

	
    };

    self.subtaskIndex = ko.observable();
    self.setCurrentSubtask = function(index) {
    	self.subtaskIndex(index);
    };

    self.deleteSubtask = function() {
    	var currentSubtask = self.taskSubtasks()[self.subtaskIndex()];
    	var subtaskId = currentSubtask.id;
    	var revision = currentSubtask.revision;
    	WunderlistAPI.http.subtasks.deleteID(subtaskId, revision)
    	    .done(function() {
    	    	self.taskSubtasks.remove(currentSubtask);
	    })

	    .fail(function(resp, code) {});

    };

    /* Comments actions */
    self.commentIndex = ko.observable();
    self.setCurrentComment = function(index) {
    	self.commentIndex(index);
    };

    self.deleteComment = function() {
    	var currentComment = self.taskComments()[self.commentIndex()];
    	var commentID = currentComment.id;
    	var revision = currentComment.revision;
    	WunderlistAPI.http.task_comments.deleteID(commentID, revision)
    	    .done(function() {
    	    	self.taskComments.remove(currentComment);
	    })
	    
	    .fail(function(resp, code) {});
    };


    /* Animations for tab switching */
    function clickHandler(event) {
	tau.openPopup(popup);
    }

    // Options popup handling
    var page = document.querySelector("#details-for-task");
    var popup = page.querySelector("#task-options-popup");
    var handler = page.querySelector(".ui-more");
    var clickHandlerBound = null;
    var radius = window.innerHeight/2 * 0.8;

    self.sectionChanger = ko.observable();
    self.changer = document.getElementById('tabsectionchanger');
    self.setupAnimations = function() {
	self.sectionChanger(
		tau.widget.SectionChanger(self.changer, {
		    circular: true,
		    orientation: 'horizontal',
		    scrollbar: 'tab'
		})
	);

	clickHandlerBound = clickHandler.bind(null);
	handler.addEventListener("click", clickHandlerBound);
    };

    self.takeDownAnimations = function() {
	self.sectionChanger().destroy();
	self.sectionChanger(null);
    };

    self.removeListener = function() {
	handler.removeEventListener("click", clickHandlerBound);
    };

};

var detailsForTask = new DetailsTaskModel();
ko.applyBindings(DetailsTaskModel, document.getElementById('details-for-task'));
