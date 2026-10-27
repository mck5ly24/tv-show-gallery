import React from 'react';
import { plainText, dateOnly, updatedDate, genres, rating } from '../utils.js';

export default function ShowInfo({ show, shortSummary = false }) {
  const summary = plainText(show.summary);
  const text = shortSummary && summary.length > 180
    ? summary.slice(0, 177) + '...'
    : summary;

  return (
    <>
      <p>{text}</p>
      <p><strong>Premiered:</strong> {dateOnly(show.premiered)}</p>
      <p><strong>Last updated:</strong> {updatedDate(show.updated)}</p>
      <p><strong>Genres:</strong> {genres(show)}</p>
      <p><strong>Average rating:</strong> {rating(show)}</p>
      <p>
        {show.url
          ? <a href={show.url} target="_blank" rel="noreferrer">View on TVmaze</a>
          : 'TVmaze link not available'}
      </p>
    </>
  );
}
