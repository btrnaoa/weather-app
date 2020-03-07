import React from 'react';
import Day from './components/Day';
import { Button } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveWeatherData = this.retrieveWeatherData.bind(this);
    this.state = {
      forecasts: []
    };
  }

  async retrieveWeatherData() {
    const resp = await fetch('http://localhost:3001/au/melbourne');
    const data = await resp.json();
    const { list } = data;
    const arr = Array.from({ length: 7 }, () => ({
      temp_min: [],
      temp_max: [],
      description: [],
      icons: []
    }));
    list.forEach(item => {
      const day = new Date(item.dt * 1000).getDay();
      arr[day].temp_min.push(item.main.temp_min);
      arr[day].temp_max.push(item.main.temp_max);
      arr[day].description = arr[day].description.concat(
        item.weather.map(condition => condition.description)
      );
      arr[day].icons = arr[day].icons.concat(
        item.weather.map(condition => condition.icon)
      );
    });

    const days = [
      ...new Set(list.map(item => new Date(item.dt * 1000).getDay()))
    ];
    const forecasts = [];
    days.forEach(day =>
      forecasts.push({
        day,
        high: Math.max(...arr[day].temp_max),
        low: Math.min(...arr[day].temp_min),
        description: mode(arr[day].description),
        icon: mode(arr[day].icons)
      })
    );
    this.setState({ forecasts });

    console.log(data);
    console.log(arr);
    console.log(days);
    console.log(forecasts);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.retrieveWeatherData}>
          Update
        </Button>
        <div className="forecast weekly">
          {this.state.forecasts.map(forecast => {
            return <Day forecast={forecast} key={forecast.day}></Day>;
          })}
        </div>
      </div>
    );
  }
}

export default App;

const mode = arr =>
  arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();
