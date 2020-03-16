import React from 'react';
import Day from './components/Day';
import SearchForm from './components/SearchForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { forecasts: [], inputValue: '' };
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    const inputValue = this.state.inputValue.replace(/\s+/g, '');
    const city = inputValue.substring(0, inputValue.indexOf(','));
    const country = inputValue.substring(inputValue.indexOf(',') + 1);
    this.getWeatherData(city, country);
    event.preventDefault();
  }

  getWeatherData(city, country) {
    fetch(`/${country}/${city}`)
      .then(resp => {
        if (!resp.ok) throw Error(resp.statusText);
        return resp.json();
      })
      .then(data => {
        const { city, list } = data;

        // Calculate highest and lowest temps for each day
        const forecasts = [...this.state.forecasts];
        list.forEach(item => {
          const day = new Date((item.dt + city.timezone) * 1000).getUTCDay();
          const forecast = forecasts.find(forecast => forecast.day === day);
          const { temp_min, temp_max } = item.main;
          if (forecast) {
            forecast.high = Math.max(...[forecast.high, temp_max]);
            forecast.low = Math.min(...[forecast.low, temp_min]);
          } else {
            forecasts.push({ day, high: -Infinity, low: Infinity });
          }
        });

        // Use first forecast of the day to set weather condition for the entire day as a rough indication
        for (let forecast of forecasts) {
          const first = list.filter(
            item =>
              new Date((item.dt + city.timezone) * 1000).getUTCDay() ===
              forecast.day
          )[0];
          const { id, main, description } = first.weather[0];
          Object.assign(forecasts[forecasts.indexOf(forecast)], {
            id,
            main,
            description
          });
        }

        this.setState({ forecasts });
        console.log(this.state.forecasts);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Weather App</h1>
        </header>
        <SearchForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          value={this.state.inputValue}
        />
        <div className="forecast weekly">
          {this.state.forecasts.map(forecast => {
            return <Day forecast={forecast} key={forecast.day} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
