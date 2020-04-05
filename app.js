//
// ─── REQUIRE ────────────────────────────────────────────────────────────────────
const express = require('express');
const axios = require('axios');
const colors = require('colors');
const cors = require('cors');
const helmet = require('helmet');
// Define app
const app = express();
app.use(helmet());
app.use(cors());

// Set static public folder
app.use(express.static(__dirname + "/public/reactFront"));

// COV-19 API lINK
// https://coronavirus-resources.esri.com/datasets/bbb2e4f589ba40d692fab712ae37b9ac_1/geoservice?geometry=137.717%2C-38.069%2C-120.330%2C63.033&orderBy=Country_Region&page=8

//
// ─── FETCH ──────────────────────────────────────────────────────────────────────
// Create empty arrays    
let dataCov = [];
let dataMax = [];
// Fetch with axios
const fetchData = async ()=>{
    let url = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?where=1%3D1&outFields=Country_Region,Last_Update,Lat,Long_,Confirmed,Recovered,Deaths&outSR=4326&f=json'
    try {
        let fetch = await axios.get(url);
        let res = await fetch.data;
        // console.log(res);
        // console.log(res.features); 
       await res.features.map(c =>{
            let dataDate = new Date(c.attributes.Last_Update);
            // Only lasta month data
            let today = new Date;
            if(today.getMonth() === dataDate.getMonth()){
                dataCov.push(c);
            };
            // Max deaths, push values insiede the array
            dataMax.push({country: c.attributes.Country_Region, value: c.attributes.Deaths});

        });
        

    
    }
    catch(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
          }
          // console.log(error.config);
    }
}

//
// ─── SINGLE API ROUTE ───────────────────────────────────────────────────────────────
    
app.get('/cov19/v1/', async (req, res)=>{
    //*** Fetch data
   await fetchData();
    if(dataCov.length > 0){
       return res.status(200).json({
            success: true,
            maxDeaths: dataMax.sort(function(b, a){
                if(a.value < b.value) { return -1; }
                if(a.value > b.value) { return 1; }
                return 0;
            }),
            data: dataCov.sort(function(a, b){
                // if(a.attributes.Country_Region < b.attributes.Country_Region) { return -1; }
                // if(a.attributes.Country_Region > b.attributes.Country_Region) { return 1; }
                // return 0;
                if(a.attributes.Deaths < b.attributes.Deaths) { return 1; }
                if(a.attributes.Deaths > b.attributes.Deaths) { return -1; }
                return 0;
            })
        });    
    }
  return  res.status(400).json({
        success: false,
        maxDeaths:[],
        data: []
    });
});

 //
 // ─── LISTEN ─────────────────────────────────────────────────────────────────────
      
let PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`.blue);
});