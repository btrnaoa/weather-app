import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function LocationMarker({ location }) {
  return (
    <div className="container">
      <span style={{ fontSize: '2rem' }}>
        {location.city}, {location.country}
      </span>
      <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
    </div>
  );
}
