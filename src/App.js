import React, { Component } from 'react';
import { Segment, Button, Header } from 'semantic-ui-react';
import './app.css';

//components
import BarChart1 from './BarChart1'; // use class lifecycle methods with d3 inline
import BarChart2 from './BarChart2'; // wrapping a d3.js file in a class component
import BarChart3 from './BarChart3'; // use react hooks to selct and render within a RFC

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [2, 4, 2, 6, 8, 14, 12, 8, 2, 5, 9, 3, 2],
      SelectedBarValue: 'Select a bar',
    };
  }

  //callback function passed into the chart
  updateSelectedBarValue = (data) => {
    this.setState({
      ...this.state,
      SelectedBarValue: data,
    });
  };

  updateData = () => {
    const newData = this.state.data.map((v) =>
      Math.floor(Math.random() * Math.floor(20))
    );

    this.setState({
      data: newData,
      SelectedBarValue: 'Select a bar',
    });
  };

  render() {
    return (
      <>
        <Segment inverted color="blue">
          <h1>{this.state.SelectedBarValue}</h1>
          <Button onClick={() => this.updateData()} content="Update Bar Data" />
        </Segment>

        <div className="flex">
          <div>
            <Header>Class component using lifecycle</Header>
            <BarChart1
              data={this.state.data}
              callback={this.updateSelectedBarValue}
            />
          </div>
          <div>
            <Header>Class component using lifecycle v2</Header>
            <BarChart2
              data={this.state.data}
              callback={this.updateSelectedBarValue}
            />
          </div>
          <div>
            <Header>Functional component using Hooks</Header>
            <BarChart3
              data={this.state.data}
              callback={this.updateSelectedBarValue}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
