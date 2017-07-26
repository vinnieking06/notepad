/* eslint class-methods-use-this: 0*/
/* eslint react/forbid-prop-types: 0 */
/* eslint arrow-body-style: 0 */
/* eslint-env browser */


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectNote, newNoteView, postNewNote, updateNote, deleteNote, init, itemsIsLoading, addToken, itemsHasErrored } from './../redux/actions';
import './../App.scss';
import List from './List';
import Note from './Note';
import Load from './Load';
import Top from './Top';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.newNote = this.newNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.newNoteView = this.newNoteView.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  async componentDidMount() {
    this.props.itemsIsLoading(true);
    await this.getAccessToken();
    this.initApi();
  }

  getAccessToken() {
    const localToken = localStorage.getItem('token');
    const match = RegExp('[#&]access_token=([^&]*)').exec(window.location.hash);
    if (localToken) {
      this.headersToStore(localToken);
    } else if (match) {
      const token = this.getParamFromHash('access_token');
      this.configureLocalStorage(token);
      this.headersToStore(token);
    } else {
      this.props.itemsHasErrored(true);
    }
  }

  getParamFromHash(param) {
    const match = RegExp(`[#&]${param}=([^&]*)`).exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  headersToStore(token) {
    const AuthStr = 'Bearer '.concat(token);
    this.props.addToken(AuthStr);
  }

  configureLocalStorage(token) {
    localStorage.setItem('token', token);
    const expiresAt = this.createExpiresAt();
    localStorage.setItem('expires_at', expiresAt);
  }

  createExpiresAt() {
    const date = this.getParamFromHash('expires_in');
    return JSON.stringify((date * 1000) + new Date().getTime());
  }

  initApi() {
    if (this.props.token) {
      this.props.init(this.props.token);
    }
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

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');

    this.props.history.push('/');
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
        <Top logOut={this.logOut} />
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
  history: PropTypes.any.isRequired,
  itemsHasErrored: PropTypes.func.isRequired,

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
    init: (url, token) => dispatch(init(url, token)),
    selectNote: noteId => dispatch(selectNote(noteId)),
    newNoteView: () => dispatch(newNoteView()),
    postNewNote: (url, data, token) => dispatch(postNewNote(url, data, token)),
    updateNote: (url, data, token, id) => dispatch(updateNote(url, data, token, id)),
    deleteNote: (url, token, id) => dispatch(deleteNote(url, token, id)),
    itemsIsLoading: bool => dispatch(itemsIsLoading(bool)),
    addToken: token => dispatch(addToken(token)),
    itemsHasErrored: bool => dispatch(itemsHasErrored(bool)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
