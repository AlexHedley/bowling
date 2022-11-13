var myApp = angular.module("myApp", []);
myApp.controller("myController", function ($scope, $http, $q, $filter) {
  $scope.scores = [];
  $scope.maxScore = 0;
  $scope.minScore = 0;
  $scope.avgScore = 0.0; //=Round(SumScore/NumGames)
  $scope.count = 0;

  $scope.leagueScores = [];
  $scope.maxLeagueScore = 0;
  $scope.minLeagueScore = 0;
  $scope.avgLeagueScore = 0.0; //=Round(SumScore/NumGames)
  $scope.maxLeagueSeriesScore = 0;
  $scope.avgMaxLeagueSeriesScore = 0;
  $scope.leagueCount = 0;

  $scope.init = function () {
    getData();
  };

  getData = () => {
    var file = "data/scores.json";

    $http.get(file).then(function (response) {
      $scope.scores = response.data.item.filter((s) => s.league === false);
      $scope.leagueScores = response.data.item.filter((s) => s.league === true);

      var totalSum = getTotal($scope.scores);
      var numGames = $scope.scores.length;
      var avgScore = totalSum / numGames;
      $scope.avgScore = avgScore;
      $scope.minScore = getMin($scope.scores);
      $scope.maxScore = getMax($scope.scores);
      $scope.count = numGames;

      var totalLeagueSum = getTotal($scope.leagueScores);
      var numLeagueGames = $scope.leagueScores.length;
      var avgLeagueScore = totalLeagueSum / numLeagueGames;
      $scope.avgLeagueScore = avgLeagueScore;
      $scope.minLeagueScore = getMin($scope.leagueScores);
      $scope.maxLeagueScore = getMax($scope.leagueScores);
      $scope.maxLeagueSeriesScore = getMaxLeagueSeries($scope.leagueScores);
      $scope.avgMaxLeagueSeriesScore = $scope.maxLeagueSeriesScore / 3;
      $scope.countLeague = numLeagueGames;

      var keys = $scope.leagueScores.map((s) =>
        new Date(s.date).toLocaleDateString()
      ); //.toLocaleString('en')) //.toLocaleFormat('%d %b %Y'));
      var scores = $scope.leagueScores.map((s) => s.Score10);

      var scoresHCP = $scope.leagueScores.map(
        (s) => parseInt(s.Score10) + parseInt(s.hcp)
      );
      console.log(scoresHCP);
      var totalLeagueSumHCP = getTotalHCP($scope.leagueScores);
      var avgLeagueScoreHCP = totalLeagueSumHCP / numLeagueGames;

      // Chart
      generateChart(keys, scores, avgLeagueScore, scoresHCP, avgLeagueScoreHCP);
    });
  };

  generateChart = (keys, values, avg, valuesHCP, avgHCP) => {
    const options = {
      plugins: {
        autocolors: false,
        datalabels: {
          color: "#36A2EB",
        },
        annotation: {
          annotations: {
            line1: {
              type: "line",
              yMin: avg,
              yMax: avg,
              borderColor: "rgb(0, 0, 0)",
              borderWidth: 2,
            },
            line2: {
              type: "line",
              yMin: avgHCP,
              yMax: avgHCP,
              borderColor: "rgb(0, 0, 0)",
              borderWidth: 2,
            },
          },
        },
      },
    };

    const config = {
      type: "line",
      data: {
        labels: keys,
        datasets: [
          {
            label: "Scores",
            data: values,
            fill: false,
            borderColor: "red",
            tension: 0.1,
            datalabels: {
              color: "#FFCE56",
            },
          },
          {
            label: "Scores (HCP)",
            data: valuesHCP,
            fill: false,
            borderColor: "blue",
            tension: 0.1,
            datalabels: {
              color: "#FFCE56",
            },
          },
        ],
      },
      options,
    };
    let ctx = $("#myChart");
    let lineGraph = new Chart(ctx, config);
  };

  $scope.init();
});

function getMax(scores) {
  var max = Math.max.apply(
    Math,
    scores.map(function (item) {
      return item.Score10;
    })
  );
  return max;
}

function getMin(scores) {
  var min = Math.min.apply(
    Math,
    scores.map(function (item) {
      return item.Score10;
    })
  );
  return min;
}

function getTotal(scores) {
  var totalSum = Object.keys(scores)
    .map(function (k) {
      return +scores[k].Score10;
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  return totalSum;
}

function getTotalHCP(scores) {
  var totalSum = Object.keys(scores)
    .map(function (k) {
      return +(parseInt(scores[k].Score10) + parseInt(scores[k].hcp));
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  return totalSum;
}

function getMaxLeagueSeries(scores) {
  var result = Object.values(
    scores.reduce((r, o) => {
      r[o.date] = r[o.date] || { Date: o.date, Score10: 0 };
      r[o.date].Score10 += +o.Score10;
      return r;
    }, {})
  );
  // console.log(result)

  var max = Math.max(...result.map((o) => o.Score10));
  return max;
}

myApp.filter("roundTo", function (numberFilter) {
  return function (value, maxDecimals) {
    return numberFilter(
      (value || 0).toFixed(maxDecimals).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
    );
  };
});

myApp.filter("toDate", function () {
  return function (items) {
    return new Date(items);
  };
});
