(function () {
  'use strict';

  angular
    .module('wargos')
    .factory('ModelParser', service);

  function service () {
    return {
      attendance: function (response) {
        response.forEach(function (item) {
          item.id = parseInt(item.id, 10);
          item.category = parseFloat(item.category);
          item.enabled = item.enabled === '1';
          item.create_date = new Date(item.create_date);
        });
        return item;
      }
    };
  }
})();
