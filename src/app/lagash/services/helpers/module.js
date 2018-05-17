// import { router } from './router';
// import { LagashController } from './controller';
// import { LagashHomeController } from './home/controller';
// import LagashUsers from './users/module';
// import LagashBooks from './books/module';
// import LagashThesis from './thesis/module';
// Thesis
// import { Thesis } from './services/thesis/thesis.service';
// import { ThesisOption } from './services/thesis/option.service';
// import { ThesisEjemplares } from './services/thesis/ejemplares.service';

// import { Books } from './services/books.service';
import { ImageService } from './image.service';
// import { Country } from './services/country.service';
// import { Author } from './services/author.service';
// import { Editorial } from './services/editorial.service';
// import { AuthorMap } from './services/author.map.service';
// import { EditorialMap } from './services/editorial.map.service';
// import { BooksEjemplares } from './services/books/ejemplares.service';
// import { BookOption } from './services/helpers/book.option.service';

angular.module('wolf.lagash.helpers', [
  'ui.router',
  // 'wolf.lagash.users',
  // 'wolf.lagash.books',
  // 'wolf.lagash.thesis'
])
/// .config(router)
.service('ImageService', ImageService)
// thesis
// .service('ThesisOption', ThesisOption)
// .service('ThesisEjemplares', ThesisEjemplares)
//
// .service('Books', Books)
// .service('Author', Author)
// .service('Country', Country)
// .service('Editorial', Editorial)
// .service('AuthorMap', AuthorMap)
// .service('BookOption', BookOption)
// .service('EditorialMap', EditorialMap)
// .service('UUID', UUID)
// .service('BooksEjemplares', BooksEjemplares)
// .controller('LagashController', LagashController)
// .controller('LagashHomeController', LagashHomeController)
.run(($log) => {
  $log.debug('run lagash end');
});