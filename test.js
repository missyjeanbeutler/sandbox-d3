    // ******** DATA ******** // 
    
    var oldData = [{
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


    var newData = [{
      day: 1,
      num: 450
    }, {
      day: 2,
      num: 20
    }, {
      day: 3,
      num: 435
    }, {
      day: 4,
      num: 40
    }, {
      day: 5,
      num: 70
    }, {
      day: 6,
      num: 320
    }, {
      day: 7,
      num: 330
    }, {
      day: 8,
      num: 400
    }, {
      day: 9,
      num: 80
    }, {
      day: 10,
      num: 430
    }];

// ******** height, width, margin ******** // 

    var height = 500;
    var width = 500
    var margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    }

    var data = oldData

// ******** MAX/MIN ARRAYS FOR DOMAIN ******** // 

    var yMax = [d3.min(data, d => d.num), d3.max(data, d => d.num) + 50] 
    var xMax = d3.extent(data, d => d.day)//gives you an array of the min and max for you

// ******** SETTING SCALES ******** // 

    var xScale = d3.scaleLinear()
      .domain(xMax)
      .range([margin.left, width - margin.right])

    var yScale = d3.scaleLinear()
      .domain(yMax) //input
      .range([height - margin.top, margin.bottom]) //output ... the idea of scaling is to take the values of data that we have and to fit them into the space we have available (space being the pixel width)
    //([start, stop]) both must be in arrays, the first argument being start and the second stop

// ******** SET X AND Y AXIS ******** // 

    var xAxis = d3.axisBottom().scale(xScale)
    var yAxis = d3.axisLeft().scale(yScale)

// ******** SET RECTANGLES ******** // 

    var svg = d3.select('svg')

    svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('width', 25)
      .attr('height', 0)
      .attr('x', d => xScale(d.day))
      .attr('y', height)
      .attr('fill', 'yellow')

// ******** CALL AXIS' ******** // 

    svg.append('g') //g element is a group element that acts as a container for multiple items
      //.attr('transform', 'translate(40, 20)') //the translate is 40 from the left and 20 pixels from the top
      .attr('transform', 'translate(' + [margin.left, 0] + ')')
      .attr("class", "y axis")
      .call(yAxis)

    svg.append('g')
      .attr('transform', 'translate(' + [12, height - margin.bottom + 39] + ')')
      .call(xAxis)

// ******** RECTANGLE TRANSTITIONS TO FULL HEIGHT ******** // 

    svg.selectAll('rect')
      .transition()
      .duration(1500)
      .attr('height', d => height - yScale(d.num))
      .attr('x', d => xScale(d.day))
      .attr('y', d => yScale(d.num))
      .attr('fill', d => d.num >= 200 ? 'red' : 'blue') //you can use a function and the parameters are the same as the callback functions in .map and .filter
      .attr('stroke', '#fff');

// ******** UPDATE DATA BUTTON ******** // 

    function updateData() {

// ******** CHECK DATA FOR TOGGLING ******** // 

      if (data === oldData) data = newData
      else data = oldData

// ******** RESET Y SCALE AND AXIS ******** // 

      yMax = [d3.min(data, d => d.num), d3.max(data, d => d.num) + 50]
      yScale = d3.scaleLinear()
        .domain(yMax)
        .range([height - margin.top, margin.bottom])
      yAxis = d3.axisLeft().scale(yScale)

// ******** TRANSITIONS WITH NEW DATA ******** // 

      svg.select('.y.axis')
        .transition()
        .duration(1500)
        .call(yAxis)

      svg.selectAll('rect')
        .data(data)
        .transition()
        .duration(1500)
        .attr('height', d => height - yScale(d.num))
        .attr('y', d => yScale(d.num))
        .attr('fill', d => d.num >= 200 ? 'red' : 'blue')
    }