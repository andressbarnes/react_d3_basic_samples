import React, { useEffect, useRef } from 'react';
import { select } from 'd3';

const BarChartHooks = (props) => {
  const { data, callback } = props;
  const svgBarRef = useRef();
  const canvasHeight = 300;
  const canvasWidth = 500;
  const scale = 10;

  //render bar chart
  useEffect(() => {
    const svgCanvas = select(svgBarRef.current);
    svgCanvas.style('border', '1px solid black');

    svgCanvas
      .selectAll('.bar')
      .data(data)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('class', 'bar')
            .attr('width', 40)
            .attr('x', (datapoint, index) => index * 45 + 4)
            .attr('height', (datapoint) => datapoint * scale)
            .attr('y', (datapoint) => canvasHeight - datapoint * scale)
            .attr('fill', 'orange')
            .on('click', (datapoint, index) => {
              callback(datapoint);
            }),
        (update) =>
          update
            .transition()
            .attr('height', (datapoint) => datapoint * scale)
            .attr('y', (datapoint) => canvasHeight - datapoint * scale),
        (exit) =>
          // prettier-ignore
          exit.remove()
      );
  }, [data, callback]);

  return (
    <div>
      <svg width={canvasWidth} height={canvasHeight} ref={svgBarRef} />
    </div>
  );
};

export default BarChartHooks;
