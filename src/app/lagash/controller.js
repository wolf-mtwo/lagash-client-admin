export class LagashController {

  constructor($state, $mdSidenav, Auth, Sess) {
    'ngInject';
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.Auth = Auth;
    this.Sess = Sess;
    this.options = [{
      title: 'Usuarios',
      icon: 'person',
      route: 'lagash.users.list'
    }, {
      title: 'Libros',
      icon: 'book',
      route: 'lagash.books.list.main'
    }, {
      title: 'Thesis',
      icon: 'book',
      route: 'lagash.thesis.list.main'
    }, {
      title: 'Revistas',
      icon: 'book',
      route: 'lagash.magazines.list.main'
    }, {
      title: 'Periodico',
      icon: 'book',
      route: 'lagash.newspapers.list.main'
    }];

    Auth.subcrive((user) => {
      this.user = user;
    });
  }

  logout() {
    this.Sess.logout(() => {
        console.info('closed session');
        this.$state.go('home');
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
