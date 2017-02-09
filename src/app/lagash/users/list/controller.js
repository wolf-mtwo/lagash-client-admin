export class LagashUsersListController {

  constructor($state, WError, Users, users) {
    'ngInject';
    this.$state = $state;
    // this.WError = WError;
    // this.Users = Users;
    this.users = users;
  }

  select(user) {
    this.$state.go('lagash.users.preview', {
      user_id: user._id
    });
  }
}
