/*******************************************************************************
 *
 *  Frontizer (v1.0.0)
 *  Crafted with passion by Maciek Lamberski (http://lamberski.com).
 *
 ******************************************************************************/

var Frontizer = {

  /**
   * Initialize implemented functions
   */
  init: function() {
    Frontizer.includeCSS();
    Frontizer.includeNavigator();
  },

  includeCSS: function() {
    if ($("link[href^=frontizer]").length == 0) {
      $("body").append("<link rel='stylesheet' href='frontizer/frontizer.css'>");
    }
  },

  includeNavigator: function() {
    var file = window.location.toString().split("/").pop();

    $.post("frontizer/index.php?file=" + file, function(data) {
      $("body").append($(data)
        .css({"left": -100, "opacity": 0})
        .animate({"left": 0, "opacity": .8}, 250)
      );
    });
  }

};

$(document).ready(function() {
  Frontizer.init();
});