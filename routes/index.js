var express = require('express');
var router = express.Router();
if(typeof require !== 'undefined') XLSX = require('xlsx');

//Data objects
var Data = [];

var newCup = XLSX.readFile('public/data/fm/PorscheCup.xlsm');
getSerieData(newCup);

newCup = XLSX.readFile('public/data/fm/ToyotaCup.xlsm');
getSerieData(newCup);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  res.json({Data: Data});
});

function getSerieData(data){
  var newSerie = [];
  //Serieinformation -> B2 till B*
  var information = [];
  var row = [];
  var old = "2";
  var sheetinfo = data.Sheets["Information"];
  for (z in sheetinfo) {
    /* set the collums which should be ignored */
    if(z[0] === '!') continue;
      if(z.replace( /^\D+/g, '') !== old.replace( /^\D+/g, '')){
        information.push(row);
        row = [];
      }
    row.push(sheetinfo[z].w);
    old = z;
  }


  //Results
  //zum Test
  row = [];
  old = "1";
  var results = [];
  var result =[];
  var race;
  for (var i=1; i<31; i++) {
    race = data.Sheets["Rennen " + i];
    /* Check for a winner -> Race result exist*/
    if(race['C3']){
      for (z in race) {
        /* set the collums which should be ignored */
        if(z[0] === '!') continue;
          if(z.replace( /^\D+/g, '') !== old.replace( /^\D+/g, '')){
            result.push(row);
            row = [];
          }
        row.push(race[z].w);
        old = z;
      }
      results.push(result);
      row = [];
      old = "1";
      result = [];
    }
  }
  //Standings
  var standings = [];
  //DriverStanding
  row = [];
  old="1";
  var driverStanding = [];
  var standing = data.Sheets["Fahrerwertung"];
  for (z in standing) {
    /* set the collums which should be ignored */
    if(z[0] === '!') continue;
      if(z.replace( /^\D+/g, '') !== old.replace( /^\D+/g, '')){
        if(row[1] != 0) {
          driverStanding.push(row);
        }
        row = [];
      }
    row.push(standing[z].w);
    old = z;
  }
  standings.push(driverStanding);

  //TeamStanding
  row = [];
  old="1";
  var teamStanding = [];
  var standing = data.Sheets["Teamwertung"];
  if(standing['C3']){
    for (z in standing) {
      /* set the collums which should be ignored */
      if(z[0] === '!') continue;
        if(z.replace( /^\D+/g, '') !== old.replace( /^\D+/g, '')){
          if(row[2] != 0) {
            teamStanding.push(row);
          }
          row = [];
        }
      row.push(standing[z].w);
      old = z;
    }
    standings.push(teamStanding);
  }
  //create array of new Serie
  newSerie.push(information);
  newSerie.push(results);
  newSerie.push(standings);
  //Push all the data in the arrays
  Data.push(newSerie);
}

module.exports = router;
