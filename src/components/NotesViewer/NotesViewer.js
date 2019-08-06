import React from 'react';
import Tag from '../Tag';
import { focusAtEnd } from '../../utils/domWorker';
import { collectTags } from '../../utils/prepareDataToSave';
import './NotesViewer.scss';

export default class NotesViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.note.title };
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
    this.setState({ title: nextProps.note.title });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const keyCodesForAdd = [8, 32];
    if (event.target.id === 'noteText' && keyCodesForAdd.includes(event.keyCode)) {
      this.highlightTags();
    }
  }

  highlightTags = () => {
    const container = document.getElementById('noteText');
    const content = container.innerText;
    const matches = content.match(/(#[^\s]+)/g).map(el => el.slice(1));
    if (matches !== null) {
      container.innerHTML = content.replace(/(#[^\s]+)/g, `<span class="hightlight">$1</span>`);
      const bindedTags = collectTags();
      if (!matches.every(el => bindedTags.includes(el))) {
        this.props.autoTagCreate(matches);
      }
      if (document.querySelector(':focus') !== null && document.querySelector(':focus').id === 'noteText') {
        focusAtEnd(container);
      }
    }
  }

  render() {
    const { note, tags, editNote, saveData, deleteData, filter } = this.props;

    const TagsElements = [];
    if (Object.keys(tags).length !== 0) {
      Object.keys(tags).forEach(id => {
        TagsElements.push(<Tag key={id} title={tags[id]} filter={() => filter(id)}
          deleteData={() => deleteData('tags', id)} />)
      });
    }

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
          {TagsElements}
        </div>
      </div>
  )}
}