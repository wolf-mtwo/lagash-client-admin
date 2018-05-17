import { UUID } from './uuid.service';
import { ImageService } from './image.service';
import { Country } from './country.service';

angular.module('wolf.lagash.helpers', [
])
.service('UUID', UUID)
.service('Country', Country)
.service('ImageService', ImageService)
.run(($log) => {
  $log.debug('run lagash end');
});
