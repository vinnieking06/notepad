/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
/* eslint react/no-did-mount-set-state: 0 */

import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: '', title: '', id: '' };
    this.handleNote = this.handleNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note.id) {
      this.setState({ note: nextProps.note.data,
        title: nextProps.note.title,
        id: nextProps.note.id });
    } else {
      this.setState({ note: '', title: '', id: '' });
    }
  }

  handleSubmit() {
    const postData = this.state;
    this.props.newNote(postData);
  }

  handleUpdate() {
    const postData = this.state;
    this.props.updateNote(postData);
  }

  handleNote(event) {
    this.setState({ note: event.target.value });
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    if (this.props.note.id) {
      return (
        <div className="noteContainer">
          <input
            placeholder="title"
            maxLength="20"
            value={this.state.title}
            onChange={this.handleTitle}
          /> <br />
          <textarea className="notebook" value={this.state.note} onChange={this.handleNote} />
          <div>
            <button onClick={() => { this.handleUpdate(); }}> save </button>
            <button onClick={this.props.newNoteView}> new note </button>
            <button onClick={() => { this.props.deleteNote(this.state.id); }}> Delete </button>
          </div>
        </div>
      );
    }
    return (
      <div className="noteContainer" >
        <input
          placeholder="title"
          maxLength="20"
          value={this.state.title}
          onChange={this.handleTitle}
        /> <br />
        <textarea
          className="notebook"
          placeholder="Type note here"
          value={this.state.note}
          onChange={this.handleNote}
        />
        <button onClick={this.handleSubmit}> save </button>
      </div>
    );
  }
}
