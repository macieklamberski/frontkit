(function ($) {

  var App = {

    /**
     * Initialize features
     */
    init: function () {
      App.feature();
    },

    /**
     * Custom feature
     */
    feature: function () {
      if(false) {console.log('test')}
    }
  };

  $(function () {
    App.init();
  });

})(jQuery);
