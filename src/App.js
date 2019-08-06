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
      activeNoteId: StorageWorker.firstId('notes'),
      tags: StorageWorker.getData('tags'),
      notes: StorageWorker.getData('notes'),
      filterEnabled: '',
      noteTags: ''
    }
  }

  changeNote = (target) => {
    DomWorker.editEnd();
    if (this.state.filterEnabled === '') {
      this.reReadStorage(target.id);
    }
  }

  reReadStorage = (targetId = StorageWorker.firstId('notes')) => {
    const tags = StorageWorker.getData('tags');
    const notes = StorageWorker.getData('notes');
    const noteTags = TagsFilter(tags, notes[targetId].tags.split(','));
    this.setState({
      tags,
      notes,
      activeNoteId: targetId,
      noteTags,
      filterEnabled: ''
    })
  }

  deleteData = (key, id) => {
    StorageWorker.deleteData(key, id);
    this.setState({filterEnabled: ''});
    this.reReadStorage();
  }

  saveData = (key, id) => {
    const dataToSave = key === 'tags' ? PrepareData.formatTag() : PrepareData.getNoteObj(id);
    StorageWorker.saveData(key, dataToSave, id);
    DomWorker.editEnd();
    if (this.state.filterEnabled === '') {
      this.reReadStorage(this.state.activeNoteId);
    } else {
      this.filter(this.state.filterEnabled);
      this.setState({activeNoteId: this.state.activeNoteId});
    }
  }

  newNote = () => {
    DomWorker.editStart();
    DomWorker.clearAllInputs();
    document.getElementById('editNoteTitle').value = document.getElementById('newNoteTitle').value;
    document.querySelectorAll('#noteTags span').forEach(el => el.innerHTML = '');
    const newId = StorageWorker.newId('notes');
    const emptyNote = PrepareData.getNoteObj(newId);
    StorageWorker.saveData('notes', emptyNote, newId);
    this.reReadStorage(newId);
  }

  autoTagCreate = (newTagsNote) => {
    const { activeNoteId, notes, tags } = this.state;
    const savedTags = Object.values(tags);
    const newTagsTotal = newTagsNote.filter(i => !savedTags.includes(i));
    newTagsTotal.map(i => PrepareData.formatTag(i));
    const newTagsTotalUnique = PrepareData.uniqueArr(newTagsTotal);
    newTagsTotalUnique.forEach(tag => StorageWorker.saveData('tags', tag));
    const modifNote = PrepareData.injectTags(notes[activeNoteId], newTagsNote);
    StorageWorker.saveData('notes', modifNote, activeNoteId);
    this.reReadStorage(activeNoteId);
    StorageWorker.clearUnusedTags();
  }

  filter = (id) => {
    if (id === null) {
      this.reReadStorage();
      this.setState({ filterEnabled: ''})
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
      this.setState({ activeNoteId: Object.keys(filteredNotes)[0], 
        notes: filteredNotes,
        filterEnabled: tags[id],
        noteTags: TagsFilter(tags, filteredNotes[Object.keys(filteredNotes)[0]].tags.split(',')) });
    } else {
      this.deleteData('tags', id);
    }
  }

  render() {
    const { activeNoteId, tags, notes, filterEnabled, noteTags } = this.state;
    return (
    <div className="App">
      <NotesList
        activeNoteId={ activeNoteId }
        notes={ notes } 
        tags={ tags } 
        onChange={ this.changeNote }
        deleteData={this.deleteData }
        saveData={ this.saveData }
        newNote={ this.newNote }
        filter={ this.filter }
        filterEnabled={ filterEnabled }
      />
      <NotesViewer 
        note={ notes[this.state.activeNoteId] } 
        tags={ noteTags }
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
