(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Dialog', service);

  function service($mdDialog) {
    return {
      removeItem: function(ev, okCallback, noCallback) {
        var confirm = $mdDialog.confirm()
              .title('Estas de acuerdo en eliminar?')
              .content('se perderan todos los datos.')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('SI')
              .cancel('NO');
        $mdDialog.show(confirm).then(
          okCallback, noCallback);
      }
    };
  }
})();
