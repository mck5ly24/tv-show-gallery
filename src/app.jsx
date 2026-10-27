import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm.jsx';
import ShowList from './components/ShowList.jsx';
import ShowDetail from './components/ShowDetail.jsx';

export default function App() {
  const [query, setQuery] = useState('friends');
  const [searchTerm, setSearchTerm] = useState('friends');
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (searchTerm === '') {
      setShows([]);
      setStatus('empty');
      return;
    }

    let active = true;
    setStatus('loading');
    setError('');

    fetch(
      'https://api.tvmaze.com/search/shows?q=' +
      encodeURIComponent(searchTerm)
    )
      .then(response => {
        if (response.status === 429) {
          throw new Error(
            'Too many requests. Please wait and try again.'
          );
        }

        if (!response.ok) {
          throw new Error('Could not load shows. Please try again.');
        }

        return response.json();
      })
      .then(data => {
        if (active) {
          setShows(data.slice(0, 10).map(result => result.show));
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
  }, [searchTerm, retry]);

  function searchShows(event) {
    event.preventDefault();

    const term = query.trim();

    if (term === searchTerm && status === 'error') {
      setRetry(retry + 1);
    } else {
      setSearchTerm(term);
    }
  }

  return (
    <div className="page">
      <header>
        <h1>
          <Link to="/">TV Show Gallery</Link>
        </h1>
        <p>Search for a show and learn more about it.</p>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm
                  query={query}
                  setQuery={setQuery}
                  onSearch={searchShows}
                />

                <ShowList
                  shows={shows}
                  status={status}
                  error={error}
                  searchTerm={searchTerm}
                />
              </>
            }
          />

          <Route path="/shows/:id" element={<ShowDetail />} />

          <Route
            path="*"
            element={
              <p>
                Page not found. <Link to="/">Return to gallery</Link>
              </p>
            }
          />
        </Routes>
      </main>

      <footer>
        <p>
          Show information from{' '}
          <a href="https://www.tvmaze.com/">TVmaze</a>.
          {' '}Data licensed under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">
            CC BY-SA
          </a>.
        </p>
      </footer>
    </div>
  );
}