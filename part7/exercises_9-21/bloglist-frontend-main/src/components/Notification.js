import {connect} from 'react-redux';

const Notification = (props) => {
  const note= props.notification.note;
  const type = props.notification.type

  const successStyles = {
    color: "green",
    background: "lightgrey",
    fontSize: "18px",
    borderStyle: "solid",
    borderRadius: "7px",
    padding: "8px",
    marginBottom: "8px",
  };
  const failureStyles = {
    color: "red",
    background: "lightgrey",
    fontSize: "18px",
    borderStyle: "solid",
    borderRadius: "7px",
    padding: "8px",
    marginBottom: "8px",
  };
  const neutralStyles= {
    color: "yellow",
    background: "lightgrey",
    fontSize: "18px",
    borderStyle: "solid",
    borderRadius: "7px",
    padding: "8px",
    marginBottom: "8px",
  }

  if(type === true){
    return (
      <div style={successStyles}>
        {note}
      </div>
    );
  }else if (type === false){
    return (
      <div style={failureStyles}>
        {note}
      </div>
    );
  }else if (type === null){ 
  return (
    <div>
      {note}
    </div>
  );}else{
    return (
      <div>
      {note}
    </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
