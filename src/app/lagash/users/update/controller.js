export class LagashUsersUpdateController {

  constructor($state, WError, Users, user) {
    'ngInject';
    this.$state = $state;
    this.Users = Users;
    this.WError = WError;
    this.item = user;
  }

  update(item) {
    item.role = "admin";
    this.Users.update(item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.users.detail.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
