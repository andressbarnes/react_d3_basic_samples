import React, { Component } from 'react';
import D3BarChart from './D3BarChart';

class ChartWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevProps: this.props,
    };
  }

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
    return nextProps !== state.prevProps;
  }

  UNSAFE_componentWillUpdate(nextProps) {
    this.state.chart.update(nextProps);
  }

  render() {
    return <svg width="500px" height="300px" ref="canvas" />;
  }
}

export default ChartWrapper;
