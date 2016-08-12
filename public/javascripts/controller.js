var data = [];
var nav = [];

app.controller('page-ctrl', function($scope,$http) {
  $scope.eventsView = true;
  $scope.infoView = false;
  $scope.resultsView = false;
  $scope.standingsView = false;
  $http.post("").then(function (response) {
  	data = response.data.Data;
    for(i = 0; i < data.length; i++){
      nav.push(data[i][0][0][1]);
    }
  	console.log(nav);
    $scope.nav = nav;
    document.getElementById("myNavbar").style.visibility = "visible";

    $scope.info = function(expression) {
      console.log("info " + expression);
    }
    $scope.results = function(expression) {
      console.log("results " + expression);
    }
    $scope.standings = function(expression) {
      console.log("standings " + expression);
    }
  });
});

app.controller('select-ctrl', function($scope,$http) {

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
