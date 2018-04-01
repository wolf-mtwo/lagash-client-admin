export class LagashUsersCreateController {

  constructor($state, Users, WError, UUID) {
    'ngInject';
    this.$state = $state;
    this.Users = Users;
    this.WError = WError;
    this.item = {
      _id: UUID.next(),
      name: 'wolf',
      email: 'wolf@wolf.com',
      cel: '70156988',
      password: 'wolf'
    };
  }

  register(item) {
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
