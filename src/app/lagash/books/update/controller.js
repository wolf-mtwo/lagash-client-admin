export class LagashBooksUpdateController {

  constructor($state, WError, Books, UUID, Replicas, book, replicas) {
    'ngInject';
    this.book_id = $state.params.book_id;
    this.$state = $state;
    this.WError = WError;
    this.Books = Books;
    this.UUID = UUID;
    this.Replicas = Replicas;
    this.item = book;
    this.replicas = this.change_state(replicas);
    this.create_replica_state = false;
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

  save_replica(item) {
    console.log(this.book_id);
    item.book_id = this.book_id;
    item.state = "ENABLED"; // 1
    this.Replicas.save(item)
    .$promise
    .then((response) => {
      this.create_replica_state = true;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  change_state(replicas) {
    return replicas.map((item) => {
      item.state = this.get_state(item.state);
      return item;
    })
  }

  create_replica() {
    this.create_replica_state = true;
    this.replica_item = {
      _id: this.UUID.next()
    }
  }

  /*
  ENABLED = 1,
  DISABLED = 2,
  BOOKED = 3,
  BORROWED = 4
  */
  get_state(state) {
    switch (state) {
      case 1:
        return 'ENABLED';
        break;
      case 2:
        return 'DISABLED';
        break;
      case 3:
        return 'BOOKED';
        break;
      case 4:
        return 'BORROWED';
        break;
      default:
        // throw new Error('state is not defined');
        console.log('state is not defined');
    }
  }

}
