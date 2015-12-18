MainModel = function () {
  var self = this;

  /* Observerables */
  self.screenTitle = ko.observable('Main Menu');
  self.lists = ko.observableArray();
  self.loaded = ko.observable(false);

  self.hideProcessing = function() {
      var page = event.target;
      var processing = page.querySelector(".ui-processing");
      processing.style.visibility = "hidden";
  };

  self.showProcessing = function() {
      var page = event.target;
      var processing = page.querySelector(".ui-processing");
      processing.style.visibility = "";
  };
  
  var saveLists = function(loadedLists) {
    mappedLists = loadedLists.map(function(l) { return { title: l.title, id: l.id }; });
    self.lists(mappedLists);
    self.loaded(true);
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

