function ScoreCreatorController() {
  var ctrl = this;

  function getClass(score) {
    return {
      strike: score === 'X',
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
    element.value = element.value.replace(/[^0-9]/gi, '');
  }

  function getScores() {
    // Should be model binding...
    var date = $('#date').val();

    var oneA = $('#1a').val();
    var oneB = $('#1b').val();
    var one = $('#1').val();
    var twoA = $('#2a').val();
    var twoB = $('#2b').val();
    var two = $('#2').val();
    var threeA = $('#3a').val();
    var threeB = $('#3b').val();
    var three = $('#3').val();
    var fourA = $('#4a').val();
    var fourB = $('#4b').val();
    var four = $('#4').val();
    var fiveA = $('#5a').val();
    var fiveB = $('#5b').val();
    var five = $('#5').val();
    var sixA = $('#6a').val();
    var sixB = $('#6b').val();
    var six = $('#6').val();
    var sevenA = $('#7a').val();
    var sevenB = $('#7b').val();
    var seven = $('#7').val();
    var eightA = $('#8a').val();
    var eightB = $('#8b').val();
    var eight = $('#8').val();
    var nineA = $('#9a').val();
    var nineB = $('#9b').val();
    var nine = $('#9').val();
    var tenA = $('#10a').val();
    var tenB = $('#10b').val();
    var tenC = $('#10c').val();
    var ten = $('#10').val();

    var hdp = $('#hdp').val();

    var isLeague = $('#isLeague').is(':checked');
    // var total = $('#total').val();
    
    // var includePins = $('#includePins').is(':checked');
    // if (includePins) {
    //   `"pins": []`;
    // }

    var scores = `
    {
      "id": 0,
      "Score1": ${one},
      "Score1a": "${oneA}",
      "Score1b": "${oneB}",
      "Score2": ${two},
      "Score2a": "${twoA}",
      "Score2b": "${twoB}",
      "Score3": ${three},
      "Score3a": "${threeA}",
      "Score3b": "${threeB}",
      "Score4": ${four},
      "Score4a": "${fourA}",
      "Score4b": "${fourB}",
      "Score5": ${five},
      "Score5a": "${fiveA}",
      "Score5b": "${fiveB}",
      "Score6": ${six},
      "Score6a": "${sixA}",
      "Score6b": "${sixB}",
      "Score7": ${seven},
      "Score7a": "${sevenA}",
      "Score7b": "${sevenB}",
      "Score8": ${eight},
      "Score8a": "${eightA}",
      "Score8b": "${eightB}",
      "Score9": ${nine},
      "Score9a": "${nineA}",
      "Score9b": "${nineB}",
      "Score10": ${ten},
      "Score10a": "${tenA}",
      "Score10b": "${tenB}",
      "Score10c": "${tenC}",
      "date": "${date}",
      "league": ${isLeague},
      "hcp": ${hdp}
    },`;

    // "pins": [
    //   {
    //     "one": "1",
    //     "two": "1",
    //     "three": "1",
    //     "four": "1",
    //     "five": "1",
    //     "six": "1",
    //     "seven": "1",
    //     "eight": "1",
    //     "nine": "2",
    //     "ten": ""
    //   },
    // ]

    $('#Scores').html(scores);
  }

  function copyScores() {
    var scores = $('#Scores').html();
    navigator.clipboard.writeText(scores);
  }

  function deleteScores() {
    $('#1a').val('');
    $('#1b').val('');
    $('#1').val('');
    $('#2a').val('');
    $('#2b').val('');
    $('#2').val('');
    $('#3a').val('');
    $('#3b').val('');
    $('#3').val('');
    $('#4a').val('');
    $('#4b').val('');
    $('#4').val('');
    $('#5a').val('');
    $('#5b').val('');
    $('#5').val('');
    $('#6a').val('');
    $('#6b').val('');
    $('#6').val('');
    $('#7a').val('');
    $('#7b').val('');
    $('#7').val('');
    $('#8a').val('');
    $('#8b').val('');
    $('#8').val('');
    $('#9a').val('');
    $('#9b').val('');
    $('#9').val('');
    $('#10a').val('');
    $('#10b').val('');
    $('#10c').val('');
    $('#10').val('');

    // $('#hdp').val('');
    $('#total').val('');
    $('#leagueTotal').val('');

    $('#Scores').html('');
  }

  function updateSeriesTotal() {
    var total = parseInt($('#10').val()) + parseInt($('#hdp').val());
    $('#leagueTotal').val(total);
  }

  this.getClass = getClass;
  this.trim = trim;
  this.numberOnly = numberOnly;
  this.getScores = getScores;
  this.copyScores = copyScores;
  this.deleteScores = deleteScores;
  this.updateSeriesTotal = updateSeriesTotal;
}

angular.module('myApp').component('scoreCreator', {
  templateUrl: 'components/score-creator/score-creator.html',
  controller: ScoreCreatorController,
  bindings: {
    scores: '<',
    isleague: '<',
  },
});
