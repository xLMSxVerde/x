app.controller('page-ctrl', function($scope, $http) {

});

app.directive('stay', function(){
  return {
    restrict : "C",
      link: function(scope, element) {
        element.bind("click" , function(e){
          element.parent().parent().parent().parent().parent().find("button").removeClass("enabled");
          element.addClass("enabled");
        });
      }
  }
});
