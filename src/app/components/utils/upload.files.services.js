(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('UploadFiles', service);

  function service($state, Upload, Toast, LocalError, Global) {
    var local_scope = null;

    var STORE_PATH = Global.PATH + '/p1/files/upload';
    var FILE_PATH = Global.PATH + '/public/files/';

    var importCallback = null;
    // var add_current_image = function(setImportCallback) {
    //   if (image) {
    //     local_scope.current_image = IMAGE_PATH + image;
    //   }
    // };

    return {
      FILE_PATH: FILE_PATH,
      init: function(scope) {
        local_scope = scope;
      },
      setImportCallback: function(callback) {
        importCallback = callback;
      },
      upload: function(file) {
        var count = 0;
        Upload.upload({
              url: STORE_PATH,
              data: {avatar: file}
          }).then(function (resp) {
            var data = resp.data;
            console.log(data);
            local_scope.item.file = data.file_name;
            // Load data
            importCallback();
          }, function (resp) {
              LocalError.display(resp.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              var msg = 'progress: ' + progressPercentage + '% ';
              Toast.show(msg);
          });
      },
      // loadImage: function(imageName) {
      //   imageName = imageName || 'default-person.png';
      //   return IMAGE_PATH + imageName;
      // },
      // loadImageGroup: function(imageName) {
      //   imageName = imageName || 'default-people.jpg';
      //   return IMAGE_PATH + imageName;
      // }
    };
  }
})();
