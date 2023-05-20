
// Get the modal
dModalContent = document.getElementById("dModalContent");

// Get the button that opens the modal
btn = document.getElementById("diagram1");

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];

// When the user clicks on a diagram, open the modal
function openDiagramModal() {
    dModalContent.style.display = "flex";
  }


// When the user clicks on <span> (x), close the modal
function closeDiagramModal() {
  dModalContent.style.display = "none";
}


accountIcon = document.getElementById("account-icon");

accountIcon.addEventListener("click", function() {
  document.getElementById("account-dropdown").style.display = "flex";
})

// ! diagram

// select the SVG element where the chart will be rendered
svg = d3.select('svg');

// define the chart dimensions and margins
margin = { top: 20, right: 20, bottom: 30, left: 40 };
width = +svg.attr('width') - margin.left - margin.right;
height = +svg.attr('height') - margin.top - margin.bottom;

// create a group element for the chart
g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// fetch the CSV data and render the chart
fetch('../data/CST.csv')
  .then(response => response.text())
  .then(data => {
    // parse the CSV data into an array of objects
    rows = data.trim().split('\n').slice(1);
    result = rows.map(row => {
      values = row.split(',');
      return {
        therapeuticArea: values[1],
        studyPhase: values[3]
      };
    });

    // count the number of studies in each phase for each therapeutic area
    groupByTherapeuticArea = d3.group(result, d => d.therapeuticArea);
    data = Array.from(groupByTherapeuticArea, ([key, values]) => {
      groupByStudyPhase = d3.group(values, d => d.studyPhase);
      phases = Array.from(groupByStudyPhase, ([key, values]) => ({
        studyPhase: key,
        count: values.length
      }));
      return {
        therapeuticArea: key,
        phases: phases
      };
    });

    // flatten the nested data structure into an array of objects
    flattenedData = data.flatMap(d => d.phases.map(p => ({
      therapeuticArea: d.therapeuticArea,
      studyPhase: p.studyPhase,
      count: p.count
    })));

    // create a scale for the y-axis
    y = d3.scaleLinear()
      .domain([0, d3.max(flattenedData, d => d.count)])
      .range([height, 0]);

    // create a scale for the x-axis
    x = d3.scaleBand()
      .domain(flattenedData.map(d => d.therapeuticArea))
      .range([0, width])
      .padding(0.1);

    // create the x-axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // create the y-axis
    g.append('g')
      .call(d3.axisLeft(y));

    // create the bars
    g.selectAll('.bar')
      .data(flattenedData)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.therapeuticArea))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count));
  });