import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { io } from "socket.io-client";
import { UserContext } from "./Context";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userId, loggedIn } = useContext(UserContext);

  useEffect(() => {
    setSocket(
      io("https://current-dominica-devinthemaking-721da948.koyeb.app/")
    );
  }, [loggedIn]);

  useEffect(() => {
    userId && socket?.emit("newUser", userId);
    socket?.on("userConnected", () => {
      alert("User connected to socket server.");
    });
  }, [userId, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
