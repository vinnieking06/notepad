/* eslint react/prop-types: 0 */
import React from 'react';
import './Load.scss';

const List = (props) => {
  const notesList = [];
  if (props.notes.length) {
    props.notes.forEach((note) => {
      notesList.push(
      <div
        className="note"
        key={note.id}
        onClick={() => { props.selectNote(note.id); }}
      >
        <span>{note.title}</span>
        <button onClick={() => { props.deleteNote(note.id); }}> Delete </button>
      </div>);
    });
  }
  return (
    <div id="listContainer">
      <h3> All Notes</h3>
      {notesList}
    </div>
  );
};


export default List;

