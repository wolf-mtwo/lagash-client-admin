export class LagashUsersController {

  constructor($state, WError, users) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.users = users;
  }

  select(user) {
    this.$state.go('lagash.users.update', {
      user_id: user._id
    });
  }
}
