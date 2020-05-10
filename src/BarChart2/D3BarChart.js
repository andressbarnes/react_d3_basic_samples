import { select } from 'd3'; //TODO refine import later

const canvasHeight = 300;
const scale = 10;

class D3BarChart {
  constructor(element, data, callback) {
    const vis = this;
    vis.svgCanvas = select(element).style('border', '1px solid black');
    const bars = vis.svgCanvas.selectAll('.bar').data(data);

    bars
      .enter()
      .append('rect')
      .merge(bars)
      .attr('class', 'bar')
      .attr('width', 40)
      .attr('height', (datapoint) => datapoint * scale)
      .attr('fill', 'orange')
      .attr('x', (datapoint, iteration) => iteration * 45 + 4)
      .attr('y', (datapoint) => canvasHeight - datapoint * scale)
      .on('click', (datapoint, index) => {
        callback(datapoint, index);
      });

    bars.exit().remove();
  }

  update = ({ data }) => {
    //call when data is changed
    console.log(data);
    const vis = this;
    const bars = vis.svgCanvas.selectAll('.bar').data(data);

    bars
      .transition()
      .attr('height', (datapoint) => datapoint * scale)
      .attr('y', (datapoint) => canvasHeight - datapoint * scale);

    bars.exit().remove();
  };
}

export default D3BarChart;
