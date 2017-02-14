export class LagashBooksReplicaController {

  constructor($state, WError, Books, UUID, book, replica) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.item = book;
    this.replica = replica;


    this.states = [{
     value: 'Habilitado',
     key: 'ENABLED'
   }, {
     value: 'Deshabilitado',
     key: 'DISABLED'
   }, {
     value: 'Reservado',
     key: 'BOOKED'
   }, {
     value: 'Prestado',
     key: 'BORROWED'
   }];
   this.replica.status = this.states[replica.state].key;
 }
}
