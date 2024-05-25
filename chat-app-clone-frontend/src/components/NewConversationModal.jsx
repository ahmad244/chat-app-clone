import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GetContacts } from "../api/contact";
import { CreateConversation } from "../api/conversation";

export default function NewConversationModel({
  closeModal,
  refreshConversatinosFunc,
}) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await GetContacts();
      setContacts(Array.isArray(contacts.data) ? contacts.data : []);
      // console.log("useEffect is called", contacts.data);
    };

    fetchContacts();
  }, []);

  const [checkboxIds, setCheckboxIds] = useState([]);
  const [conversationName, setConversationName] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await CreateConversation(conversationName, checkboxIds);
    if (response.success) {
      refreshConversatinosFunc();
      closeModal();
    } else {
      alert("somehting went wrong");
    }
  }

  function handleCheckBoxChange(contactId) {
    setCheckboxIds((prevSe1ectedContactIds) => {
      if (prevSe1ectedContactIds.includes(contactId)) {
        return prevSe1ectedContactIds.filter((prevSe1ectedContactId) => {
          return contactId !== prevSe1ectedContactId;
        });
      } else {
        return [...prevSe1ectedContactIds, contactId];
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton> Create Conversation </Modal.Header>
      <Modal.Body>
        <Form.Group className="py-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
            placeholder="Enter conversation name"
          />
        </Form.Group>
        {contacts.map((contact) => (
          <Form.Group className="py-1" controlId={contact.id} key={contact._id}>
            <Form.Check
              type="checkbox"
              id={contact._id}
              value={contact._id}
              label={contact.name}
              onChange={() => {
                handleCheckBoxChange(contact._id);
              }}
            />
          </Form.Group>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit">Create</Button>
      </Modal.Footer>
    </Form>
  );
}
