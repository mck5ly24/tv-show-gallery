import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShowInfo from './ShowInfo.jsx';
import CastList from './CastList.jsx';

export default function ShowDetail() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [cast, setCast] = useState([]);
  const [castStatus, setCastStatus] = useState('loading');
  const [castError, setCastError] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let active = true;

    setStatus('loading');
    setCastStatus('loading');
    setError('');
    setCastError('');
    setImageError(false);

    if (!/^\d+$/.test(id) || Number(id) < 1) {
      setError(
        'Invalid show ID. Please choose a show from the gallery.'
      );
      setStatus('error');
      return;
    }

    fetch('https://api.tvmaze.com/shows/' + id)
      .then(response => {
        if (response.status === 429) {
          throw new Error(
            'Too many requests. Please wait and try again.'
          );
        }

        if (response.status === 404) {
          throw new Error(
            'Show not found. Check the URL or return to the gallery.'
          );
        }

        if (!response.ok) {
          throw new Error(
            'Could not load this show. Please try again.'
          );
        }

        return response.json();
      })
      .then(data => {
        if (active) {
          setShow(data);
          setStatus('success');
        }
      })
      .catch(err => {
        if (active) {
          setError(err.message);
          setStatus('error');
        }
      });

    fetch('https://api.tvmaze.com/shows/' + id + '/cast')
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
        if (active) {
          setCast(data);
          setCastStatus('success');
        }
      })
      .catch(err => {
        if (active) {
          setCastError(err.message);
          setCastStatus('error');
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  let poster = <p className="no-image">No image available</p>;
  let channel = 'Not available';

  if (show) {
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

    if (show.network && show.network.name) {
      channel = show.network.name;
    } else if (show.webChannel && show.webChannel.name) {
      channel = show.webChannel.name;
    }
  }

  return (
    <section className="show-detail">
      <Link to="/">Back to gallery</Link>

      {status === 'loading' && <p>Loading show...</p>}

      {status === 'error' && (
        <p role="alert">{error}</p>
      )}

      {status === 'success' && show && (
        <>
          <h2>{show.name || 'Untitled show'}</h2>

          {poster}

          <ShowInfo show={show} />

          <p>
            <strong>Status:</strong>{' '}
            {show.status || 'Not available'}
          </p>

          <p>
            <strong>Network or streaming channel:</strong>{' '}
            {channel}
          </p>

          <h3>Cast and Characters</h3>

          {castStatus === 'loading' && <p>Loading cast...</p>}

          {castStatus === 'error' && (
            <p>Cast could not load. {castError}</p>
          )}

          {castStatus === 'success' && (
            <CastList
              cast={cast}
              limit={15}
              showCharacters
            />
          )}
        </>
      )}
    </section>
  );
}