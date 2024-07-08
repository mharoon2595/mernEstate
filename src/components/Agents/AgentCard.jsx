import React, { useContext } from "react";
import noavatar from "../../assets/noavatar.jpg";
import { UserContext } from "../../utils/Context";
import { useNavigate } from "react-router-dom";

const AgentCard = ({ avatar, username, posts, id }) => {
  const { setLoadProfile } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-evenly items-center w-[70%] md:w-1/3 lg:w-1/4 mx-auto md:mx-2 my-2 h-20 bg-yellow-500 rounded-lg p-3 cursor-pointer"
      onClick={() => {
        setLoadProfile(id);
        navigate("/agentProfile");
      }}
    >
      <img src={avatar || noavatar} className="w-12 h-12  rounded-full" />
      <div className="max-w-1/2 flex flex-col items-end  ">
        <p>{username}</p>
        <p>Posts: {posts.length}</p>
      </div>
    </div>
  );
};

export default AgentCard;
