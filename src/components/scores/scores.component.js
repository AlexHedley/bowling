function ScoresController() {
  var ctrl = this;

  function getClass(score) {
    return {
      strike: score === "X",
      hardSpare: score.length > 1,
    };
  }

  function trim(score) {
    if (score.length > 1) {
      return score.substring(0, 1);
    } else {
      return score;
    }
  }

  this.getClass = getClass;
  this.trim = trim;
}
angular.module("myApp").component("scores", {
  templateUrl: "components/scores/scores.html",
  controller: ScoresController,
  bindings: {
    scores: "<",
    isleague: "<",
  },
});
