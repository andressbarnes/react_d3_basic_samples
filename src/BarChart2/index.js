import React, { Component } from 'react';
import D3BarChart from './D3BarChart';

class ChartWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3BarChart(
        this.refs.canvas,
        this.props.data,
        this.props.callback
      ),
      prevProps: this.props,
    });
  }

  //check if the props have changed from the previous render
  shouldComponentUpdate(nextProps, state) {
    if (nextProps !== state.prevProps) {
      this.state.chart.update(nextProps);
    }
    return nextProps !== state.prevProps;
  }

  render() {
    return <svg width="500px" height="300px" ref="canvas" />;
  }
}

export default ChartWrapper;
