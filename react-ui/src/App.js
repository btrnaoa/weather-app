import React from 'react';
import Day from './components/Day';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function formatName(name) {
  return name
    .trim()
    .replace(' ', '+')
    .replace(/\s+/g, '');
}

function getDay(secs) {
  return new Date(secs * 1000).getUTCDay();
}

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
    const value = this.state.value;
    let city = value;
    let country = '';
    if (value.includes(',')) [city, country] = value.split(',');
    this.getWeatherData(formatName(city), formatName(country));
    this.setState({ value: '' });
    event.preventDefault();
  }

  getWeatherData(city, country) {
    const path = country ? `/${country}/${city}` : `/${city}`;
    fetch(path)
      .then(resp => {
        if (!resp.ok) throw Error(resp.statusText);
        return resp.json();
      })
      .then(data => {
        const { cod, message, city, list } = data;
        if ((!city || !list) && cod && message) {
          alert(message);
          return;
        }

        // Calculate highest and lowest temps for each day
        const forecasts = [];
        list.forEach(item => {
          const day = getDay(item.dt + city.timezone);
          const forecast = forecasts.find(forecast => forecast.day === day);
          const { temp_min, temp_max } = item.main;
          if (forecast) {
            forecast.high = Math.max(...[forecast.high, temp_max]);
            forecast.low = Math.min(...[forecast.low, temp_min]);
          } else {
            forecasts.push({ day, high: temp_max, low: temp_min });
          }
        });

        // Assign earliest weather conditions for each forecast
        for (let forecast of forecasts) {
          const earliest = list.filter(
            item => getDay(item.dt + city.timezone) === forecast.day
          )[0];
          const { id, main, description } = earliest.weather[0];
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
