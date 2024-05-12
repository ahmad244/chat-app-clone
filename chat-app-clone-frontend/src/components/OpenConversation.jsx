import React, { useState, useRef, useEffect, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { SendChat, GetChats } from "../api/chat";
import { useSocket } from "../contexts/SocketProvider";

export default function OpenConversation({
  selectedConversation,
  setSelectedConversation,
}) {
  const user = useSelector((state) => state.user.currentUser);
  const socket = useSocket();

  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);

  function addChat(chat) {
    setChats((prevChatVal) => [...prevChatVal, chat]);
  }

  const getMessageFromSocket = useCallback(({ chat }) => {
    console.log("getMessageFromSocket", chat);
    if (selectedConversation._id === chat.conversation) {
      addChat(chat);
    }
  }, []);

  useEffect(() => {
    async function getChats() {
      const response = await GetChats(selectedConversation._id);
      setChats(response.data);
    }
    getChats();
  }, [selectedConversation._id]);

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", getMessageFromSocket);
    return () => socket.off("receive-message");
  }, [socket, addChat]);

  // const { sendMessage, selectedConversation } = useConversations();
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await SendChat(selectedConversation._id, text);
    if (response.success) {
      const chat = response.data.content;

      addChat(chat);
      socket.emit("send-message", { chat });
      setText("");
    } else {
      alert("somehting went wrong");
    }
    setText("");
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className=" d-flex flex-column align-items-start justify-content-end px-3">
          {chats?.map((chat, index) => {
            const lastMassage = chats?.length - 1 === index;
            const fromMe = chat.sender._id === user._id;
            return (
              <div
                ref={lastMassage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    fromMe ? "bg-primary text-white" : "border"
                  } `}
                >
                  {chat.message}
                </div>
                <div
                  className={`text-muted small ${
                    fromMe ? "align-self-end" : ""
                  }`}
                >
                  {fromMe ? "You" : chat.sender.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
