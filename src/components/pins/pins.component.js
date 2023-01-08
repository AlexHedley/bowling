function PinsController() {
  var ctrl = this;
}
angular.module("myApp").component("pins", {
  templateUrl: "components/pins/pins.html",
  controller: PinsController,
  bindings: {
    pins: "<",
  },
});
