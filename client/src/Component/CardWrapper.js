import React from 'react'
import Card from './Card';
import Search from './Search';
import axios from 'axios';
// import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles({
    root: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    homeBtn: {
        cursor:'pointer',
        padding:'10px'
    },
    maxValue:{
        color:'red',
        display:'grid',
        gridTemplateColumns:'1fr',
        gridTemplateRows:'1fr 1fr',
        alignItems:'left',
        gridGap:'5px'
    }
  });

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────

export default function CardWrapper() {
       
// ─── STATE ──────────────────────────────────────────────────────────────────────
const [dataArr, setDataArr] = React.useState([]);
const [maxVal, setMaxVal] = React.useState([]);
const [search, setSearch] = React.useState('');

// Classes
const classes = useStyles();

//
// ─── FETCH FROM BACKEND ──────────────────────────────────────────────────────────────────────
const fetchFromBackEnd = async () =>{
    let url = '/cov19/v1'
    try {
        let fetchData = await axios(url);
        let res = await fetchData.data;
        // console.log(res.data);
        // Set State
        // All data
        setDataArr(res.data);
        // Max deaths value
        setMaxVal(res.maxDeaths)
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
          console.log(error.config);
    }
}

// UseEffect
React.useEffect(()=>{
    fetchFromBackEnd();
}, [])

//*** DOM Object */
let domObj = dataArr.map((c, indx) =>{
    // Define regex
    let regex = new RegExp(`^${search}`, 'gi');

   return (
    <div key={indx}>
     {
         search === '' 
         ?  
      <Card 
      country={c.attributes.Country_Region} 
      lastUpdate={c.attributes.Last_Update}
      confirmed={c.attributes.Confirmed}
      recovered={c.attributes.Recovered}
      deaths={c.attributes.Deaths}
      lat={c.attributes.Lat}
      long={c.attributes.Long_}
      />
        :
        c.attributes.Country_Region.match(regex)
        ?
        <Card 
        country={c.attributes.Country_Region} 
        lastUpdate={c.attributes.Last_Update}
        confirmed={c.attributes.Confirmed}
        recovered={c.attributes.Recovered}
        deaths={c.attributes.Deaths}
        lat={c.attributes.Lat}
        long={c.attributes.Long_}
        />
        :
        null
     }
    </div>
   ) 
});

    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────
    
    return (
        <div className={classes.root}>
           {/* <a href="/"> <HomeIcon className={classes.homeBtn}/></a> */}
           <a href="/" className={classes.homeBtn}> <span role='img' aria-label='reload'>🔃</span></a>
    <div className={classes.maxValue}>
        <div>
     <b> Country: </b> {maxVal !== undefined && maxVal.length > 0 ? 
    (`${maxVal[0].country} `) : null}
    </div>
    <div>
     <b> Max Deaths: </b> {maxVal !== undefined && maxVal.length > 0 ? 
    (`${maxVal[0].value}`) : null}
    </div>
    </div>
     <Search search={search} setSearch={setSearch} />
            {domObj}
    </div>
    )
}
