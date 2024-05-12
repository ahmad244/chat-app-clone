import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = React.createContext();
const BASE_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL;
console.log(
  "import.meta.env.VITE_REACT_APP_SOCKET_URL ==>",
  import.meta.env.VITE_REACT_APP_SOCKET_URL
);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const user = useSelector((state) => state.user.currentUser);
  const [socket, setSocket] = useState();

  console.log("user id in socket =>", user?._id);

  useEffect(() => {
    if (user) {
      const newSocket = io(BASE_URL, { query: { id: user?._id } });
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    }
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
