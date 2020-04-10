import React from 'react';
import WeatherCard from './components/WeatherCard';
import LocationMarker from './components/LocationMarker';
import SearchForm from './components/SearchForm';

function formatName(name) {
  return name.trim().replace(' ', '+').replace(/\s+/g, '');
}

function getDay(secs) {
  return new Date(secs * 1000).getUTCDay();
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      forecasts: [],
      location: { city: '', country: '' },
      value: '',
    };
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
      .then((resp) => {
        if (!resp.ok) throw Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        const { cod, message, city, list } = data;
        if ((!city || !list) && cod && message) {
          alert(message);
          return;
        }

        // Calculate highest and lowest temps for each day
        const forecasts = [];
        list.forEach((item) => {
          const day = getDay(item.dt + city.timezone);
          const forecast = forecasts.find((forecast) => forecast.day === day);
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
            (item) => getDay(item.dt + city.timezone) === forecast.day
          )[0];
          const { id, main, description } = earliest.weather[0];
          Object.assign(forecasts[forecasts.indexOf(forecast)], {
            id,
            main,
            description,
          });
        }

        this.setState({ location: { city: city.name, country: city.country } });
        this.setState({ forecasts });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="container" style={{ height: '100vh' }}>
        {this.state.location.city ? (
          <LocationMarker location={this.state.location} />
        ) : null}
        <SearchForm
          value={this.state.value}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <div className="forecast">
          {this.state.forecasts.map((forecast) => {
            return <WeatherCard forecast={forecast} key={forecast.day} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
