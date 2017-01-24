(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('UploadImages', service);

  function service($state, Upload, Toast, LocalError, Global) {
    var local_scope = null;

    var STORE_PATH = Global.PATH + '/p1/photos/upload';
    var IMAGE_PATH = Global.PATH + '/public/images/';

    var add_current_image = function(image) {
      if (image) {
        local_scope.current_image = IMAGE_PATH + image;
      }
    };

    return {
      init: function(scope) {
        local_scope = scope;
      },
      add_current_image: add_current_image,
      upload: function(file) {
        var count = 0;
        Upload.upload({
              url: STORE_PATH,
              data: {avatar: file}
          }).then(function (resp) {
            var data = resp.data;
            local_scope.item.image = data.file_name;
            // Load image
            add_current_image(data.file_name);
          }, function (resp) {
              LocalError.display(resp.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              var msg = 'progress: ' + progressPercentage + '% ';
              Toast.show(msg);
          });
      },
      loadImage: function(imageName) {
        imageName = imageName || 'default-person.png';
        return IMAGE_PATH + imageName;
      },
      loadImageGroup: function(imageName) {
        imageName = imageName || 'default-people.jpg';
        return IMAGE_PATH + imageName;
      }
    };
  }
})();
