import React from "react";

const successStyles = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '18px',
    borderStyle: 'solid',
    borderRadius: '7px',
    padding: '8px',
    marginBottom: '8px'
  }
const failureStyles = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '18px',
    borderStyle: 'solid',
    borderRadius: '7px',
    padding: '8px',
    marginBottom: '8px'
  }

export const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }else if(type === true){
        return (
            <div className='success' style={successStyles} >
              {message}
            </div>
          )
    }else if(type === false){
        return (
            <div className='failure' style={failureStyles}>
                {message}
            </div>
        )
    }
  }