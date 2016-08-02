var express = require('express');
var router = express.Router();
if(typeof require !== 'undefined') XLSX = require('xlsx');

//Data objects
var navData = ["navData"];
var fmData = ["fmData"];
var pcData = ["pcData"];

var workbook = XLSX.readFile('public/data/fm/Einzelwertung.xlsm');
getSerieData(workbook, "fm");
/* DO SOMETHING WITH workbook HERE */
var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'B2';
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];
/* Find desired cell */
var desired_cell = worksheet[address_of_cell];
/* Get the value */
var desired_value = desired_cell.v;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  console.log(fmData);
});

router.post('/', function(req, res, next) {
  res.json({navData: navData, fmData: fmData, pcData: pcData});
});

//*Get sideviews*/
router.get('/partials/:name', function (req, res){
  var name = req.params.name;
  res.render('partials/' + name);
});

function getSerieData(data, game){
  var newSerie = [];
  //Serieinformation -> B2 till B*
  var sheetinfo = data.Sheets["Information"];
  //Standings
  var standings = [];

  //Results
  var results = [];
  switch (game) {
    case "pc":
        pcData.push(sheetinfo);
        pcData.push(standings);
        pcData.push(results);
      break;
    case "fm":
        fmData.push(sheetinfo);
        fmData.push(standings);
        fmData.push(results);
      break;
    default:
  }
}

module.exports = router;
