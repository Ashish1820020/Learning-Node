const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


// constants
const port = 3000;
const unit = "metric";



const app = express();
app.use(bodyParser.urlencoded({extended: true}));


// To show in the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});




// To get data from the home page
app.post("/", (req, res) => {
  const area = req.body.area.toLowerCase();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${area}&units=${unit}&appid=${apiKey}`;

  https.get(url ,(response)=>{

        response.on("data", (data)=>{
          let weatherFile = JSON.parse(data);
          let temp = weatherFile.main.temp;
          let desc = weatherFile.weather[0].description;
          res.send(`<h3>Current weather of the area/pincode area  ${area} is ${desc} and the tempreture is ${temp}deg celcius  </h3>`);
        });
        response.on("error", (err)=>{
          console.log(err);
        });
      
      });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
