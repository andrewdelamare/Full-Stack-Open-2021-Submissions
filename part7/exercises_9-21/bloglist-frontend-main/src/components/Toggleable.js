/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Table, Form, Button } from 'react-bootstrap'

function Togglable({ id, buttonLabel, children }) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} type="button" id={id}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility} type="button">
          cancel
        </Button>
      </div>
    </div>
  );
}

export default Togglable;
