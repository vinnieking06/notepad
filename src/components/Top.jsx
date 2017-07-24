import React, { PropTypes } from 'react';

const Top = props => (
  <div className="TopContainer">
    <h3>NotePad</h3>
    <span>A place to write about your memories, passions and goals.</span>
    <button onClick={props.logOut}> Logout </button>
  </div>
);

Top.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default Top;
