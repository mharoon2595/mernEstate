import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../utils/Context";
import apiRequest from "../../../lib/apiRequest";
import noavatar from "../../assets/noavatar.jpg";
import LoadingSpinner from "../../utils/LoadingSpinner";
import swal from "sweetalert";
import { SocketContext } from "../../utils/SocketContext";
import ChatWindow from "./ChatWindow";
import { useNotificationsStore } from "../../../lib/notificationsStore";

const Messages = ({ fromModal, full, inputFocus, setInputFocus }) => {
  const { username, existingAvatar, userId, setRunSocket } =
    useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [data, setData] = useState([]);
  const [chatID, setChatID] = useState();
  const [chatIDList, setChatIdList] = useState([]);
  const [last, setLast] = useState();
  const [chattingWith, setChattingWith] = useState();
  const [recipientID, setRecipientID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [avatar, setAvatar] = useState();
  const [trigger, setTrigger] = useState(false);
  const messageEndRef = useRef();
  const fetch = useNotificationsStore((state) => state.fetch);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const decrease = useNotificationsStore((state) => state.decrease);
  const number = useNotificationsStore((state) => state.number);

  useEffect(() => {
    setRunSocket(true);
    setIsLoading(true);
    const fetchChats = async () => {
      try {
        const response = await apiRequest("/chats/");
        setData(response.data);

        if (!popUp && chatID) {
          setChatID("");
        }
      } catch (err) {
        swal(
          "Uh oh!",
          "Something went wrong, please try again in a bit",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();

    socket.on("getMessage", () => {
      fetchChats();
    });

    return () => setRunSocket(false);
  }, [socket, chat, trigger]);

  useEffect(() => {
    if (data.length > 0) {
      const idList = data.map((x) => x.id);
      setChatIdList(idList);
    }
  }, [data]);

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chatID);
      } catch (err) {
        swal("Oopsie doopsie!", "Something went wrong!", "error");
      }
    };

    const handleGetMessage = (socketData) => {
      if (chatIDList.includes(socketData.chatId)) {
        setTrigger((prev) => !prev);

        if (chatID !== socketData.chatId || !chatID) {
          fetch();
        }

        if (chat && chat?.messages.length > 0 && chatID === socketData.chatId) {
          setChat((prev) => ({
            ...prev,
            messages: [...prev.messages, socketData],
          }));
        }

        if (popUp) {
          read();
        }
      }
    };

    if (socket) {
      socket.on("getMessage", handleGetMessage);

      return () => {
        socket.off("getMessage", handleGetMessage);
      };
    }
  }, [socket, chatID, chatIDList, chat]);

  const handleClick = async (id, receiver) => {
    setIsLoading(true);

    try {
      const response = await apiRequest("/chats/" + id);
      if (!response.data.seenBy.includes(userId) && number > 0) {
        decrease();
      }
      setChat({ ...response.data, receiver });
      setIsLoading(false);
    } catch (err) {
      swal(
        "Oops.",
        "Failed to load chats, please try again in a bit.",
        "error"
      );
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${
        fromModal ? "h-full" : "h-[80vh]"
      } w-full  p-2 relative flex justify-center overflow-y-auto`}
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {popUp && (
        <ChatWindow
          setPopUp={setPopUp}
          id={chatID}
          userId={userId}
          setLast={setLast}
          chat={chat}
          setChat={setChat}
          chattingWith={chattingWith}
          recipientID={recipientID}
          username={username}
          ref={messageEndRef}
          socket={socket}
          isLoading={isLoading}
          full={full}
          avatar={avatar}
          inputFocus={inputFocus}
          setInputFocus={setInputFocus}
        />
      )}
      <div className="flex flex-col items-center w-full h-[90%] overflow-y-auto">
        {data.length > 0 &&
          data.map((x) => {
            return (
              <div
                className={`${
                  x.seenBy.includes(userId) || chatID === x.id
                    ? "bg-zinc-50"
                    : "bg-yellow-500"
                } h-20 rounded-lg my-2 p-3 flex  justify-evenly gap-1 items-center w-full lg:w-[70%]  cursor-pointer`}
                onClick={() => {
                  setPopUp(true);
                  setChatID(x.id);
                  setChattingWith(x.receiver.username);
                  setRecipientID(x.receiver.id);
                  setLast(x.lastMessage);
                  handleClick(x.id, x.receiver);
                  setAvatar(x.receiver.avatar || noavatar);
                }}
                key={x.id}
              >
                <div>
                  <img
                    src={x.receiver.avatar || noavatar}
                    className="h-12 w-12 rounded-full"
                    alt="avatar"
                  />
                </div>
                <div className="w-1/2 text-left h-full">
                  <p className="font-bold h-1/2">{x.receiver.username}</p>
                  <p className="h-1/2 overflow-y-hidden">{x.lastMessage}</p>
                </div>
              </div>
            );
          })}
      </div>
      {data.length === 0 && <p className="text-center">No chats yet.</p>}
    </div>
  );
};

export default Messages;
