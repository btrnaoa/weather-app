import React from 'react';
import '../css/weather-icons.min.css';

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Day extends React.Component {
  render() {
    const forecast = this.props.forecast;
    return (
      <div className="forecast daily">
        <span>{daysInWeek[forecast.day]}</span>
        <i className={`wi wi-owm-${forecast.id} group-icon`}></i>
        <div>
          <span className="temps high">{Math.floor(forecast.high)}&deg;</span>{' '}
          <span className="temps low">{Math.floor(forecast.low)}&deg;</span>
        </div>
        <div></div>
      </div>
    );
  }
}

export default Day;
