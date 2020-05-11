import React, { Component } from 'react';
import { select } from 'd3';

const canvasHeight = 300;
const canvasWidth = 500;
const scale = 10;

class BarChart extends Component {
  componentDidMount() {
    this.drawBarChart(this.props.data);
  }

  //note: this is deprecated, use prefix 'UNSAFE_'
  UNSAFE_componentWillReceiveProps(newProps) {
    this.updateBarChart(newProps.data);
  }

  drawBarChart(data) {
    const svgCanvas = select(this.refs.canvas).style(
      'border',
      '1px solid black'
    );
    const bars = svgCanvas.selectAll('.bar').data(data);

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
        this.props.callback(datapoint, index);
      });
  }

  updateBarChart(newData) {
    const svgCanvas = select(this.refs.canvas);
    const bars = svgCanvas.selectAll('.bar').data(newData);

    bars
      .transition()
      .attr('height', (datapoint) => datapoint * scale)
      .attr('y', (datapoint) => canvasHeight - datapoint * scale);

    bars.exit().remove();
  }

  render() {
    return <svg width={canvasWidth} height={canvasHeight} ref="canvas" />;
  }
}
export default BarChart;
