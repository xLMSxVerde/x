var data = [];
var nav = [];

app.controller('page-ctrl', function($scope,$http) {
  $http.post("").then(function (response) {
  	data = response.data.Data;
    // NavBar
    for(i = 0; i < data.length; i++){
      nav.push(data[i][0][0][1]);
    }
    $scope.nav = nav;

    // InfoSide
    $scope.info = function(expression) {
      $scope.infoA = data[expression][0];
      $scope.eventsView = false;
      $scope.infoView = true;
      $scope.resultsView = false;
      $scope.standingsView = false;
    }

    // Button for Raceresults
    $scope.results = function(expression) {
      $scope.btnRaces = data[expression][1];

      //ResultSide
      $scope.getResults = function(index) {
          $scope.raceResults = data[expression][1][index];
          $scope.raceResultView = true;
      }
      $scope.eventsView = false;
      $scope.infoView = false;
      $scope.resultsView = true;
      $scope.standingsView = false;
    }

    //StandingSide
    $scope.standings = function(expression) {
      console.log(data[expression]);
      $scope.eventsView = false;
      $scope.infoView = false;
      $scope.resultsView = false;
      $scope.standingsView = true;
    }
    document.getElementById("page-content").style.visibility = "visible";
    document.getElementById("myNavbar").style.visibility = "visible";
  });
});

app.directive('stay', function(){
  return {
    restrict : "C",
      link: function(scope, element) {
        element.bind("click" , function(e){
          element.parent().parent().parent().parent().parent().find("a").removeClass("enabled");
          element.addClass("enabled");
        });
      }
  }
});
