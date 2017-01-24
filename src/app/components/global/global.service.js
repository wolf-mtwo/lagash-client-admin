(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Global', service);

  function service(Store) {
      // SERVICE PATH
      var PATH = 'http://localhost:5040';

      var start = function() {
        console.info('Starts the application!!');
        _service.user = Store.load('user');
        console.log(this);
      };

      var _service = {
        PATH: PATH,
        user: null,
        socket: false,
        start: start
      };
      return _service;
    }
})();
