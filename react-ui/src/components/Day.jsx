import React from 'react';
import '../css/weather-icons.min.css';

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Day extends React.Component {
  render() {
    const forecast = this.props.forecast;
    return (
      <div className="forecast daily">
        <span>{daysInWeek[forecast.day]}</span>
        <i
          className={`wi wi-owm-${forecast.id}`}
          style={{ color: '#333', fontSize: '5rem' }}
          alt=""
        />
        <div style={{ fontSize: '1.8rem' }}>
          <span style={{ color: '#2b2b2b' }}>
            {Math.floor(forecast.high)}&deg;
          </span>{' '}
          <span>{Math.floor(forecast.low)}&deg;</span>
        </div>
        <span>{forecast.description}</span>
      </div>
    );
  }
}

export default Day;
