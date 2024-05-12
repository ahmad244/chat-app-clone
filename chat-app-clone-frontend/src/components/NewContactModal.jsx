import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { AddContact } from "../api/contact";

export default function NewContactModel({ closeModal, refreshContactsFunc }) {
  const idRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await AddContact(idRef.current.value);
    if (response.success) {
      console.log("Contact added successfully");
      alert(JSON.stringify(response.data.message));
      refreshContactsFunc();
      closeModal();
    } else {
      console.log("Failed to add contact");
      alert(JSON.stringify(response.data.message));
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton> Create Contact </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Contact Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit">Create</Button>
      </Modal.Footer>
    </Form>
  );
}
