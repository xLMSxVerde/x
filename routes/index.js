var express = require('express');
var router = express.Router();
if(typeof require !== 'undefined') XLSX = require('xlsx');
var XLSX = require('xlsx');
var workbook = XLSX.readFile('public/data/fm/PorscheCup.ods');
var first_sheet_name = workbook.SheetNames[1];
var address_of_cell = 'B2';

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
var desired_cell = worksheet[address_of_cell];

/* Get the value */
var desired_value = desired_cell.v;
console.log(desired_value);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//*Get sideviews*/
router.get('/partials/:name', function (req, res){
  var name = req.params.name;
  res.render('partials/' + name);
});

module.exports = router;
