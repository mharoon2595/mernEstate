import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { UserContext } from "../../utils/Context";
import apiRequest from "../../../lib/apiRequest";
import saveImg from "../../assets/save.png";
import chat from "../../assets/chat.png";
import swal from "sweetalert";
import Backdrop from "../Home/Backdrop";
import MessageModal from "../ProfilePage/MessageModal";

const DeleteModal = ({ deleteHandler, show }) => {
  return (
    <div className="absolute flex top-0 left-0 h-full w-full justify-center items-center z-[10000]">
      <div className="bg-slate-400 w-[30%] h-[20%] rounded-md  p-2">
        <p className="mx-auto py-3 text-center text-white">Are you sure?</p>
        <div className="flex mx-auto justify-center gap-3 max-w-[50%]">
          <button
            className="bg-green-500 border border-black rounded-md p-1"
            onClick={() => {
              deleteHandler();
              show(false);
            }}
          >
            Yes
          </button>
          <button
            className="bg-red-500 border border-black rounded-md p-1"
            onClick={() => show(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const DataCard = ({
  data,
  profile,
  save,
  fromAgentProfile,
  change,
  showModal,
  setShowModal,
  userID,
  popUp,
  setPopUp,
}) => {
  let {
    id,
    title,
    images,
    bedroom,
    bathroom,
    price,
    address,
    latitude,
    longitude,
    savedPosts,
  } = data;

  if (!savedPosts) {
    savedPosts = [];
  }

  const { userId, setUpdatePost } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const editHandler = () => {
    setUpdatePost(id);
    navigate("/add");
  };

  const addChat = async () => {
    if (!userId) {
      navigate("/signin");
    }
    console.log(userID);
    try {
      const setUpChat = await apiRequest.post("/chats", {
        receiverId: userID,
      });

      setPopUp(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkIfSaved = () => {
      if (!userId) {
        return;
      } else {
        if (save) {
          setSaved(true);
        }
        savedPosts.map((item) => {
          if (item.userId === userId && item.postId === id) {
            setSaved(true);
            return;
          } else {
            if (saved === true) {
              setSaved(false);
            }
          }
        });
      }
    };
    checkIfSaved();
  }, [data]);

  const saveHandler = async () => {
    setIsLoading(true);
    if (!userId) {
      navigate("/signin");
    } else {
      try {
        const dispatch = await apiRequest.post("/user/save/" + id);
        if (dispatch.data.message === "Post removed from saved list") {
          setSaved(false);
          change((prev) => !prev);
          setIsLoading(false);
        } else if (dispatch.data.message === "Post saved") {
          setSaved(true);
          change((prev) => !prev);
        }
      } catch (err) {
        swal(
          "Oops!",
          "Something went wrong, please try again in a bit",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteHandler = async () => {
    try {
      const deletePost = await apiRequest.delete("/post/" + id);
    } catch (err) {
      swal("Uh oh!", "Something went wrong", "error");
    } finally {
      change((prev) => !prev);
    }
  };

  return (
    <>
      {showModal && <Backdrop />}
      {showModal && (
        <DeleteModal deleteHandler={deleteHandler} show={setShowModal} />
      )}
      {popUp && <Backdrop show={() => setPopUp(false)} />}
      {popUp && <MessageModal show={setPopUp} full />}
      <div
        className={`flex flex-col xxs:flex-row gap-5 w-full mb-10 ${
          showModal || popUp ? "static" : "relative"
        }`}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Link
          to={"/details/" + id}
          className="w-full xxs:w-1/2 sm:w-1/3 lg:w-1/2 h-40 object-fill rounded-lg"
        >
          <img src={images[0]} className="rounded-lg"></img>
        </Link>
        <div className="flex xxs:w-1/2 sm:w-2/3 lg:w-1/2 flex-col justify-between gap-2 px-2">
          <Link to={"/details/" + id}>
            <p className="text-teal-400 font-bold">{title}</p>
          </Link>
          <p>{address}</p>
          <p>{`$${price}`}</p>
          <div className="flex flex-col sm:flex-row  gap-2 justify-between  lg:gap-2">
            <div className="flex flex-col xs:flex-row gap-2 ">
              <p className="bg-slate-300 rounded-md p-1">
                {bedroom} {bedroom > 1 ? "bedrooms" : "bedroom"}
              </p>
              <p className="bg-slate-300 rounded-md p-1">
                {bathroom} {bathroom > 1 ? "bathrooms" : "bathroom"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`${
                  fromAgentProfile
                    ? "hidden"
                    : saved || save
                    ? "bg-yellow-500"
                    : "bg-gray-400 "
                } h-6 w-6 rounded-md p-1`}
                onClick={saveHandler}
              >
                <img src={saveImg} />{" "}
              </button>
              <button
                className={`${
                  fromAgentProfile || userID === userId
                    ? "hidden"
                    : "h-6 w-6 bg-gray-400 rounded-md p-1"
                }`}
                onClick={addChat}
              >
                <img src={chat} />
              </button>
            </div>
          </div>
          <div
            className={`${
              data.userId !== userId || userID === userId
                ? "hidden"
                : save
                ? "hidden"
                : "flex flex-col gap-2 lg:gap-0 lg:flex-row  justify-between"
            }`}
          >
            <button
              className="bg-blue-500 rounded-lg p-3"
              onClick={editHandler}
            >
              Edit post
            </button>
            <button
              className="bg-red-500 rounded-lg p-3"
              onClick={() => setShowModal(true)}
            >
              Delete post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Data = ({
  data,
  profile,
  save,
  isLoading,
  fromProfile,
  fromAgentProfile,
  change,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [popUp, setPopUp] = useState(false);

  return (
    <div
      className={`my-2 ${
        !fromProfile
          ? fromAgentProfile
            ? "h-fit"
            : "overflow-y-auto h-[calc(100vh-360px)]"
          : ""
      } px-5 ${!showModal && !popUp && "relative"}`}
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {data &&
        data.map((item) => (
          <DataCard
            key={item.id}
            data={item}
            profile={profile}
            save={save}
            fromAgentProfile={fromAgentProfile}
            change={change}
            showModal={showModal}
            setShowModal={setShowModal}
            userID={item?.userId}
            popUp={popUp}
            setPopUp={setPopUp}
          />
        ))}
      {data && data.length === 0 && !save && (
        <p>{profile ? "No properties posted yet." : "No properties found."}</p>
      )}
      {data && data.length === 0 && save && <p>{"No properties saved yet."}</p>}
    </div>
  );
};

export default Data;
