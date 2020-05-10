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
    });
  }

  //ignore reacts normal updates and
  //stop component from being rerendered
  shouldComponentUpdate() {
    return false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps);
  }

  render() {
    return <svg width="500px" height="300px" ref="canvas" />;
  }
}

export default ChartWrapper;
