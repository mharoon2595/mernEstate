import React, { useContext } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../utils/Context";

const Modal = ({ active, onClick }) => {
  const { modalHeight, setModalHeight } = useContext(UserContext);
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      setModalHeight(true);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      setModalHeight(false);
    };
  }, [active, modalHeight]);

  return (
    <div className="absolute bg-black top-[40%] left-[50%] z-[1000] -translate-x-1/2 -translate-y-1/2  h-[250px] w-[50vw] flex justify-center items-center rounded-lg">
      <div
        className="absolute top-0 right-0 p-3 text-white font-bold cursor-pointer"
        onClick={onClick}
      >
        X
      </div>
      <div className="flex flex-col p-3 gap-5 text-yellow-400">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "animate-pulse" : ""
          }
          onClick={onClick}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "animate-pulse" : ""
          }
          onClick={onClick}
        >
          {" "}
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "animate-pulse" : ""
          }
          onClick={onClick}
        >
          Contact
        </NavLink>
        <NavLink
          to="/agents"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "animate-pulse" : ""
          }
          onClick={onClick}
        >
          Agents
        </NavLink>
      </div>
    </div>
  );
};

export default Modal;
