function PinsController() {
  var ctrl = this;

  function symbol(frame) {
    if (frame === "1") {
      return "◯";
    } else if (frame === "2") {
      return "⦿";
    } else {
      return "⬤";
    }
  }

  this.symbol = symbol;
}
angular.module("myApp").component("pins", {
  templateUrl: "components/pins/pins.html",
  controller: PinsController,
  bindings: {
    pins: "<",
  },
});
