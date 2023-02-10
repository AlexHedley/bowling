function ScoreCreatorController() {
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

  function numberOnly(id) {
    // Get element by id which passed as parameter within HTML element event
    var element = document.getElementById(id);
    // This removes any other character but numbers as entered by user
    element.value = element.value.replace(/[^0-9]/gi, "");
  }

  this.getClass = getClass;
  this.trim = trim;
  this.numberOnly = numberOnly;
}
angular.module("myApp").component("scoreCreator", {
  templateUrl: "components/score-creator/score-creator.html",
  controller: ScoreCreatorController,
  bindings: {
    scores: "<",
    isleague: "<",
  },
});
