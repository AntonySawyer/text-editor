import React from 'react';
import TagCloud from '../TagCloud';
import focusAtEnd from '../../utils/focusAtEnd';
import './NotesViewer.scss';

export default class NotesViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.note.title };
  }

  componentDidMount() {
    this.highlightTags();
  }

  componentDidUpdate() {
    this.highlightTags();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      title: nextProps.note.title });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.id === 'noteText') {
      this.highlightTags();
    }
  }

  highlightTags = () => {
    const container = document.getElementById('noteText');
    const content = container.innerText;
    if (content.indexOf('#') !== -1) {
      container.innerHTML = content.replace(/(#\w+)/g, `<span class="hightlight">$1</span>`);
      focusAtEnd(container);
    }
  }

  render() {
    const { tags, editNote, saveNote } = this.props;

    return (
      <div className="notes-viewer">
        <h1>{ this.state.title }</h1>
        <input type="text" value={ this.state.title } className="hidden" id="editNoteTitle"
         onChange={this.handleChange} name="title" />
        <button className="btn btn-red">Del</button>
        <button className="btn btn-orange" onClick={ editNote } id="editBtn">Edit</button>
        <button className="btn btn-green hidden" onClick={ saveNote } id="saveBtn">Save</button>
        <p className="textArea" id="noteText" contentEditable={false} 
          onInput={this.handleChange} name="text">{this.props.note.text}</p>
        <TagCloud tags={ tags } />
      </div>
  )}
}