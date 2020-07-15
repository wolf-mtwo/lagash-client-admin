import LagashHelpers from './helpers/module';

// thesis
import { Thesis } from './thesis/thesis.service';
import { ThesisOption } from './thesis/option.service';
import { ThesisEjemplares } from './thesis/ejemplares.service';
import { ThesisCatalog } from './thesis/catalog.service';
// books
import { Books } from './books/books.service';
import { BookOption } from './books/option.service';
import { BooksEjemplares } from './books/ejemplares.service';
import { BooksCatalog } from './books/catalog.service';
// magazines
import { Magazines } from './magazines/magazines.service';
import { MagazineOption } from './magazines/option.service';
import { MagazinesEjemplares } from './magazines/ejemplares.service';
import { MagazinesCatalog } from './magazines/catalog.service';
// newspapers
import { Newspapers } from './newspapers/newspapers.service';
import { NewspaperOption } from './newspapers/option.service';
import { NewspapersEjemplares } from './newspapers/ejemplares.service';
import { NewspapersCatalog } from './newspapers/catalog.service';

import { Carrers } from './faculties/carrers.service';
import { Faculties } from './faculties/faculties.service';

import { Tutors } from './tutors.service';
import { Authors } from './authors.service';
import { Editorials } from './editorials.service';
import { Readers } from './readers.service';
import { AuthorsMap } from './authors.map.service';
import { EditorialsMap } from './editorials.map.service';

import { Ejemplares } from './history/ejemplares.service';
import { Booking } from './history/booking.service';

angular.module('wolf.lagash.services', [
  'wolf.lagash.helpers'
])
// thesis
.service('Thesis', Thesis)
.service('ThesisOption', ThesisOption)
.service('ThesisEjemplares', ThesisEjemplares)
.service('ThesisCatalog', ThesisCatalog)
// books
.service('Books', Books)
.service('BookOption', BookOption)
.service('BooksEjemplares', BooksEjemplares)
.service('BooksCatalog', BooksCatalog)
// magazines
.service('Magazines', Magazines)
.service('MagazineOption', MagazineOption)
.service('MagazinesEjemplares', MagazinesEjemplares)
.service('MagazinesCatalog', MagazinesCatalog)
// newspapers
.service('Newspapers', Newspapers)
.service('NewspaperOption', NewspaperOption)
.service('NewspapersEjemplares', NewspapersEjemplares)
.service('NewspapersCatalog', NewspapersCatalog)

.service('Carrers', Carrers)
.service('Faculties', Faculties)

.service('Tutors', Tutors)
.service('Authors', Authors)
.service('Editorials', Editorials)
.service('Readers', Readers)
.service('AuthorsMap', AuthorsMap)
.service('EditorialsMap', EditorialsMap)
.service('Ejemplares', Ejemplares)
.service('Booking', Booking)
.run(($log) => {
  $log.debug('run lagash end');
});
