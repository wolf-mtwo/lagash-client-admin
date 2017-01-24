(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('CommonToolbar', service);

  function service($state) {
    var scope = null;
    var getScope = function () {
      if (!scope) {
        throw new Error('model is empty');
      }
      return scope;
    };

    return {
      init: function(localScope) {
        scope = localScope;
      },
      add_label: function(position, item) {
        if (!position) {
          throw new Error('position is empty');
        }
        if (!item) {
          throw new Error('item is empty');
        }
        position = position > 0 ? --position : 0;
        getScope().labels[position] = item;
        for (var i = 0; i < getScope().labels.length; i++) {
          if (i > position) {
            getScope().labels.splice(i, 1);
          }
        }
      }
    };
  }
})();
