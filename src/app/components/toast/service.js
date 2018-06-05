export class WToast {

  constructor($mdToast) {
    'ngInject';
    this.$mdToast = $mdToast;
  }

  show(msg) {
    if (!msg) {
      throw new Error('msg is not defined');
    }
    this.$mdToast.show(
      this.$mdToast.simple(msg)
      .content(msg)
      .position('top right')
      .hideDelay(3000)
    );
  }
}
