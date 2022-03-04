/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function Togglable({ buttonLabel, children }) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} type="button">{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility} type="button">cancel</button>
      </div>
    </div>
  );
}

export default Togglable;
