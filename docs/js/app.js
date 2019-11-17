var myApp = angular.module('myApp',[]);
myApp.controller('myController', function ($scope, $http, $q, $filter) {

    $scope.scores = [];
    $scope.maxScore = 0;
    $scope.minScore = 0;
    $scope.avgScore = 0.0; //=Round(SumScore/NumGames)

    $scope.init = function () {
        getData();
    }

    getData = () =>  {
        var file = 'data/scores.json';

        $http.get(file)
        .then(function(response) {
            $scope.scores = response.data.item;

            var totalSum = Object.keys($scope.scores).map(function(k){
                return +$scope.scores[k].Score10;
            }).reduce(function(a,b){ return a + b },0);
            var numGames = $scope.scores.length;
            var avgScore = totalSum/numGames;
            $scope.avgScore = avgScore;

            var min = Math.min.apply(Math, $scope.scores.map(function(item){return item.Score10;}));
            $scope.minScore = min;
            var max = Math.max.apply(Math, $scope.scores.map(function(item){return item.Score10;}));
            $scope.maxScore = max;
        });
    };

    $scope.init();
});

myApp.filter('roundTo', function(numberFilter) {
    return function(value, maxDecimals) {
        return numberFilter((value || 0)
            .toFixed(maxDecimals)
            .replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
        );
    }
})

myApp.filter('toDate', function() {
    return function(items) {
      return new Date(items);
    };
  });