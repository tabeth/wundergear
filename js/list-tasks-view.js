ListTasksModel = function () {
  /* Observables */
  var self = this;
  self.listTitle = ko.observable(localStorage.getItem('listTitle'));
  self.tasks     = ko.observable();

  self.showDetailsForTask = function(id) {
    localStorage.setItem('taskId', id);
  };

  var saveTasks = function(tasksData, statuscode){
    mappedTasks = tasksData.map(function(t){
      return {
        title: t.title,
        id: t.id,
        due_date: t.due_date,
      }; 
    });

    self.tasks(mappedTasks);
  };

  WunderlistAPI.initialized.done(function() {
    WunderlistAPI.http.tasks.forList(localStorage.getItem('listId'))
    .done(saveTasks)
    .fail(function(resp, code) { });
  });


};

var tasksForList = new ListTasksModel();
ko.applyBindings(tasksForList, document.getElementById('tasks-for-list-view'));
