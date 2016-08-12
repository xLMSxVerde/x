var data = [];

app.controller('page-ctrl', function($scope,$http) {
  $http({
    method : "POST",
    url : ""
  }).then(function mySucces(response) {
		data = response.data.Data;
		console.log(data);
  }, function myError(response) {
    alert("Something went wrong. Reload the page");
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
