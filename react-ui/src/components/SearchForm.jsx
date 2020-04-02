import React from 'react';

export default function SearchForm({ onChange, onSubmit, value }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} placeholder="City" onChange={onChange} />
      <input type="submit" value="Search" />
    </form>
  );
}
