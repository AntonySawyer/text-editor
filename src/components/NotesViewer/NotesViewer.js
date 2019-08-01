import React from 'react';
import TagCloud from '../TagCloud';
import { focusAtEnd } from '../../utils/domWorker';
import './NotesViewer.scss';

export default class NotesViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.note.title };
  }

  componentDidMount() {
    if (document.querySelector('p[contenteditable="true"]') === null) {
      this.highlightTags();
    }
  }

  componentDidUpdate() {
    if (document.querySelector('p[contenteditable="true"]') === null) {
      this.highlightTags();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (document.querySelector('p[contenteditable="true"]') === null) {
      this.setState({ title: nextProps.note.title });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.id === 'noteText' && event.keyCode === 32) {
      this.highlightTags('add');
    }
  }

  highlightTags = (mode = 'view') => {
    const container = document.getElementById('noteText');
    const content = container.innerText;
    if (content.match(/(#\w+)/g) !== null) {
      container.innerHTML = content.replace(/(#\w+)/g, `<span class="hightlight">$1</span>`);
      if (mode === 'add') {
        const newTagArr = content.match(/(#\w+)/g);
        this.props.autoTagCreate(newTagArr.map(el => el.slice(1)));
      }
      if (document.querySelector(':focus') !== null && document.querySelector(':focus').id === 'noteText') {
        focusAtEnd(container);
      }
    }
  }

  render() {
    const { note, tags, editNote, saveData, deleteData, filter } = this.props;

    return (
      <div className="notes-viewer">
        <h1>{ this.state.title }</h1>
        <input type="text" value={ this.state.title } className="hidden" id="editNoteTitle"
         onChange={this.handleChange} name="title" />
        <button className="btn btn-red" onClick={() => deleteData('notes', note.id) }>Del</button>
        <button className="btn btn-orange" onClick={ editNote } id="editBtn">Edit</button>
        <button className="btn btn-green hidden" onClick={() => {this.highlightTags('add'); saveData('notes', note.id)} } id="saveBtn">Save</button>
        <p className="textArea" id="noteText" contentEditable={false} 
          onKeyUp={this.handleChange} name="text">{this.props.note.text}</p>
        <div id="noteTags">
          <TagCloud tags={tags} addNew={false} filter={filter} deleteData={deleteData} />
        </div>
      </div>
  )}
}