var app = angular.module('simple-chart', []);
google.load("visualization", "1", {packages:["corechart"]});


app.controller('MainCtrl', ['$scope', '$http',  function($scope, $http) {
  $http.get("/data").success(function (data) {
        formatDataTable(data);
  });
}]);

function formatDataTable(chartdata) {
  var data = [];
  var header = ['Cause of Death', 'Male', 'Female'];

  data.push(header);
 
 
  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i]._id);
    temp.push(chartdata[i].value.male);
    temp.push(chartdata[i].value.female);
    data.push(temp);
  }

  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(g_data, getOptions());
}

function getOptions()
{
     var options = {
        title: 'Main Diseases causing Death in different Genders',
        chartArea: {width: '70%'},
        hAxis: {
           
           title: 'Cause of Death',
          minValue: 0
        },
        vAxis: {
          
  title: 'Gender'
        }
      };

    return options;
}
