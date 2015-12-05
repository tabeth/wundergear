var DetailsTaskModel = function () {
  /* Popup listeners */
  var page = document.getElementById('details-for-task');
  var optionsPopup = document.getElementById('options-popup');
  var popup = page.querySelector("#moreoptionsPopup");
  var handler = page.querySelector(".ui-more");
  var selector;
  var clickHandlerBound;
  function clickHandler(event) { tau.openPopup(optionsPopup); };

  page.addEventListener( "pagebeforeshow", function() {
    var radius = window.innerHeight / 2 * 0.8;

    clickHandlerBound = clickHandler.bind(null);
    handler.addEventListener("click", clickHandlerBound);
    if (tau.support.shape.circle) {
      selector = tau.widget.Selector(elSelector, {itemRadius: radius});
    }
  });

  page.addEventListener( "pagebeforehide", function() {
    handler.removeEventListener("click", clickHandlerBound);
    if (tau.support.shape.circle) {
      selector.destroy();
    }
  });

  /* Observerables */
  self.taskDetails = ko.observable();
  var saveTaskDetails = function(taskData, statusCode) {
    self.taskDetails(taskData);
  };

  self.changeData = function(property, attribute) {
    debugger;
    var oldTask = self.taskDetails();
    var newTask = oldTask;
  };

  WunderlistAPI.initialized.done(function() {
    WunderlistAPI.http.tasks.getID(localStorage.getItem('taskId'))
    .done(saveTaskDetails)
    .fail(function(resp, code) { });
  });

};

var detailsForTask = new DetailsTaskModel();
ko.applyBindings(DetailsTaskModel, document.getElementById('details-for-task'));
