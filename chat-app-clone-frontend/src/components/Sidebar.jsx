import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutRun } from "../redux/userRedux";
import { LogoutUser } from "../api/user";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({
  selectedConversation,
  setSelectedConversation,
}) {
  const dispatch = useDispatch();

  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const odalconversationIsOpen = activeKey === CONVERSATIONS_KEY;
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const [refreshContacts, setRefreshContacts] = useState(false);
  const [refreshConversatinos, setRefreshConversations] = useState(false);

  function refreshContactsFunc() {
    setRefreshContacts((prev) => !prev);
  }
  function refreshConversatinosFunc() {
    setRefreshConversations((prev) => !prev);
  }
  function closeModal() {
    setModalOpen(false);
  }

  const handleLogout = async () => {
    const response = await LogoutUser();
    if (response.success) {
      dispatch(logoutRun());
    }
  };

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Button className="rounded-0" onClick={handleLogout}>
          Loggout
        </Button>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              refreshConversatinos={refreshConversatinos}
            />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts user={user} refreshContacts={refreshContacts} />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          <span className="text-muted">{user.name}</span>
        </div>
        <div className="p-2 border-top border-right small">
          Id: <span className="text-muted">{user._id}</span>
        </div>
        <Button
          className="rounded-0"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          New {odalconversationIsOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {odalconversationIsOpen ? (
          <NewConversationModal
            closeModal={closeModal}
            refreshConversatinosFunc={refreshConversatinosFunc}
          />
        ) : (
          <NewContactModal
            closeModal={closeModal}
            refreshContactsFunc={refreshContactsFunc}
          />
        )}
      </Modal>
    </div>
  );
}
