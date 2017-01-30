export class LagashUsersController {

  constructor($state, WError, users) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.users = users;
  }
}
