const request = require('request')

const forecast = (lat, lon, callback) => {

  const url = 'https://api.darksky.net/forecast/39a8c8a657e1ece62bb2ad6e4ab896ca/' + lon + ',' + lat+'?units=si'
  request({url, json:true},(error, {body})=>{
    if(error){
      callback('Cant connect to weather services.', {undefined});
    }else if(body.error){
      callback('Unable to find location', {undefined});
    }else{
      callback(undefined,{
        summary: body.daily.data[0].summary,
        temp: body.currently.temperature,
        prob: body.currently.precipProbability
      })
    }
  })
}

module.exports = forecast
