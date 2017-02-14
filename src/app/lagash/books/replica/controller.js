export class LagashBooksReplicaController {

  constructor($state, WError, WToast, Books, UUID, Replicas, book, replica) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.WToast = WToast;
    this.Replicas = Replicas;
    this.item = book;
    this.replica = replica;

    this.states = [{
      value: 'Guardado',
      key: 'STORED'
    }, {
      value: 'Reservado',
      key: 'BOOKED'
    }, {
      value: 'Prestado',
      key: 'BORROWED'
    }];
    this.replica.state = this.states[replica.state].key;
  }

  save_replica(replica) {
    this.Replicas.update(replica)
    .$promise
    .then((response) => {
      response.state = this.states[response.state].key;
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
