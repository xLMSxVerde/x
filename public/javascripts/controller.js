$(window).resize(function() {
	var contW = $(this).width();
	if(contW >= 768){
		document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
	}else{
		document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
	}
});

$(document).ready(function() {
	$("#menu-toggle").click(function() {
		var elem = document.getElementById("sidebar-wrapper");
		var theCSSprop = window.getComputedStyle(elem,null).getPropertyValue("left");
		if(theCSSprop == "200px"){
			document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
		}
		else if(theCSSprop == "-200px"){
			document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
		}
	});
});

var fmData = [];
var pcData = [];
var navFM = [];
var navPC = [];

app.controller('page-ctrl', function($scope,$http) {
  $http({
    method : "POST",
    url : ""
  }).then(function mySucces(response) {
		fmData = response.data.fmData;
		pcData = response.data.pcData;
		// get NavData
    for(var i = 0; i <response.data.fmData.length; i++){
      navFM.push(response.data.fmData[i][0][0][1]);
    }
    for(var i = 0; i < response.data.pcData.length; i++){
      navPC.push(response.data.pcData[i][0][0][1]);
    }
    $scope.navFM = navFM;
    $scope.navPC = navPC;
		$scope.navForza = function(expression) {
				// var informationListTitle = [];
				// var informationList = [];
				// for(var i= 0; i<fmData[expression][0].length; i++){
				// 	informationListTitle.push(fmData[expression][0][i][0])
				// }
				// for(var i= 0; i<fmData[expression][0].length; i++){
				// 	informationList.push(fmData[expression][0][i].slice(1,fmData[expression][0].length))
				// }
				// $scope.informationListTitle = informationListTitle;
				$scope.informationList = fmData[expression][0];
				$scope.information = true;
		}
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
