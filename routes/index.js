var express = require('express');
var router = express.Router();
if(typeof require !== 'undefined') XLSX = require('xlsx');

//Data objects
var Data = [];

var newCup = XLSX.readFile('public/data/fm/ToyotaCup16.xlsm');
getSerieData(newCup);
newCup = XLSX.readFile('public/data/fm/PorscheCup16.xlsm');
getSerieData(newCup);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  res.json({Data: Data});
});

//*Get sideviews*/
router.get('/partials/:name', function (req, res){
  var name = req.params.name;
  res.render('partials/' + name);
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
    row.push(sheetinfo[z].v);
    old = z;
  }


  //Standings
  //zum Test
  var results =
  [
    [
      ["Lauf 1 von 10 Hockheimring, Nacht/Trocken, 40 Runden"],
      ["Fahrer",          "Klasse", "Auto",       "Beste",        "Punkte"],
      ["GSR Gecko",       "A650", "Toyota GT86", "01:59,740",     "25"],
      ["GSR Tobination",  "A650", "Toyota GT86", "02:00,003(!)",  "25"],
      ["Chrissi VFB",     "A650", "Toyota GT86", "01:59,459",     "25"],
      ["SPisch",          "A650", "Toyota GT86", "02:00,026",     "20"],
      ["GSR Norbi",       "A650", "Toyota GT86", "02:00,140(!)",  "20"],
      ["GSR Agroh3knie",  "A650", "Toyota GT86", "01:59,814",     "20"],
      ["GSR STOCK",       "A650", "Toyota GT86", "02:01,324",     "20"],
      ["BlubbelDieMango", "A650", "Toyota GT86", "02:02,093",     "20"],
      ["GSR RKC75",       "A650", "Toyota GT86", "02:00,928",     "20"],
      ["Tjark421",        "A650", "Toyota GT86", "02:03,815",     "21"],
      ["AiReally",        "A650", "Toyota GT86", "02:01,960",     "21"],
      ["von Dohlen",      "A650", "Toyota GT86", "01:59,975(!)",  "DNF"]
    ],
    [
      ["Lauf 1 von 10 Hockheimring, Nacht/Trocken, 40 Runden"],
      ["Fahrer",          "Klasse", "Auto",       "Beste",        "Punkte"],
      ["GSR Gecko",       "A650", "Toyota GT86", "01:59,740",     "25"],
      ["GSR Tobination",  "A650", "Toyota GT86", "02:00,003(!)",  "25"],
      ["Chrissi VFB",     "A650", "Toyota GT86", "01:59,459",     "25"],
      ["SPisch",          "A650", "Toyota GT86", "02:00,026",     "20"],
      ["GSR Norbi",       "A650", "Toyota GT86", "02:00,140(!)",  "20"],
      ["GSR Agroh3knie",  "A650", "Toyota GT86", "01:59,814",     "20"],
      ["GSR STOCK",       "A650", "Toyota GT86", "02:01,324",     "20"],
      ["BlubbelDieMango", "A650", "Toyota GT86", "02:02,093",     "20"],
      ["GSR RKC75",       "A650", "Toyota GT86", "02:00,928",     "20"],
      ["Tjark421",        "A650", "Toyota GT86", "02:03,815",     "15"],
      ["AiReally",        "A650", "Toyota GT86", "02:01,960",     "10"],
      ["von Dohlen",      "A650", "Toyota GT86", "01:59,975(!)",  "DNF"]
    ],
    [
      ["Lauf 1 von 10 Hockheimring, Nacht/Trocken, 40 Runden"],
      ["Fahrer",          "Klasse", "Auto",       "Beste",        "Gesamt"],
      ["25"],
      ["25"],
      ["25"],
      ["20"],
      ["20"],
      ["20"],
      ["20"],
      ["20"],
      ["20"],
      ["15"],
      ["10"],
      ["DNF"]
    ]
  ]


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
