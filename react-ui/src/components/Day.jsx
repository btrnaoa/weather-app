import React from 'react';

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Day extends React.Component {
  render() {
    const forecast = this.props.forecast;
    return (
      <div className="forecast daily">
        <span>{daysInWeek[forecast.day]}</span>
        <img
          src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
          alt={forecast.description}
          title={forecast.description}
        />
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
