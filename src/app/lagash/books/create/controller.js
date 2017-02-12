export class LagashBooksCreateController {

  constructor($state, WError, Books, UUID) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.item = {
      uuid: UUID.next(),
      enabled : false,

      // fake
      inventory : 'lorem insum inventory dolor',
      code : 'lorem insum code dolor',
      title : 'lorem insum title dolor',
      isbn : 'lorem insum',
      description : 'lorem insum description dolor'
    };
  }

  register(item) {
    item.role = "admin";
    this.Books.save(item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.books.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
