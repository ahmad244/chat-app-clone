import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";

export default function () {
  // const { selectedConversation } = useConversations();
  const [selectedConversation, setSelectedConversation] = useState(null);
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />
      {selectedConversation && (
        <OpenConversation
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      )}
    </div>
  );
}
