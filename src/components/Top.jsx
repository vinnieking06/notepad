import React, { PropTypes } from 'react';

const Top = props => (
  <div className="TopContainer">
    <button onClick={props.logOut}> Logout </button>
    <h3>NotePad</h3>
    <span>A place to write about your memories, passions and goals.</span>
  </div>
);

Top.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default Top;
