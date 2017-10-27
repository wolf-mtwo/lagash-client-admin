export class LagashBooksCreateController {

  constructor($timeout, $q, $state, WError, Books, UUID) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.$q = $q;
    this.$timeout = $timeout;
    this.item = {
      _id: UUID.next(),
      enabled : false,

      // fake
      inventory : 'lorem insum inventory dolor',
      code : 'lorem insum code dolor',
      title : 'lorem insum title dolor',
      isbn : 'lorem insum',
      description : 'lorem insum description dolor'
    };

    this.states = this.loadAll();
    this.searchText = null;
    this.selectedItem = null;
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

  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  querySearch(query) {
    var results = query ? this.states.filter(this.createFilterFor(query)) : this.states;
    var deferred = this.$q.defer();
    this.$timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
    return deferred.promise;
  }

  /**
   * Build `states` list of key/value pairs
   */
  loadAll() {
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
            Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
            Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
            Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
            North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
            South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
            Wisconsin, Wyoming';

    return allStates.split(/, +/g).map( function (state) {
      return {
        value: state.toLowerCase(),
        display: state
      };
    });
  }

  /**
   * Create filter function for a query string
   */
  createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  }
}
