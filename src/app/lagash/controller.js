export class LagashController {

  constructor($state, $mdSidenav, Auth, Sess) {
    'ngInject';
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.Auth = Auth;
    this.Sess = Sess;
    this.options = [{
      title: 'Libros',
      icon: 'book',
      route: 'lagash.books.list.main'
    }, {
      title: 'Tesis',
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
    }, {
      title: 'Inventario',
      icon: 'reorder',
      route: 'lagash.newspapers.list.main'
    }];

    this.references = [{
      title: 'Autores',
      icon: 'directions_walk',
      route: 'lagash.authors.list.main'
    }, {
      title: 'Tutores',
      icon: 'directions_walk',
      route: 'lagash.newspapers.list.main'
    }, {
      title: 'Editorialses',
      icon: 'my_library_books',
      route: 'lagash.editorials.list.main'
    }];

    this.configurations = [{
      title: 'Usuarios',
      icon: 'people',
      route: 'lagash.users.list'
    }, {
      title: 'Perfil',
      icon: 'person',
      route: 'lagash.users.list'
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
