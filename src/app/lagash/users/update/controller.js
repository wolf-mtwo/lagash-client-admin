export class LagashUsersUpdateController {

  constructor($state, WError, Users, user) {
    'ngInject';
    this.$state = $state;
    this.Users = Users;
    this.WError = WError;
    this.item = user;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete(user) {
    this.Users.remove(user).$promise
    .then((response) => {
      this.$state.go('lagash.users.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    item.role = "admin";
    this.Users.update(item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.users.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
