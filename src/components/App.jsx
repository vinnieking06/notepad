/* eslint class-methods-use-this: 0*/
/* eslint react/forbid-prop-types: 0 */
/* eslint arrow-body-style: 0 */
/* eslint-env browser */


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { itemsFetchData, selectNote, newNoteView, postNewNote, updateNote, deleteNote, init, itemsIsLoading, addToken, getId } from './../redux/actions';
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

  async componentDidMount() {
    this.props.itemsIsLoading(true);
    await this.getAccessToken();
    await this.initApi();
  }

  getAccessToken() {
    const match = RegExp('[#&]access_token=([^&]*)').exec(window.location.hash);
    const token = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    const AuthStr = 'Bearer '.concat(token);
    this.props.addToken(AuthStr);
  }

  getNotes() {
    this.props.fetchData(`${this.props.id}/notes`, {}, true);
  }

  initApi() {
    this.props.init(this.props.token);
  }

  newNote(input) {
    this.props.postNewNote(`${this.props.id}/notes`, {
      data: input.note,
      title: input.title,
    }, this.props.token);
  }

  updateNote(input) {
    this.props.updateNote(`${this.props.id}/notes/${input.id}`, {
      data: input.note,
      title: input.title,
    }, this.props.token, this.props.id);
  }

  selectNote(id) {
    const curr = this.findNote(this.props.items, id)[0];
    this.props.selectNote(curr);
  }

  findNote(notes, id) {
    return notes.filter(note => note.id === id);
  }

  newNoteView() {
    this.props.newNoteView();
  }

  deleteNote(id) {
    this.props.deleteNote(`${this.props.id}/notes/${id}`, this.props.token, this.props.id);
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
  init: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  newNoteView: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  postNewNote: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  current: PropTypes.any.isRequired,
  itemsIsLoading: PropTypes.func.isRequired,
  addToken: PropTypes.func.isRequired,
  token: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  getId: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    current: state.selectNote,
    token: state.token,
    id: state.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, current, initial) => dispatch(itemsFetchData(url, current, initial)),
    init: (url, token) => dispatch(init(url, token)),
    selectNote: noteId => dispatch(selectNote(noteId)),
    newNoteView: () => dispatch(newNoteView()),
    postNewNote: (url, data, token) => dispatch(postNewNote(url, data, token)),
    updateNote: (url, data, token, id) => dispatch(updateNote(url, data, token, id)),
    deleteNote: (url, token, id) => dispatch(deleteNote(url, token, id)),
    itemsIsLoading: bool => dispatch(itemsIsLoading(bool)),
    addToken: token => dispatch(addToken(token)),
    getId: (url, token) => dispatch(getId(url, token)),
  };
};


// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
