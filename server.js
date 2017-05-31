const express = require('express');
const app = express();

function parsetime (time) {
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  var naturalDate = JSON.stringify(months[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear());
  return naturalDate;
}

function unixtime (time) {
  return time.getTime();
}

function bothTimes (unixTime, naturalTime) {
    return { unix: JSON.parse(unixTime), natural: JSON.parse(naturalTime) };
}

app.get('/:time', function (req, res) {
  var unixDate = new Date(parseInt(req.params.time,0));
  var normalDate = new Date(parseInt(req.params.time*1000,0));
  
  var unix_time = unixtime(unixDate);
  var normal_time = parsetime(normalDate);
  
  var finalTime = bothTimes(unix_time, normal_time);
  
  res.send( finalTime );
});

app.listen(8080, function () {
  console.log('Test app on https://api-projects-sabathh.c9users.io/1515455516');
})