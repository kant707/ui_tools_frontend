import React from 'react';
import { Modal } from 'react-bootstrap';


function ModalBox(props) {
  return (
    <Modal {...props} size={props.size} aria-labelledby={props.ID} centered={props.centered}>      
      { props.title &&
        <Modal.Header closeButton>
          <Modal.Title id={props.ID}> {props.title} </Modal.Title>
        </Modal.Header>
      }
      
      { props.body &&
        <Modal.Body>       
          {props.body}        
        </Modal.Body>
      }

      { props.footer &&
        <Modal.Footer>
          {props.footer}
        </Modal.Footer>
      }
    </Modal>
  )
}

export default ModalBox;
