(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Toast', service);

  function service($mdToast) {

    var display = function(msg) {
      if (!msg) {
        throw new Error('msg is not defined');
      }
      $mdToast.show(
        $mdToast.simple(msg)
          .content(msg)
          .position('top right')
          // .position('bottom left')
          .hideDelay(3000)
      );
    };

    return {
      show: function(msg) {
        display(msg);
      }
    };
  }
})();
