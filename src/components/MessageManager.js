import React from 'react';
import { Alert } from 'react-bootstrap';


function MessageManager(props) {  
  return (
    <>
      {props.show && <Alert className={`message-manager ${props.class}`} variant={props.variant} onClose={props.closeFuction} dismissible>
        {props.heading && <Alert.Heading>{props.heading}</Alert.Heading>}
        <div className="mm-pera">      
          <i className="mm-icon">{props.icon}</i>
          <span className="mm-text">{props.text}</span> 
        </div>     
      </Alert>
      }
    </>
  );
}

export default MessageManager;
