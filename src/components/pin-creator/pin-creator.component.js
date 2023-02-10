function PinCreatorController() {
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
angular.module("myApp").component("pinCreator", {
  templateUrl: "components/pin-creator/pin-creator.html",
  controller: PinCreatorController,
  bindings: {
    pins: "<",
  },
});
