function PinCreatorController() {
  var ctrl = this;

  function symbol(frame) {
    // ◯ ⦿ ⬤
    return "⬤";
  }

  function changeSymbol($event) {
    var elem = $event.currentTarget || $event.srcElement;
    switch(elem.innerText) {
      case "⬤":
        elem.innerText = "⦿";
        break;
      case "⦿":
        elem.innerText = "◯";
        break;
      case "◯":
        elem.innerText = "⬤";
        break;
      default:
    }
  }

  function pinScores() {
    var scores = "{";

    for (let i = 1; i < 11; i++) {
      var score = $('#frame_' + ctrl.id + '_pin_' + i).text().trim();
      var word = toWord(i);
      var number = getNumberFromSymbol(score);
      scores += "\"" + word + "\"" + ":" + "\"" + number + "\"" + ",";
    }
    scores = scores.slice(0, -1)

    scores += "}";

    // console.log(scores);
  }

  function getNumberFromSymbol(symbol) {
    var number = "";
    switch(symbol) {
      case "⬤":
        number = "";
        break;
      case "⦿":
        number = "2";
        break;
      case "◯":
        number = "1";
        break;
      default:
    }
    return number;
  }

  function toWord(n) {
    var digits = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    return digits[n];
  }

  this.symbol = symbol;
  this.changeSymbol = changeSymbol;
  this.pinScores = pinScores;

  ctrl.$onInit = function () {};
}
angular.module('myApp').component('pinCreator', {
  templateUrl: 'components/pin-creator/pin-creator.html',
  controller: PinCreatorController,
  bindings: {
    pinId: '<',
  },
});
