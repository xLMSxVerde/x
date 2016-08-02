app.controller('page-ctrl', function($scope, $http) {
  $.ajax({
    type: "POST",
    url: '',
    datatype: 'json',
      success: function(response){
        console.log(response.navData);
        console.log(response.fmData);
        console.log(response.pcData)
      }
  });
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
