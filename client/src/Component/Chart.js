import React from 'react';

// import * as d3 from 'd3';
import {D3Chart} from './D3Chart';

export default function Chart(props) {
 // Deconstruct
 const {data} = props;

// Select the div
let chartDiv = React.useRef();

 // UseRef useEffect
 React.useEffect(()=> {
      // Hide first svg
 let svg = document.getElementsByTagName('svg');
    // Run
    if(data && chartDiv.current){
    // Create chart
   D3Chart(chartDiv.current, data);
   // Hide first empty svg
   svg[0].style.display='none';
     }
 },[data]);


 
 //
 // ─── RETURN ─────────────────────────────────────────────────────────────────────
 
    return (
        <>
        <span ref={chartDiv}>    
        </span>
        </>
    )
}
