import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./Context";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const newSocket = io(
      "https://current-dominica-devinthemaking-721da948.koyeb.app/"
    );
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (userId && socket) {
      socket.emit("newUser", userId);
      socket.on("userConnected", () => {
        alert("User connected to socket server.");
      });

      return () => {
        socket.off("userConnected");
      };
    }
  }, [userId, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
