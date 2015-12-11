MainModel = function () {
  var self = this;

  /* Observerables */
  self.screenTitle = ko.observable('Main Menu');
  self.lists = ko.observableArray();
  self.loaded = ko.observable(false);
  
  
  var saveLists = function(loadedLists) {
    mappedLists = loadedLists.map(function(l) { return { title: l.title, id: l.id }; });
    self.lists(mappedLists);
  };

  WunderlistAPI.initialized.done(function() {
    WunderlistAPI.http.lists.all()
    .done(saveLists)
    .fail(function(e) {
      // TODO: Display Tizen pop up showing this
    });

  });
  
  self.showTasksForList = function(listId, listTitle){
    localStorage.setItem('listId', listId);
    localStorage.setItem('listTitle', listTitle);
  }
};

window.onload = function() {
	var wunderGear = new MainModel();
	ko.applyBindings(wunderGear, document.getElementById('lists-view'));	
};

