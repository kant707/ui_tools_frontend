import React from 'react';
import { Alert, ToastContainer, Toast, } from 'react-bootstrap';


function MessageManager(props) {  
  // const [show, setShow] = useState(false);
  // const [position, setPosition] = useState('bottom-center');

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

      {/* <ToastContainer className="position-fixed" position={position}>
        <Toast
          show={show}
          delay={300000}
          autohide
          className="mb-3"
          onClose={() => setShow(false)}
          bg="success"
        >
          <Toast.Header>
          <div className="me-auto text-success">
            {iconSuccess} {TEMPLATE_ADDED_SUCCESS}
          </div>  
          
          </Toast.Header>
        </Toast>
      </ToastContainer> */}

    </>
  );
}

export default MessageManager;
