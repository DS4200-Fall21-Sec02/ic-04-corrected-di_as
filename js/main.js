// write your javascript code here.
// feel free to change the pre-set attributes as you see fit


// Assistance from https://nam12.safelinks.protection.outlook.com/?url=https%3A%2F%2Fgithub.com%2Fkriscfoster%2Fd3-barchart%2Fblob%2Fmaster%2Findex.js&amp;data=04%7C01%7Csodergren.a%40northeastern.edu%7Cf5e5424d089044321bbb08d98e9bfee6%7Ca8eec281aaa34daeac9b9a398b9215e7%7C0%7C0%7C637697623364035380%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000&amp;sdata=oN4WJiqq5HqZjl%2BWn5mdH6LLPsbHclOHWM%2BsrHn%2F%2BEw%3D&amp;reserved=0

var data = [
  { X: 'A', Y: 80 },
  { X: 'B', Y: 76 },
  { X: 'C', Y: 90 },
  { X: 'D', Y: 82 },
  { X: 'E', Y: 90 },
  { X: 'F', Y: 75 },
  { X: 'G', Y: 86 },
];



const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-container')
.append('svg')
.attr('width', width - margin.left - margin.right)
.attr('height', height - margin.top - margin.bottom)
.attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left, width - margin.right])
.padding(0.1)

const y = d3.scaleLinear()
.domain([0, 100])
.range([height - margin.bottom, margin.top])

svg
.append("g")
.attr("fill", 'royalblue')
.selectAll("rect")
.data(data.sort((a, b) => d3.descending(a.Y, b.score)))
.join("rect")
.attr("x", (d, i) => x(i))
.attr("y", d => y(d.Y))
.attr('title', (d) => d.Y)
.attr("class", "rect")
.attr("height", d => y(0) - y(d.Y))
.attr("width", x.bandwidth());

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y).ticks(null, data.format))
  .attr("font-size", '20px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x).tickFormat(i => data[i].X))
  .attr("font-size", '20px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();