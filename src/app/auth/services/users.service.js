export class Users {

  constructor() {
    var url = Global.PATH + '/p1/users';
     return $resource(url + '/:_id', {
       _id: '@_id'
     }, {
       update: {
         method: 'PUT'
       },
       findByEmail: {
         method: 'GET',
         // TODO made an specific method
         isArray: true
       }
     });
  }
}
