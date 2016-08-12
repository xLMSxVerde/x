var express = require('express');
var router = express.Router();
if(typeof require !== 'undefined') XLSX = require('xlsx');

//Data objects
var Data = [];

var newCup = XLSX.readFile('public/data/fm/PorscheCup16.xlsm');
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


  //Standings
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
  console.log(results);
  //Results
  var standings = [
    ["Fahrer",          "Punkte", "R1", "R2", "R3" ],
    ["xLMSxVerde",      "40", "20", "20", "-"],
    ["GSR Agroh3knie",  "30", "10", "20", "-"],
    ["GSR RKC75",       "30", "15", "15", "-"],
    ["BlubbelDieMango", "30", "15", "15", "-"],
    ["SPisch",          "30", "15", "15", "-"],
    ["Chrissi VFB",     "25", "10", "15", "-"],
    ["GSR Tobination",  "20", "10", "10", "-"],
    ["xLMSxVerde",      "20", "10", "10", "-"],
    ["xLMSxVerde",      "10", "-", "20", "-"],
    ["xLMSxVerde",      "10", "10", "-", "-"]
  ];



  //create array of new Serie
  newSerie.push(information);
  newSerie.push(results);
  newSerie.push(standings);

  //Push all the data in the arrays
  Data.push(newSerie);
}

module.exports = router;
