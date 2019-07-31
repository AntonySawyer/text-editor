import React from 'react';

import TagCloud from '../TagCloud';
import './NotesList.scss';



export default ({ notes, tags, onChange }) => {
  const NotesTitles = [];
  Object.keys(notes).forEach((id, index) => {
    NotesTitles.push(<li key={id}>
      <label htmlFor={`note_${id}`}>{notes[id].title}</label>
      <input type="radio" id={`note_${id}`} name="notesTitles" 
        defaultChecked={index === 0} 
        onChange={() => onChange({ id })} />
    </li>);
  });
  return (
    <div className="notes-list">
      <h1>Notes</h1>
      <input type="text" placeholder="Add new note..." />
      <button className="btn btn-green">New</button>
      <ul>
        { NotesTitles }
      </ul>
      <TagCloud tags={ tags } />
    </div>
  )
}