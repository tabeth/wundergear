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

  self.addList = function() {
	  // TODO: Implement
  }
  
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
 
  
	/* Animations for tab switching */
    function clickHandler(event) {
    	console.log('event');
    	tau.openPopup(popup);
    }
    
    // Options pop up handling
    var page = document.querySelector("#lists-view");
    var popup = page.querySelector("#main-options-popup");
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

window.onload = function() {
	var wunderGear = new MainModel();
	ko.applyBindings(wunderGear, document.getElementById('lists-view'));	
};

