import React, { useContext, useEffect, useState } from "react";
import apiRequest from "../../../lib/apiRequest";
import { UserContext } from "../../utils/Context";
import swal from "sweetalert";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Data from "../List/Data";
import noavatar from "../../assets/noavatar.jpg";
import { useNavigate } from "react-router-dom";
import Backdrop from "../Home/Backdrop";
import MessageModal from "../ProfilePage/MessageModal";

const AgentProfileCard = ({
  userID,
  avatar,
  username,
  date,
  email,
  popUp,
  setPopUp,
}) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const addChat = async () => {
    if (!userId) {
      navigate("/signin");
      return;
    }
    try {
      const setUpChat = await apiRequest.post("/chats", {
        receiverId: userID,
      });

      setPopUp(true);
    } catch (err) {
      swal(
        "Uh oh!",
        "Something went wrong, please try again in a bit.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-[30%] w-full md:w-[50%] rounded-lg bg-yellow-500 p-2">
      <p className="text-center h-5 text-lg font-bold">Agent information</p>
      <div className="h-[calc(100%-20px)] flex justify-evenly p-5 gap-5 items-center">
        <img
          src={avatar || noavatar}
          className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full"
        />
        <div className="flex flex-col gap-2 max-h-full">
          <p className="font-bold">{username}</p>
          <p>Email: {email}</p>
          <p> Joined on (YYYY-MM-DD): {date.split("T")[0]}</p>
          <button
            className={`bg-black text-yellow-500 rounded-lg text-sm text-center  h-10 max-w-20 p-1 ${
              userID === userId && "hidden"
            } `}
            onClick={addChat}
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

const AgentProfilePage = () => {
  const [data, setData] = useState();
  const { loadProfile } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userData = await apiRequest("/user/" + loadProfile);
        setIsLoading(false);
        setData(userData.data.user);
      } catch (err) {
        swal(
          "Uh oh!",
          "Something went wrong, please try again in a bit.",
          "error"
        );
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {popUp && <Backdrop show={() => setPopUp(false)} />}
      {popUp && <MessageModal show={setPopUp} full />}
      <div className={`h-[calc(100vh-96px)]  p-3 ${!popUp && "relative"}`}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="h-full w-full flex flex-col items-center gap-5 p-3 lg:p-10">
          {data && (
            <AgentProfileCard
              userID={data.id}
              avatar={data.avatar}
              username={data.username}
              email={data.email}
              date={data.createdAt}
              popUp={popUp}
              setPopUp={setPopUp}
            />
          )}
          <p className="text-lg font-semibold">Properties listed:</p>
          <div className=" lg:min-h-[50%] lg:overflow-y-auto">
            {data && <Data data={data.posts} fromAgentProfile />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentProfilePage;
