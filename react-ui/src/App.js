import React from 'react';
import Day from './components/Day';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { city: '', country: '', forecasts: [], value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const value = this.state.value.replace(/\s+/g, '');
    const city = value.substring(0, value.indexOf(','));
    const country = value.substring(value.indexOf(',') + 1);
    this.getWeatherData(city, country);
    this.setState({ value: '' });
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

        this.setState({ city: city.name, country: city.country });
        this.setState({ forecasts });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="container" style={{ height: '100vh' }}>
        {this.state.city ? (
          <div className="container">
            <span style={{ fontSize: '2rem' }}>
              {this.state.city}, {this.state.country}
            </span>
            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
          </div>
        ) : null}

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
        </form>
        <div className="forecast">
          {this.state.forecasts.map(forecast => {
            return <Day forecast={forecast} key={forecast.day} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
