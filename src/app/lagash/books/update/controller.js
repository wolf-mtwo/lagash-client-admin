export class LagashBooksUpdateController {

  constructor($state, WError, WToast, Books, UUID, Ejemplares, book, ejemplares) {
    'ngInject';
    this.book_id = $state.params.book_id;
    this.$state = $state;
    this.WError = WError;
    this.WToast = WToast;
    this.Books = Books;
    this.UUID = UUID;
    this.Ejemplares = Ejemplares;
    this.item = book;
    this.ejemplares = ejemplares;
    // this.ejemplares = this.change_state(ejemplares);
    this.create_ejemplar_state = false;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete(book) {
    this.Books.remove(book).$promise
    .then((response) => {
      this.$state.go('lagash.books.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    item.role = "admin";
    this.Books.update(item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.books.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  save_ejemplar(item) {
    item.book_id = this.book_id;
    item.enabled = false;
    item.state = 'STORED'; // 0
    this.Ejemplares.save({}, item)
    .$promise
    .then((response) => {
      this.create_ejemplar_state = false;
      this.WToast.show('El ejemplar se guardo correctamente');
      // response.status = this.get_state(response.state);
      this.ejemplares.push(response);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  // change_state(ejemplares) {
  //   return ejemplares.map((item) => {
  //     item.status = this.get_state(item.state);
  //     return item;
  //   })
  // }

  create_ejemplar() {
    this.create_ejemplar_state = true;
    this.ejemplar_item = {
      _id: this.UUID.next(),
      index: this.getIndex()
    }
  }

  select_ejemplar(ejemplar) {
    this.$state.go('lagash.books.ejemplar', {
      book_id: this.book_id,
      ejemplar_id: ejemplar._id
    });
  }

  getIndex() {
    let existElement = (index) => {
      let result = false;
      this.ejemplares.map((item) => {
        if (item.index === index) {
          result = true;
        }
      })
      return result;
    };
    let count = 0;
    let isTrue = true;
    while(isTrue) {
      isTrue = existElement(++count);
    }
    return count;
  }

  /*
  ENABLED = 1,
  DISABLED = 2,
  BOOKED = 3,
  BORROWED = 4
  */
  // get_state(state) {
  //   switch (state) {
  //     case 1:
  //       return {
  //         key: 1,
  //         es: 'habilitado',
  //         value: 'ENABLED'
  //       };
  //       break;
  //     case 2:
  //       return {
  //         key: 2,
  //         es: 'deshabilitado',
  //         value: 'DISABLED'
  //       };
  //       break;
  //     case 3:
  //       return {
  //         key: 3,
  //         es: 'reservado',
  //         value: 'BOOKED'
  //       };
  //       break;
  //     case 4:
  //       return {
  //         key: 4,
  //         es: 'prestado',
  //         value: 'BORROWED'
  //       };
  //       break;
  //     default:
  //       console.log('state is not defined');
  //   }
  // }

  change_ejemplar_state(ejemplar) {
    this.Ejemplares.update(ejemplar)
    .$promise
    .then((response) => {
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
