import React from "react";

const successStyles = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20
  }
const failureStyles = {
    color: 'red',
    fontStyle: 'bold',
    fontSize: 20
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