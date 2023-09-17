// select the SVG element where the chart will be rendered
svg = d3.select('#myChart');

// define the chart dimensions and margins
margin = { top: 20, right: 20, bottom: 50, left: 40 };
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
        therapeuticArea: values[9],
        studyPhase: values[1]
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
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.15em')
      .attr('transform', 'rotate(-45)')
      .text(d => {
        // Modify the label text to fit within limited space
        const maxLength = 9;
        return d.length > maxLength ? d.substring(0, maxLength - 3) + '...' : d;
    });

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