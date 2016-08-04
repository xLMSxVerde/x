var fmData = [];
var pcData = [];
var navFM = [];
var navPC = [];

app.controller('page-ctrl', function($scope,$http) {
  $http({
    method : "POST",
    url : ""
  }).then(function mySucces(response) {
    // get NavData
    for(var i = 0; i <response.data.fmData.length; i++){
      navFM.push(response.data.fmData[i][0][0][1]);
    }
    for(var i = 0; i < response.data.pcData.length; i++){
      navPC.push(response.data.pcData[i][0][0][1]);
    }
    $scope.navFM = navFM;
    $scope.navPC = navPC;
  }, function myError(response) {
    alert("Something went wrong. Reload the page");
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
