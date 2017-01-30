export class LagashHomeController {

  constructor($state, WError, Session, Sess) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Session = Session;
    this.Sess = Sess;
  }
}
