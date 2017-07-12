/* eslint class-methods-use-this: 0*/
/* eslint react/forbid-prop-types: 0 */
/* eslint arrow-body-style: 0 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, selectNote, newNoteView, postNewNote, updateNote, deleteNote } from './../redux/actions';
import './../App.scss';
import List from './List';
import Note from './Note';
import Load from './Load';
import Top from './Top';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.newNote = this.newNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.newNoteView = this.newNoteView.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentWillMount() {
    this.getNotes();
  }

  getNotes() {
    this.props.fetchData('/notes');
  }

  newNote(input) {
    this.props.postNewNote('http://localhost:3001/notes', {
      data: input.note,
      title: input.title,
    });
  }

  updateNote(input) {
    this.props.updateNote(`http://localhost:3001/notes/${input.id}`, {
      data: input.note,
      title: input.title,
    });
  }

  selectNote(id) {
    const curr = this.findNote(this.props.items, id)[0];
    this.props.selectNote(curr);
  }
// move this into actions?
  findNote(notes, id) {
    return notes.filter(note => note.id === id);
  }

  newNoteView() {
    this.props.newNoteView();
  }

  deleteNote(id) {
    this.props.deleteNote(`http://localhost:3001/notes/${id}`);
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <Load />;
    }
    return (
      <div id="app">
        <Top />
        <div id="list-note">
          <List
            deleteNote={this.deleteNote}
            selectNote={this.selectNote}
            notes={this.props.items}
          />
          <Note
            updateNote={this.updateNote}
            newNoteView={this.newNoteView}
            newNote={this.newNote}
            deleteNote={this.deleteNote}
            note={this.props.current}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchData: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  newNoteView: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  postNewNote: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  current: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    current: state.selectNote,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
    selectNote: noteId => dispatch(selectNote(noteId)),
    newNoteView: () => dispatch(newNoteView()),
    postNewNote: (url, data) => dispatch(postNewNote(url, data)),
    updateNote: (url, data) => dispatch(updateNote(url, data)),
    deleteNote: url => dispatch(deleteNote(url)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

