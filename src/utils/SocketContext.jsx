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
  const { userId } = useContext(UserContext);

  useEffect(() => {
    setSocket(io("https://mernestate-hak6.onrender.com"));
  }, []);

  useEffect(() => {
    userId && socket?.emit("newUser", userId);
  }, [userId, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
