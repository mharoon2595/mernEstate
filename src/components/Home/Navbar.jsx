import React, { useContext, useEffect, useState } from "react";
import hamburger from "../../assets/menuIcon.png";
import logo from "../../assets/estateLogo.png";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import { UserContext } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiRequest from "../../../lib/apiRequest";
import swal from "sweetalert";
import noavatar from "../../assets/noavatar.jpg";
import { NavLink } from "react-router-dom";
import { useNotificationsStore } from "../../../lib/notificationsStore";
import { SocketContext } from "../../utils/SocketContext";

const Navbar = () => {
  const [modalActive, setModalActive] = useState(false);
  const loggedin = useContext(UserContext);
  const {
    loggedIn,
    username,
    setSignIn,
    setLoggedIn,
    setUpdateFlag,
    profilePic,
    existingAvatar,
    setExistingAvatar,
    setUserId,
    setEmail,
    userId,
  } = loggedin;
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const fetch = useNotificationsStore((state) => state.fetch);

  const number = useNotificationsStore((state) => state.number);

  useEffect(() => {
    if (userId) {
      fetch();
    }
  }, [userId]);

  if (userId) {
    socket.on("getMessage", (socketData) => {
      fetch();
    });
  }

  const logoutHandler = async () => {
    setShowDropdown(false);
    try {
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      setLoggedIn(false);
      setEmail("");
      setUserId("");
      setExistingAvatar("");
      navigate("/");
    } catch (err) {
      swal("Oops", "Something went wrong, please try again in a bit!", "error");
    }
  };

  return (
    <>
      {modalActive && <Backdrop onClick={() => setModalActive(false)} />}
      {modalActive && (
        <Modal active={modalActive} onClick={() => setModalActive(false)} />
      )}
      <div className="flex  justify-between items-center h-[96px]">
        <div className="flex gap-5 lg:gap-7 p-4 items-center">
          <img
            src={hamburger}
            className="md:hidden w-5 h-5 cursor-pointer my-auto"
            alt="site logo"
            onClick={() => setModalActive(true)}
          />
          <img src={logo} className="w-20 h-16 cursor-pointer" />
          <div
            className="hidden lg:flex font-bold hover:scale-110 cursor-pointer my-auto"
            onClick={() => navigate("/")}
          >
            MERNestate
          </div>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " hidden md:flex bg-yellow-500 p-1 rounded-md"
                : "hidden md:flex hover:scale-110 cursor-pointer bg-none"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "hidden md:flex bg-yellow-500 p-1 rounded-md"
                : "hidden md:flex hover:scale-110 cursor-pointer bg-none"
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " hidden md:flex bg-yellow-500 p-1 rounded-md"
                : "hidden md:flex hover:scale-110 cursor-pointer bg-none"
            }
            to="/contact"
          >
            Contact
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "hidden md:flex bg-yellow-500 p-1 rounded-md"
                : "hidden md:flex hover:scale-110 cursor-pointer bg-none"
            }
            to="/agents"
          >
            Agents
          </NavLink>
        </div>

        <div className="sm:hidden p-2">
          {loggedIn ? (
            <button
              className="relative p-2 flex gap-2 bg-yellow-500 rounded-lg items-center cursor-pointer"
              onClick={() => setShowDropdown(true)}
              onBlur={() => setShowDropdown(false)}
            >
              <div className="absolute -top-3 -right-2 bg-red-500 w-5 h-5 text-xs text-white font-semibold flex justify-center items-center rounded-full">
                {number}
              </div>
              <img
                src={existingAvatar || noavatar}
                className="h-10 w-10 rounded-full"
              />
              {username}
              <div className="rotate-90">{">"}</div>
              {showDropdown && (
                <div className="absolute -bottom-[70px] w-full left-0 z-50 px-2 rounded-md bg-teal-200">
                  <p
                    onClick={() => {
                      setShowDropdown(false);
                      setUpdateFlag(false);
                      navigate("/profile");
                    }}
                    className="my-2 hover:scale-110"
                  >
                    Profile
                  </p>
                  <p onClick={logoutHandler} className="my-2 hover:scale-110">
                    Logout
                  </p>
                </div>
              )}
            </button>
          ) : (
            <div
              className="p-2 bg-yellow-500 rounded-lg cursor-pointer"
              onClick={() => navigate("signin")}
            >
              Login / Signup
            </div>
          )}
        </div>
        {loggedIn ? (
          <div className="hidden sm:flex items-center gap-2 md:gap-5">
            <img
              src={existingAvatar || noavatar}
              className="h-12 w-12 md:h-14 md:w-14 rounded-full"
            />
            <p className="font-bold text-md">{username}</p>
            <button
              className="p-3 relative bg-yellow-500 flex gap-2 rounded-lg text-md font-semibold"
              onClick={() => setShowDropdown(true)}
              onBlur={() => setShowDropdown(false)}
            >
              <div
                className={`${
                  number === 0
                    ? "hidden"
                    : "absolute -top-3 -right-2 bg-red-500 w-5 h-5 text-xs text-white font-semibold flex justify-center items-center rounded-full"
                }`}
              >
                {number}
              </div>
              Settings <div className="rotate-90">{">"}</div>
              {showDropdown && (
                <div className="absolute -bottom-[70px] w-full left-0 z-50 px-2 rounded-md bg-teal-200">
                  <p
                    onClick={() => {
                      setShowDropdown(false);
                      setUpdateFlag(false);
                      navigate("/profile");
                    }}
                    className="my-2 hover:scale-110"
                  >
                    Profile
                  </p>
                  <p onClick={logoutHandler} className="my-2 hover:scale-110">
                    Logout
                  </p>
                </div>
              )}
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex gap-2 md:gap-5 md:border md:border-black rounded-lg p-2">
            <button
              className="p-2 hover:scale-110"
              onClick={() => {
                navigate("/signin");
                setSignIn(false);
              }}
            >
              Sign up
            </button>
            <div className="p-2 text-lg">|</div>
            <button
              className="p-2 bg-yellow-500 rounded-lg hover:scale-105"
              onClick={() => {
                navigate("/signin");
                setSignIn(true);
              }}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
