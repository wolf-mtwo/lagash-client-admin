export class LagashUsersCreateController {

  constructor($state, Users, WError) {
    'ngInject';
    this.$state = $state;
    this.Users = Users;
    this.WError = WError;
    this.item = {
      name: 'wolf',
      email: 'wolf@wolf.com',
      cel: '70156988',
      password: 'wolf'
    };
  }

  register(item) {
    item.role = "admin";
    this.Users.save(item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.users.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
