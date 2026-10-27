import React from 'react';
import ShowCard from './ShowCard.jsx';

export default function ShowList({ shows, status, error, searchTerm }) {
  return (
    <section aria-live="polite">
      <h2>Search Results</h2>
      {status === 'loading' && <p>Loading shows...</p>}
      {status === 'empty' && <p>Enter a show title or keyword to start searching.</p>}
      {status === 'error' && <p role="alert">{error} Submit your search again to retry.</p>}

      {status === 'success' && (
        <>
          <p>{shows.length} results for "{searchTerm}"</p>
          {shows.length === 0 && <p>No shows found. Try a different search.</p>}
          <div className="show-list">
            {shows.map(show => <ShowCard key={show.id} show={show} />)}
          </div>
        </>
      )}
    </section>
  );
}
