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
    setSocket(io("https://mernestatesocket.adaptable.app/"));
  }, [userId]);

  useEffect(() => {
    userId && socket?.emit("newUser", userId);
    console.log("workin bruv");
  }, [userId, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
