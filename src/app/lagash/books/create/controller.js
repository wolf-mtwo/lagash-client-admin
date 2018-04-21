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
      enabled: false,
      tags: ['otros'],
      type: null,
      cover: null,
      illustrations: ['otros'],
      length: 0,
      width: 0,
      brings: ['otros'],
      pages: 0,
      year: 0,

      // fake
      title: 'lorem insum title dolor',
      isbn: 'lorem insum'
    };

    this.types =[{
      key: 'otros',
      value: 'Otros'
    }, {
      key: 'volumen',
      value: 'Volumen'
    }, {
      key: 'tomo',
      value: 'Tomo'
    }];

    this.covers = [{
      key: 'otros',
      value: 'Otros'
    }, {
      key: 'rustico',
      value: 'Rustico'
    }, {
      key: 'empastado',
      value: 'Empastado'
    }, {
      key: 'anillado',
      value: 'Anillado'
    }];

    this.illustrations = [{
      key: 'otros',
      value: 'Otros'
    }, {
      key: 'cuadros',
      value: 'Cuadros'
    }, {
      key: 'fotos',
      value: 'Fotos'
    }, {
      key: 'tablas',
      value: 'Tablas'
    }, {
      key: 'figuras',
      value: 'Figuras'
    }];

    this.brings = [{
      key: 'otros',
      value: 'Otros'
    }, {
      key: 'cd',
      value: 'CD'
    }];

    this.years = this.getYears();
    this.states = this.loadAll();
    this.searchText = null;
    this.selectedItem = null;
  }

  register(item) {
    var data = {};
    angular.copy(item, data);
    data.tags = data.tags.join(',');
    data.illustrations = data.illustrations.join(',');
    data.brings = data.brings.join(',');
    this.Books.save(data)
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

  getYears() {
    var date = new Date();
    var counter = date.getFullYear();
    this.item.year = counter;
    counter -= 5;
    var result = [];
    for (var i = 0; i < 10; i++) {
      result.push({
        key: counter,
        value: counter
      });
      counter++;
    }
    return result;
  }
}
