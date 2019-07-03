var Fuse = require("fuse.js");
var request = require('request');
var termsList = require("./frameworkdata.js");
const XLSX = require("xlsx");
var MongoClient = require('mongodb').MongoClient;
const server = 'mongodb://localhost:27017/';
const FUZZYSEARCH_CONFIG = require('./fuzzysearch.config.js');
MongoClient.connect(FUZZYSEARCH_CONFIG.SERVER, {
 useNewUrlParser: true
}, function(err, db) {
 if (err) {
  throw err;
  db.close();
 } else {

  var dbo = db.db(FUZZYSEARCH_CONFIG.DB);
  var queryparam = FUZZYSEARCH_CONFIG.QUERY_FIELD;
  var projection = {};
  projection[queryparam] = 1;
  projection['_id'] = 0;
  dbo.collection(FUZZYSEARCH_CONFIG.COLLECTION).find({}, {
   projection: projection
  }).toArray(function(err, result) {
   if (err) throw err;

   var result_array = [];
   (async () => {

    try {

     var options;

     result.forEach(function(element) {

      var options = {
       shouldSort: true,
       includeScore: true,
       threshold: 0.4,
       location: 0,
       distance: 100,
       maxPatternLength: 53,
       minMatchCharLength: 1,
       keys: [
        "name"
       ]
      };
      var fuse = new Fuse(termsList, options);
      var sheet_query_name = element[queryparam].trim();
      var search_result = fuse.search(sheet_query_name);
      var obj_array = {};
      if (search_result[0] && search_result[0] !== "undefined") {
       obj_array.XlSheetName = sheet_query_name;
       obj_array.Framework_name = search_result[0].item.name;
       obj_array.score = search_result[0].score;
      } else {
       obj_array.XlSheetName = sheet_query_name;
       obj_array.Framework_name = "No Data found in Framework";
       obj_array.score = "NA";
      }
      result_array.push(obj_array);
     });

     const ws_name = FUZZYSEARCH_CONFIG.EXCEL_SHEET_NAME;
     var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(result_array);
     XLSX.utils.book_append_sheet(wb, ws, ws_name);
     XLSX.writeFile(wb, FUZZYSEARCH_CONFIG.EXCEL_FILE_NAME);

    } catch (error) {

     console.log('Error in the main function => ' + error);
    }
   })();

   db.close();

  });
 }
});