import { CardType } from './card.service';
import { UUID } from './uuid.service';
import { ImageService } from './image.service';
import { Country } from './country.service';
import { BasicOption } from './option.service';

angular.module('wolf.lagash.helpers', [
])
.service('CardType', CardType)
.service('UUID', UUID)
.service('Country', Country)
.service('ImageService', ImageService)
.service('BasicOption', BasicOption)
.run(($log) => {
  $log.debug('run lagash end');
});
