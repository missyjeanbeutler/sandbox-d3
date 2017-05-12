    var data = [{
      day: 1,
      num: 100
    }, {
      day: 2,
      num: 250
    }, {
      day: 3,
      num: 175
    }, {
      day: 4,
      num: 200
    }, {
      day: 5,
      num: 120
    }, {
      day: 6,
      num: 300
    }, {
      day: 7,
      num: 130
    }, {
      day: 8,
      num: 500
    }, {
      day: 9,
      num: 600
    }, {
      day: 10,
      num: 50
    }];

    var height = 500;
    var width = 500
    var margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    }

    var yMax = d3.extent(data, d => d.num) //gives you an array of the min and max for you
    var xMax = d3.extent(data, d => d.day)

    var xScale = d3.scaleLinear()
      .domain(xMax)
      .range([margin.left, width - margin.right])

    var yScale = d3.scaleLinear()
      .domain(yMax) //input
      .range([height - margin.top, margin.bottom]) //output ... the idea of scaling is to take the values of data that we have and to fit them into the space we have available (space being the pixel width)
    //([start, stop]) both must be in arrays, the first argument being start and the second stop


    var xAxis = d3.axisBottom().scale(xScale)
    var yAxis = d3.axisLeft().scale(yScale)

    var svg = d3.select('svg')

    svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('width', 25)
      .attr('height', d => height - yScale(d.num))
      .attr('x', d => xScale(d.day))
      .attr('y', d => yScale(d.num))
      .attr('fill', d => d.num >= 200 ? 'red' : 'blue') //you can use a function and the parameters are the same as the callback functions in .map and .filter
      .attr('stroke', '#fff');

    svg.append('g') //g element is a group element that acts as a container for multiple items
      //.attr('transform', 'translate(40, 20)') //the translate is 40 from the left and 20 pixels from the top
      .attr('transform', 'translate(' + [margin.left, 0] + ')')
      .call(yAxis)

    svg.append('g')
      .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      .call(xAxis)










    // var data = [1, 100, 2, 250, 3, 175, 4, 200, 5, 120, 6, 300, 7, 13, 8, 500, 9, 600, 10, 50];
    // var rectWidth = 25;
    // var height = 500;
    // var margin = {top: 20, right: 20, bottom: 20, right: 20}

    // var yExtent = d3.extent(data, d => d) //gives you an array of the min and max for you
    // var xExtent = d3.extent(data, d => d)

    // var yScale = d3.scaleLinear()
    //   .domain(yExtent) //input
    //   .range([height - margin.top, margin.bottom]) //output ... the idea of scaling is to take the values of data that we have and to fit them into the space we have available (space being the pixel width)
    //   //([start, stop]) both must be in arrays, the first argument being start and the second stop

    // var yAxis = d3.axisLeft().scale(yScale)

    // var svg = d3.select('svg')
    //   .append('g') //g element is a group element that acts as a container for multiple items
    //   // .attr('transform', 'translate(40, 20)') //the translate is 40 from the left and 20 pixels from the top
    // .attr('transform', 'translate(' + [margin.left, 0] + ')')
    //   .call(yAxis)


    // var rect = svg.selectAll('rect')
    //   .data(data)
    //   .enter().append('rect')
    //   .attr('x', (d, i) => i * rectWidth)
    //   .attr('y', height)  
    //   .attr('width', rectWidth)
    //   .attr('height', 0)
    //   .attr('fill', 'yellow')


    // rect.transition()
    //   .duration(1500)
    //   .ease(d3.easeLinear)
    //   // .attr('x', (d, i) => i * rectWidth)
    //   .attr('y', d => yScale(d))
    //   // .attr('width', rectWidth)
    //   .attr('height', d => height - yScale(d))
    //   .attr('fill', d => d >= 200 ? 'red' : 'blue') //you can use a function and the parameters are the same as the callback functions in .map and .filter
    //   .attr('stroke', '#fff');