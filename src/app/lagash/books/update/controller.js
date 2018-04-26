export class LagashBooksUpdateController {

  constructor($state, WError, WToast, Books, UUID, Ejemplares, book, Author, Editorial, AuthorMap, EditorialMap, ejemplares, BookOption) {
    'ngInject';
    this.book_id = $state.params.book_id;
    this.$state = $state;
    this.WError = WError;
    this.WToast = WToast;
    this.Books = Books;
    this.AuthorMap = AuthorMap;
    this.EditorialMap = EditorialMap;
    this.UUID = UUID;
    this.Ejemplares = Ejemplares;

    this.ejemplares = ejemplares;
    this.create_ejemplar_state = false;

    this.authors = [];
    this.editorials = [];

    this.types = BookOption.types;
    this.covers = BookOption.covers;
    this.illustrations = BookOption.illustrations;
    this.brings = BookOption.brings;
    this.years = BookOption.getYears();

    book.tags = book.tags ? book.tags.split(',') : null;
    book.illustrations = book.illustrations ? book.illustrations.split(',') : null;
    book.brings = book.brings ? book.brings.split(',') : null;
    this.item = book;

    // Editorial
    Author.find_authors({
      resource_id: this.book_id
    }).$promise
    .then((res) => {
      // this.$state.go('lagash.books.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete(book) {
    this.Books.remove({
      _id: item._id
    }, book).$promise
    .then((response) => {
      this.$state.go('lagash.books.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    item.role = "admin";
    this.Books.update({
      _id: item._id
    }, item)
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
    this.Ejemplares.save({
      book_id: this.book_id
    }, item).$promise
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

  change_ejemplar_state(ejemplar) {
    this.Ejemplares.update(ejemplar).$promise
    .then((response) => {
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  toggle(item, list) {
    var idx = list.indexOf(item.key);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item.key);
    }
  }

  exists(item, list) {
    return list.indexOf(item.key) > -1;
  }
}
