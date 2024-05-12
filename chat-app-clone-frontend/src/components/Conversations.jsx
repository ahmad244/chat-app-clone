import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { GetConversations, GetSelectedConversation } from "../api/conversation";
export default function Conversations({
  refreshConversatinos,
  selectedConversation,
  setSelectedConversation,
}) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const convoRes = await GetConversations();
      setConversations(convoRes.data);
    };

    fetchConversations();
  }, [refreshConversatinos]);

  const handleSelectConvo = async (conversation) => {
    const conversationRes = await GetSelectedConversation(conversation._id);
    console.log("conversationRes", conversationRes);
    setSelectedConversation(conversationRes.data);
  };
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          active={conversation._id === selectedConversation?._id}
          onClick={() => handleSelectConvo(conversation)}
        >
          {conversation.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
