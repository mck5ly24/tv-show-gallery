import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowInfo from './ShowInfo.jsx';
import CastList from './CastList.jsx';

// Saves cast lists while the app is open.
const savedCast = {};

export default function ShowCard({ show }) {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let active = true;

    setStatus('loading');
    setError('');
    setImageError(false);

    // Use the saved cast if this show was loaded before.
    if (savedCast[show.id]) {
      setCast(savedCast[show.id]);
      setStatus('success');

      return () => {
        active = false;
      };
    }

    fetch('https://api.tvmaze.com/shows/' + show.id + '/cast')
      .then(response => {
        if (response.status === 429) {
          throw new Error(
            'Too many requests. Please wait and try again.'
          );
        }

        if (!response.ok) {
          throw new Error('Could not load cast.');
        }

        return response.json();
      })
      .then(data => {
        savedCast[show.id] = data;

        if (active) {
          setCast(data);
          setStatus('success');
        }
      })
      .catch(err => {
        if (active) {
          setError(err.message);
          setStatus('error');
        }
      });

    return () => {
      active = false;
    };
  }, [show.id]);

  let poster = <p className="no-image">No image available</p>;

  if (show.image && show.image.medium && imageError === false) {
    poster = (
      <img
        className="show-poster"
        src={show.image.medium}
        alt={'Poster for ' + (show.name || 'this show')}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <article className="show-card">
      <h3>
        <Link to={'/shows/' + show.id}>
          {show.name || 'Untitled show'}
        </Link>
      </h3>

      {poster}

      <ShowInfo show={show} shortSummary />

      <h4>Main Cast</h4>

      {status === 'loading' && <p>Loading cast...</p>}

      {status === 'error' && (
        <p>Cast could not load. {error}</p>
      )}

      {status === 'success' && (
        <CastList cast={cast} limit={3} />
      )}
    </article>
  );
}