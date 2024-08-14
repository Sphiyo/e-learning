"use client";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import BSModal from './components/BSModal';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <BSModal show={show} handleClose={handleClose}> bhefrv</BSModal>
      
    </>
  );
}

export default Example;