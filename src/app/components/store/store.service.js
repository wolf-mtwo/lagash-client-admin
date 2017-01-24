(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Store', service);

  function service() {
    var validateKey = function(key) {
      if (!key) {
        throw new Error('key is undefined');
      }
    };

    return {
      save: function(key, value, state) {
        validateKey(key);
        if (!value) {
          throw new Error('value is undefined');
        }
        if (state) {
          localStorage.setItem(key, value);
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
      },
      load: function(key, state) {
        validateKey(key);
        if (state) {
            return localStorage.getItem(key);
        }
        return JSON.parse(localStorage.getItem(key));
      },
      remove: function(key) {
        validateKey(key);
        localStorage.removeItem(key);
      }
    };
  }
})();
