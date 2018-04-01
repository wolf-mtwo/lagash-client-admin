export class LagashUsersListController {

  constructor($state, WError, users) {
    'ngInject';
    this.$state = $state;
    this.users = users;
  }

  select(user) {
    this.$state.go('lagash.users.preview', {
      user_id: user._id
    });
  }
}
