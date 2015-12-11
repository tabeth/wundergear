/* Tizen Initialization */
window.addEventListener( 'tizenhwkey', function( ev ) {
  if( ev.keyName === "back" ) {
    // TODO: Refactor this to be something else
    /* Load the first page/default page */

    var page = document.getElementsByClassName( 'ui-page-active' )[0],
      pageid = page ? page.id : "";
    if( pageid === "lists-view" ) {

      try {
        tizen.application.getCurrentApplication().exit();
      } catch (ignore) {}

    } else {
      window.history.back();
    }
  }
});
