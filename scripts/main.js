/*******************************************************************************
 *
 *  Project Name (Month YYYY or Version)
 *  Crafted with passion by Maciej Lamberski (http://lamberski.com).
 *
 ******************************************************************************/

var Site = {

  /**
   * Initialize implemented functions
   */
  init: function() {
    $("html")
    	.removeClass("no-js")
    	.addClass("js");

    Site.doSomething();
  },

  /**
   * Function doing something
   */
  doSomething: function() {

  }

};

$(document).ready(function() {
  Site.init();
});