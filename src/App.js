import React from 'react';

import * as StorageWorker from './utils/StorageWorker';
import * as PrepareData from './utils/prepareDataToSave';
import * as DomWorker from './utils/domWorker';
import TagsFilter from './utils/tagsFilter';

import NotesList from './components/NotesList';
import NotesViewer from './components/NotesViewer';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    StorageWorker.checkData();
    this.state = {
      activeNote: StorageWorker.firstId('notes'),
      tags: StorageWorker.getData('tags'),
      notes: StorageWorker.getData('notes'),
      filterEnabled: ''
    }
  }

  changeNote = (target) => {
    DomWorker.editEnd();
    this.setState({activeNote: target.id});
  }

  reReadStorage = () => {
    this.setState({
      tags: StorageWorker.getData('tags'),
      notes: StorageWorker.getData('notes')
    })
    if (!StorageWorker.isExist(this.state.activeNote)) {
      this.setState({activeNote: StorageWorker.firstId('notes')})
    }
  }

  deleteData = (key, id) => {
    StorageWorker.deleteData(key, id);
    this.reReadStorage();
  }

  saveData = (key, id) => {
    const dataToSave = key === 'tags' ? PrepareData.formatTag() : PrepareData.getNoteObj(id);
    StorageWorker.saveData(key, dataToSave, id);
    this.reReadStorage();
    DomWorker.editEnd();
  }

  newNote = () => {
    DomWorker.editStart();
    DomWorker.clearAllInputs();
    document.getElementById('editNoteTitle').value = document.getElementById('newNoteTitle').value;
    const newId = StorageWorker.newId('notes');
    const emptyNote = PrepareData.getNoteObj(newId);
    StorageWorker.saveData('notes', emptyNote, newId);
    this.reReadStorage();
    this.setState({ activeNote: newId });
  }

  autoTagCreate = (newTagsNote) => {
    const { activeNote, notes, tags } = this.state;
    const savedTags = Object.values(tags);
    const newTagsTotal = newTagsNote.filter(i => !savedTags.includes(i));
    newTagsTotal.map(i => PrepareData.formatTag(i));
    const newTagsTotalUnique = PrepareData.uniqueArr(newTagsTotal);
    newTagsTotalUnique.forEach(tag => StorageWorker.saveData('tags', tag));

    const modifNote = PrepareData.injectTags(notes[activeNote], newTagsNote);
    StorageWorker.saveData('notes', modifNote, activeNote);
    this.reReadStorage();
  }

  filter = (id) => {
    if (id === null) {
      this.reReadStorage();
      return;
    }    
    const notes = StorageWorker.getData('notes');
    const tags = StorageWorker.getData('tags');
    const filteredNotes = {};
    for (const noteId in notes) {
      if (notes[noteId].tags.split(',').includes(tags[id])) {
        filteredNotes[noteId] = notes[noteId];
      }
    }
    if (Object.keys(filteredNotes).length !== 0) {
      this.setState({ activeNote: Object.keys(filteredNotes)[0], 
        notes: filteredNotes,
        filterEnabled: tags[id] });
    } else {
      this.deleteData('tags', id);
    }
  }

  render() {
    const { activeNote, tags, notes } = this.state;
    return (
    <div className="App">
      <NotesList
        activeNote={ activeNote }
        notes={ notes } 
        tags={ tags } 
        onChange={ this.changeNote }
        deleteData={this.deleteData }
        saveData={ this.saveData }
        newNote={ this.newNote }
        filter={ this.filter }
        filterEnabled={ this.state.filterEnabled }
      />
      <NotesViewer 
        note={ notes[this.state.activeNote] } 
        tags={ TagsFilter(tags, notes[activeNote].tags.split(',')) }
        editNote={ DomWorker.editStart } 
        saveData={ this.saveData } 
        deleteData={ this.deleteData }
        autoTagCreate={ this.autoTagCreate }
        filter={this.filter}
      />
    </div>
    )
  }
}

export default App;
