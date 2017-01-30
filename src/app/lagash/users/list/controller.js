export class LagashUsersListController {

  constructor($state, WError, Users, users) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Users = Users;
    this.users = users;
  }

  delete(user, index) {
    this.Users.remove(user).$promise
    .then((response) => {
      this.users.splice(index, 1);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
