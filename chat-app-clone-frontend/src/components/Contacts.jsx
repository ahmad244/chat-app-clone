import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { GetContacts } from "../api/contact";

export default function Contacts({ refreshContacts, user }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await GetContacts();
      setContacts(Array.isArray(contacts.data) ? contacts.data : []);
      // console.log("useEffect is called", contacts.data);
    };

    fetchContacts();
  }, [refreshContacts, user._id]);

  return (
    <ListGroup variant="flush">
      {Array.isArray(contacts) &&
        contacts.map((contact) => (
          <ListGroup.Item key={contact._id}>{contact.name}</ListGroup.Item>
        ))}
    </ListGroup>
  );
}
