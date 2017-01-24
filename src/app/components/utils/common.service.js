(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Common', service);

  function service($state, LocalError) {
    var model = null;
    var getModel = function() {
      if (!model) {
        throw new Error('model is empty');
      }
      return model;
    };

    var validator = function() {
    };

    return {
      init: function(localModel) {
        model = localModel;
      },
      validator: validator,
      save: function(item, callback) {
        getModel().save(item, function(response) {
          if (callback) {
            callback();
          }
        }, LocalError.request);
      }
    };
  }
})();
