export class LagashBooksPrintChipController {

  constructor($state, WError, WToast, item, ejemplar, Authors, BasicOption, Editorials) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.WToast = WToast;
    this.ejemplar = ejemplar;
    this.BasicOption = BasicOption;

    item.tags = this.format_tags(item.tags);
    item.illustrations = this.find_illustrations(item.illustrations);
    item.brings = this.find_brings(item.brings);
    item.code_value = this.find_code_value(item);
    item.cover = this.BasicOption.find_covers(item.cover) || this.BasicOption.EMPTY;
    this.item = item;
    console.log(this.item.title);


    // autor
    Authors.find_authors({
      material_id: this.item._id
    }).$promise
      .then((res) => {
        this.authors = res;
      })
      .catch((err) => {
        this.WError.request(err);
      });
    if (!this.item.editorial_id) {
      this.WToast.show('El ejemplar no tiene editorial');
      return;
    }
    Editorials.get({
      _id: this.item.editorial_id
    }).$promise
      .then((res) => {
        this.editorial = res;
      })
      .catch((err) => {
        this.WError.request(err);
      });
  }

  find_illustrations(items) {
    if (!items) {
      return this.BasicOption.EMPTY;
    }
    var items = items.split(',').map((item) => {
      return this.BasicOption.find_illustration(item);
    });
    items.unshift('Ilustraciones');
    return items.join(', ');
  }

  find_brings(items) {
    if (!items) {
      return this.BasicOption.EMPTY;
    }
    var items = items.split(',').map((item) => {
      return this.BasicOption.find_bring(item);
    });
    return items.join(', ');
  }

  format_tags(text) {
    if (!text) {
      return this.BasicOption.EMPTY;
    }
    var count = 0;
    return this.BasicOption.get_tags(text).map((o) => {
      count++;
      return  count + '.' + o.toUpperCase()
    }).join('.- ');
  }

  find_code_value(item) {
    if (item.tomo > 0) {
      return 'T.' + item.tomo;
    }
    if (item.volumen > 0) {
      return 'V.' + item.volumen;
    }
    return '';
  }

  // print_test(itemRaul) {
  //   var titleRaul = itemRaul.title;
  //   console.log(titleRaul);
  //   // console.log(item.title);
  //   // var arrayItem = Array.from(item.title);
  //   // if (arrayItem.length <= 20){
  //   //   console.log("si da");
  //   //   return arrayItem.values(item.title);
  //   // }else {
  //   //   console.log("no da");
  //   // }
  //   // console.log(arrayItem);
  // }
}
