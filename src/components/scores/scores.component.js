function ScoresController() {
  var ctrl = this;
}
angular.module("myApp").component("scores", {
  templateUrl: "components/scores/scores.html",
  controller: ScoresController,
  bindings: {
    scores: "<",
    isleague: "<",
  },
});
