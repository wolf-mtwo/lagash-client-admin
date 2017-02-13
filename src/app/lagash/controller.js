export class LagashController {

  constructor($state, $mdSidenav, Auth) {
    'ngInject';
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.Auth = Auth;
    this.options = [{
      title: 'Admintradores',
      route: 'lagash.users.list'
    }, {
      title: 'Libros',
      route: 'lagash.books.list'
    }];

    Auth.subcrive((user) => {
      this.user = user;
    });
  }

  selectOption(option) {
    if(!option) {
      throw new Error('option is empty');
    }
    this.$mdSidenav('left').close();
    this.$state.go(option.route);
  };
}
