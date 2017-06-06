const express = require('express');
const app = express();
const moment = require('moment');

var port = process.env.PORT || 8080;

function parseTimeMoment (time) {
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  var naturalDate = JSON.stringify(months[time.month()] + ' ' + time.date() + ', ' + time.year());
  return naturalDate;
}

function parseUnixMoment (time) {
  return time.unix();
}

function bothTimes (unixTime, naturalTime) {
    return { unix: JSON.parse(unixTime), natural: JSON.parse(naturalTime) };
}

app.get('/:time', function (req, res){
  
  var dateMoment;
  var finalTime;
  
  if(moment(parseInt(req.params.time*1000,0)).isValid())
  {
    dateMoment = moment(parseInt(req.params.time*1000,0));
  }
  else
  {
    dateMoment = moment(req.params.time);
  }
  
  var normalTimeMoment = parseTimeMoment(dateMoment);
  
  var unixTimeMoment = parseUnixMoment(dateMoment);
  
  try
  {
    finalTime = bothTimes(unixTimeMoment, normalTimeMoment);
  }
  catch (e)
  {
    finalTime = bothTimes(null, null);
  }
  
  res.send(finalTime);
});

app.listen(port, function () {
  console.log('Test app on https://api-projects-sabathh.c9users.io/1515455516');
})