/* eslint react/prop-types: 0 */
import React from 'react';

const List = (props) => {
  const notesList = [];
  // configure lifecycle for below
  if (props.notes.length) {
    props.notes.forEach((note) => {
      notesList.push(<li key={note.id} >{note.title}
        <button onClick={() => { props.selectNote(note.id); }}> select </button>
        <button onClick={() => { props.deleteNote(note.id); }}> Delete </button>
      </li>);
    });
  }
  return (
    <div>
      {notesList}
    </div>
  );
};


export default List;

