import React from 'react';

import NotesList from './components/NotesList';
import NotesViewer from './components/NotesViewer';
import './App.scss';
import TagsFilter from './utils/tagsFilter';
import NOTES from './data/notes';
import TAGS from './data/tags';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNote: 1
    }
  }

  changeNote = (target) => {
    this.editNoteEnd();
    this.setState({activeNote: target.id});
  }

  editNoteStart = () => {
    const noteText = document.querySelector('.textArea');
    noteText.setAttribute('contentEditable', true);
    noteText.classList.add('editNoteText');
    noteText.focus();
    document.getElementById('editBtn').classList.add('hidden');
    document.getElementById('saveBtn').classList.remove('hidden');
    document.querySelector('.notes-viewer > h1').style = "display: none";
    document.getElementById('editNoteTitle').classList.remove('hidden');
  }

  editNoteEnd = () => {
    const noteText = document.querySelector('.textArea');
    noteText.setAttribute('contentEditable', false);
    noteText.classList.remove('editNoteText');
    document.getElementById('editBtn').classList.remove('hidden');
    document.getElementById('saveBtn').classList.add('hidden');
    document.querySelector('.notes-viewer > h1').style = {};
    document.getElementById('editNoteTitle').classList.add('hidden');
  }

  render() {
    return (
    <div className="App">
      <NotesList
        notes={ NOTES.notes } 
        tags={ TAGS.tags } 
        onChange={ this.changeNote }
      />
      <NotesViewer 
        note={ NOTES.notes[this.state.activeNote] } 
        tags={ TagsFilter(TAGS.tags, NOTES.notes[this.state.activeNote].tags.split(',')) }
        editNote={ this.editNoteStart } 
          saveNote={ this.editNoteEnd } 
      />
    </div>
    )
  }
}

export default App;
