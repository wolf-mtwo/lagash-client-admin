export class LagashProfileController {

  constructor(
    $state,
    WError,
    WToast,
    Users,
    Global
  ) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.WToast = WToast;
    this.Users = Users;
    this.pass = {};
    this.Users.get({
      _id: Global.user._id
    }).$promise
    .then((res) => {
      this.item = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    if (this.pass) {
        if (this.pass.new === this.pass.validator) {
          item.password = this.pass.new;
        } else {
          this.WToast.show('El password no coincide');
          return;
        }
    }
    this.Users.update({
      _id: item._id
    }, item).$promise
    .then(() => {
      this.$state.go('lagash.profile', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
