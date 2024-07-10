import { format } from "timeago.js";
import { forwardRef } from "react";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../utils/LoadingSpinner";
import apiRequest from "../../../lib/apiRequest";

const ChatWindow = forwardRef(
  (
    {
      setPopUp,
      id,
      userId,
      setLast,
      chat,
      setChat,
      socket,
      chattingWith,
      recipientID,
      isLoading,
      full,
      avatar,
      inputFocus,
      setInputFocus,
    },
    ref
  ) => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    };

    const submitMsg = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const text = formData.get("text");

      if (!text) return;
      try {
        const sendMessage = await apiRequest.post("/messages/" + id, { text });
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, sendMessage.data],
        }));
        setLast(sendMessage.data.text);
        e.target.reset();
        socket.emit("sendMessage", {
          receiverId: recipientID,
          data: sendMessage.data,
        });
      } catch (err) {
        swal(
          "Oops!",
          "Unable to send message right now, please try again later",
          "error"
        );
      }
    };

    const inputRef = useRef(null);
    const handleFocus = () => {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      scrollToBottom();
    };

    return (
      <div
        className={`absolute bottom-10 ${inputFocus ? "h-full" : " h-[70%]"} ${
          !full && "lg:bottom-0"
        } ${full && "md:bottom-12"} w-full mx-auto  bg-white rounded-lg`}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <div
          className={`bg-indigo-300 h-[15%] flex justify-between p-3 items-center rounded-t-lg `}
        >
          <div className="flex gap-2 items-center">
            <img src={avatar} className="w-10 h-10 rounded-full" />
            <p>{chattingWith}</p>
          </div>
          <p
            className="font-bold cursor-pointer"
            onClick={() => setPopUp(false)}
          >
            X
          </p>
        </div>
        <div className="h-[65%] overflow-y-scroll">
          {chat &&
            chat?.messages?.map((msg) => {
              return (
                <div
                  key={msg.id}
                  className={`${
                    msg.userId === userId
                      ? "text-right flex flex-col items-end"
                      : "text-left flex flex-col items-start"
                  } p-1 mx-2`}
                >
                  <div className="font-semibold">
                    {msg.userId === userId ? "You" : chattingWith}
                  </div>
                  <div>{msg.text}</div>
                  <span className="text-sm bg-orange-200 ">
                    {format(msg?.createdAt)}
                  </span>
                </div>
              );
            })}
          <div ref={ref}></div>
        </div>
        <form className="h-[20%]  p-2 flex " onSubmit={submitMsg}>
          <input
            className="w-[90%] p-2 border-2 border-black rounded-tl-lg rounded-bl-lg"
            type="text"
            name="text"
            ref={inputRef}
            onTouchStart={() => setInputFocus(true)}
            onFocus={handleFocus}
            onBlur={() => setInputFocus(false)}
          />
          <button
            className="bg-yellow-500 p-2 border-2 border-black border-l-0 rounded-tr-lg rounded-br-lg "
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    );
  }
);

export default ChatWindow;
