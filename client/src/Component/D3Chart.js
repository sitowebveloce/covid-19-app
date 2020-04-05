
import * as d3 from 'd3';


//
// ─── FUNCTION ───────────────────────────────────────────────────────────────────

function D3Chart(myDivRef, data) {

    // ─── STATE ──────────────────────────────────────────────────────────────────────
    let time = '';
    // console.log(myDivRef);
    // console.log(data);
    
    // ─── TIME ───────────────────────────────────────────────────────────────────────
    // Date
let todayDate = () =>{
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    // let h = today.getHours();
    // let min = today.getMinutes();
    // let sec = today.getSeconds();
    //
    time = `${day}/${month}/${year}`;
    // console.log(`${day}/${month}/${year}`)
    }

    // run
    todayDate()
    console.log(time)

    //──────────────── MARGIN
    let margin = {top: 10, bottom:110, left: 80, right:80}
    //──────────────── SVG CANVAS AREA DIMENSION
    //  let height = data !== undefined ? data[0].value: [];
    let width=  window.innerWidth - margin.left - margin.right ; // width of the SVG CANVAS
    let height = 600 - margin.top - margin.bottom;   // HEIGHT OF THE SVG CANVAS
    // let barWidth = 4; // bar width
    // let barOffset = 2; // bar distance

    // Determine the data array max value
    // Extraxt data numbers
    // let dataNumb = data.map(d => d.value); 

 //
 // ─── TOOLTIP ────────────────────────────────────────────────────────────────────
 
// let tooltip = d3.select("#my_dataviz")
//   .append("div")
//     .style("position", "absolute")
//     .style("visibility", "hidden")
//     .text("");

// ─── SCALEs ──────────────────────────────────────────────────────────────────────

     // ─── CHART ──────────────────────────────────────────────────────────────────────

    // Create the SVG CANVAS
    let svg =   d3.select(myDivRef)
        .append('svg')
        .attr('width', width + margin.left + margin.right )
        .attr('height', height + margin.top + margin.bottom)
        .style('background', '#fff')
        .append('g') // append group to the svg
           .attr('transform', `translate(${margin.left}, ${margin.top})`)
      
    
    // Select all rectangles use the data
    let rects = svg.selectAll('rect')
    .data(data) // use data
      //Our new hover effects
      .on('mouseover', function(d, i) {
        d3.select(this).transition()
             .duration('50')
             .attr('opacity', 0)
             .append("svg:title")
             .text(function(d, i) { return d[i].country });
     
     })
    // ─── Y - SCALE ──────────────────────────────────────────────────────────────────
      // FOR THE HEIGHT USE THE DATA NUMERIC VALUES
    let yScale = d3.scaleLinear()
    //  'domain' definition :  (the max and the min y value)
    .domain([d3.min(data, d => d.value ), d3.max(data, d => d.value)]) // Use d3.max to find the max of the array
    .range([height, 0]) // min and max value of the SVG CANVAS CONTAINER
    // This values are inverted to fix y direction from the bottom to the top
    // console.log(yScale(100))

    // ─── X - SCALE ──────────────────────────────────────────────────────────────────
    // FOR THE WIDTH USE THE DATA COUNTRY NAME
    let xScale = d3.scaleBand()
    .domain(data.map(d => d.value > 1 ? d.country : null))
    .range([0, width])
    .padding(0.15)

    //
    // ─── AXIS VISUALIZATION ───────────────────────────────────────────────────────────────────────
    // X
    let xAxisCall = d3.axisBottom(xScale)
    svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .transition().duration(3000)
    .call(xAxisCall)
    .attr('opacity', 1)
    .selectAll("text")  
    .style('font-size', '10px')
     .style("text-anchor", "end")
     .attr("dx", '-1.8em' )
     .attr("dy", "0")
     .attr("transform", "rotate(-65)")
     .attr('tickPadding', '2')
    
    // Y
    let yAxisCall = d3.axisLeft(yScale)
    svg.append('g')
    .transition().duration(3000)
    .call(yAxisCall)
    .attr('opacity', 1)
   


// ─── SET INTERVAL ───────────────────────────────────────────────────────────────
// d3.interval(()=>{
//     todayDate()
//     console.log(time)
// }, 1000)


// ─── TEXT LABEL ─────────────────────────────────────────────────────────────────
    
    // X LABEL
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 400)
    .attr('text-anchor', 'middle')
    .attr('opacity', 0)
    .text(``)
    .transition().duration(6000)
    .text(`COVID-19 World Spread ${time}`)
    .attr('opacity', 1)
//  d3.interval(()=>{
//      text.exit().remove();
//      // Update time
//      todayDate()
     // 
     // X LABEL
//    text = svg.append('text')
//   .attr('x', width / 2)
//   .attr('y', height + 50)
//   .attr('text-anchor', 'middle')
//   .attr('opacity', '0.6')
//   .text(``)
//   .text(`COVID-19 World spread ${time}`)
//  })
  

        // X LABEL
    svg.append('text')
    .attr('x', width -40)
    .attr('y', height - 30)
    .attr('text-anchor', 'middle')
    .attr('opacity', '0.8')
    .attr('color', 'purple')
    .text(`Countries`)
    // Y LABEL
    svg.append('text')
        .attr('x', -40 )
        .attr('y', 8)
        .attr('text-anchor', 'middle')
        .attr('opacity', '0.6')
        .attr('color', 'red')
        .text('deaths')
        //.attr('transform', 'rotate(-90')


// ─── DRAW RECTANGLES ────────────────────────────────────────────────────────────

    rects.enter().append('rect')
    .style('fill', d => {
        if(d.country === 'Italy'){
            return 'red';
        }
            return 'green';
    })
    .attr('width', xScale.bandwidth) // bar width
    .attr('height', d => height - yScale(d.value)) // bar height
    .attr('x', width)
    .attr('y', height)
    .attr('fill-opacity', 0)
    .transition().duration(2000)
    .attr('y', function(d){     // bar y position
        return yScale(d.value);
    })
    .attr('x', function(d,indx){        // bar x position
        // return indx * (barWidth + barOffset);
        return xScale(d.country)
    })
        .attr('fill-opacity', 1)
        //    rects.append("svg:title")
        //     .text(function(d, i) { return d[i].country });
        
}

export {D3Chart};