export class ImageService {

  constructor(Global, Upload, WToast) {
    'ngInject';
    this.Global = Global;
    this.Upload = Upload;
    this.WToast = WToast;
    this.STORE_PATH = this.Global.PATH + '/v1/upload';
  }

  upload(file, callback) {
    if (!callback) {
      throw new Error('callback is undefined');
    }
    let self = this;
    self.Upload.upload({
        url: self.STORE_PATH,
        data: { avatar: file }
    })
    .then(function (resp) {
      var data = resp.data;
      data.url = self.Global.PATH + '/files/originales/' + data.name;
      callback(data);
    }, function (resp) {
        self.WToast.show(resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        var msg = 'progress: ' + progressPercentage + '% ';
        self.WToast.show(msg);
    });
  }

  getPath(name) {
    if (!name) {
      throw new Error('name is undefined');
    }
    return this.Global.PATH + '/files/originales/' + name;
  }
}
