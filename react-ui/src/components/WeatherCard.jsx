import React from 'react';

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function WeatherCard({ forecast }) {
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
