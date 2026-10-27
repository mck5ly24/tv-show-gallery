import React from 'react';

export default function CastList({ cast, limit, showCharacters = false }) {
  if (cast.length === 0) return <p>Cast not available.</p>;

  return (
    <ul>
      {cast.slice(0, limit).map(member => (
        <li key={member.person.id + '-' + member.character.id}>
          {member.person.name || 'Name not available'}
          {showCharacters && ' as ' + (member.character.name || 'Character not available')}
        </li>
      ))}
    </ul>
  );
}
