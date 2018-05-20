import LagashHelpers from './helpers/module';

// thesis
import { Thesis } from './thesis/thesis.service';
import { ThesisOption } from './thesis/option.service';
import { ThesisEjemplares } from './thesis/ejemplares.service';
// books
import { Books } from './books/books.service';
import { BookOption } from './books/option.service';
import { BooksEjemplares } from './books/ejemplares.service';
import { BooksCatalog } from './books/catalog.service';

import { Author } from './author.service';
import { Editorial } from './editorial.service';
import { AuthorMap } from './author.map.service';
import { EditorialMap } from './editorial.map.service';

import { Ejemplares } from './history/ejemplares.service';

angular.module('wolf.lagash.services', [
  'wolf.lagash.helpers'
])
// thesis
.service('Thesis', Thesis)
.service('ThesisOption', ThesisOption)
.service('ThesisEjemplares', ThesisEjemplares)
// books
.service('Books', Books)
.service('BookOption', BookOption)
.service('BooksEjemplares', BooksEjemplares)
.service('BooksCatalog', BooksCatalog)

.service('Author', Author)
.service('Editorial', Editorial)
.service('AuthorMap', AuthorMap)
.service('Ejemplares', Ejemplares)
.service('EditorialMap', EditorialMap)
.run(($log) => {
  $log.debug('run lagash end');
});
