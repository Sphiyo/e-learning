"use client";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function BSModal(props: any){
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            {props.btnTitle}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}