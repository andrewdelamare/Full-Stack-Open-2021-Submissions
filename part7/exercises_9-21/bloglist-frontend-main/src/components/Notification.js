/* eslint-disable react/prop-types */
import React from 'react';

const successStyles = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '18px',
  borderStyle: 'solid',
  borderRadius: '7px',
  padding: '8px',
  marginBottom: '8px',
};
const failureStyles = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '18px',
  borderStyle: 'solid',
  borderRadius: '7px',
  padding: '8px',
  marginBottom: '8px',
};

function Notification({ message, type }) {
  if (message === null) {
    return null;
  } if (type === true) {
    return (
      <div className="success" id="success" style={successStyles}>
        {message}
      </div>
    );
  } if (type === false) {
    return (
      <div className="failure" id="failure" style={failureStyles}>
        {message}
      </div>
    );
  }
}
export default Notification;
