import React from 'react';

import TagCloud from '../TagCloud';
import './NotesList.scss';



export default ({ activeNote, notes, tags, onChange, deleteData, saveData, newNote, filter, filterEnabled }) => {
  const NotesTitles = [];
  Object.keys(notes).forEach(id => {
    NotesTitles.push(<li key={id} className={activeNote === id ? 'active' : undefined}>
      <label htmlFor={`note_${id}`}>{notes[id].title}</label>
      <input type="radio" id={`note_${id}`} name="notesTitles" 
        checked={+id === +activeNote} 
        onChange={() => onChange({ id })} />
    </li>);
  });
  return (
    <div className="notes-list">
      <h1>Notes</h1>
      <input type="text" id="newNoteTitle" placeholder="Add new note title..." />
      <button className="btn btn-green" onClick={ newNote }>New</button>
      <ul>
        { NotesTitles }
      </ul>
      <span>Filter by: { filterEnabled || 'none' }</span>
      <button onClick={() => filter(null)} className="btn btn-inverted">X</button>
      <TagCloud tags={tags} deleteData={deleteData} saveData={saveData} addNew={true} filter={filter} />
    </div>
  )
}