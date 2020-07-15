export class LagashController {

  constructor($state, $mdSidenav, $log, Auth, Sess) {
    'ngInject';
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;
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
      route: 'lagash.magazines.subscriptions.main'
    }, {
      title: 'Periodico',
      icon: 'book',
      route: 'lagash.newspapers.subscriptions.main'
    }, {
      title: 'Inventario',
      icon: 'reorder',
      route: 'lagash.inventories.books'
    }, {
      title: 'Prestamos',
      icon: 'reorder',
      route: 'lagash.booking.loans'
    }];

    this.references = [{
      title: 'Autores',
      icon: 'directions_walk',
      route: 'lagash.authors.list.main'
    }, {
      title: 'Tutores',
      icon: 'gavel',
      route: 'lagash.tutors.list.main'
    }, {
      title: 'Editoriales',
      icon: 'my_library_books',
      route: 'lagash.editorials.list.main'
    }, {
      title: 'Lectores',
      icon: 'directions_walk',
      route: 'lagash.readers.list.main'
    }];

    this.configurations = [{
      title: 'Usuarios',
      icon: 'people',
      route: 'lagash.users.list'
    }, {
      title: 'Perfil',
      icon: 'person',
      route: 'lagash.profile'
    }];

    Auth.subcrive((user) => {
      this.user = user;
    });
  }

  logout() {
    this.Sess.logout(() => {
      this.$log.info('closed session');
      this.$state.go('home');
    });
  }

  selectOption(option) {
    if(!option) {
      throw new Error('option is empty');
    }
    this.$mdSidenav('left').close();
    this.$state.go(option.route);
  }
}
