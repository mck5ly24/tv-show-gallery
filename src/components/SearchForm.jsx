import React from 'react';

export default function SearchForm({ query, setQuery, onSearch }) {
  return (
    <form onSubmit={onSearch}>
      <label htmlFor="search">Show title or keyword: </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
