function PinCreatorController() {
  var ctrl = this;

  ctrl.$onInit = function () {};
}
angular.module('myApp').component('pinCreator', {
  templateUrl: 'components/pin-creator/pin-creator.html',
  controller: PinCreatorController,
  bindings: {
    id: '<',
  },
});
