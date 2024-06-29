import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/Context";
import apiRequest from "../../../lib/apiRequest";
import noavatar from "../../assets/noavatar.jpg";
import { format } from "timeago.js";

const ChatWindow = ({ setPopUp, id, userId, setLast }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const data = await apiRequest("/chats/" + id);
      console.log(data);
      setMessages(data.data.messages);
    };
    fetchChats();
  }, []);

  const submitMsg = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const text = formData.get("text");
    console.log(text);

    const sendMessage = await apiRequest.post("/messages/" + id, { text });
    console.log(sendMessage);
    setMessages((prevMsgs) => [...prevMsgs, sendMessage.data]);
    setLast(sendMessage.data.text);
    e.target.reset();
  };

  return (
    <div className="absolute bottom-0 w-full mx-auto h-[70%] bg-white">
      <div
        onClick={() => setPopUp(false)}
        className="bg-indigo-300 h-[15%] flex justify-between p-3 items-center"
      >
        <p>John Doe</p>
        <p className="font-bold">X</p>
      </div>
      <div className="h-[65%] overflow-y-scroll">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`${
                msg.userId === userId
                  ? "text-right flex flex-col items-end"
                  : "text-left flex flex-col items-start"
              } p-1 mx-2`}
            >
              {msg.text}
              <span className="text-sm bg-orange-200 ">
                {format(msg.createdAt)}
              </span>
            </div>
          ))}
      </div>
      <form className="h-[20%]  p-2 flex " onSubmit={submitMsg}>
        <input
          className="w-[90%] p-2 border-2 border-black rounded-tl-lg rounded-bl-lg"
          type="text"
          name="text"
        />
        <button
          className="bg-yellow-500 p-2 border-2 border-black border-l-0 rounded-tr-lg rounded-br-lg"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const Messages = () => {
  const { username, existingAvatar, userId } = useContext(UserContext);
  const [popUp, setPopUp] = useState(false);
  const [data, setData] = useState(false);
  const [chatID, setChatID] = useState();
  const [last, setLast] = useState();

  useEffect(() => {
    const fetchChats = async () => {
      const data = await apiRequest("/chats/");
      console.log(data);
      setData(data.data);
    };
    fetchChats();
  }, [last]);

  return (
    <div className="h-[80vh] w-full p-2 relative flex justify-center overflow-y-auto">
      {popUp && (
        <ChatWindow
          setPopUp={setPopUp}
          id={chatID}
          userId={userId}
          setLast={setLast}
        />
      )}
      {data &&
        data.map((x) => (
          <div
            className="bg-zinc-50 h-20 rounded-lg my-2 p-3 flex justify-between gap-3  items-center w-[80%] "
            onClick={() => {
              setPopUp(true);
              setChatID(x.id);
            }}
            key={x.id}
          >
            <img
              src={x.receiver.avatar || noavatar}
              className="h-12 w-12 rounded-full"
            />
            <p className="font-bold">{x.receiver.username}</p>
            <p>{x.lastMessage}</p>
          </div>
        ))}
    </div>
  );
};

export default Messages;
