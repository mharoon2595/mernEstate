import React, { useState } from "react";
import hamburger from "../../assets/menuIcon.png";
import logo from "../../assets/estateLogo.png";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

const Navbar = () => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      {modalActive && <Backdrop onClick={() => setModalActive(false)} />}
      {modalActive && <Modal onClick={() => setModalActive(false)} />}
      <div className="flex p-1 lg:p-3 justify-between items-center">
        <div className="flex gap-5 lg:gap-7 p-4 items-center">
          <img
            src={hamburger}
            className="md:hidden w-5 h-5 cursor-pointer my-auto"
            alt="site logo"
            onClick={() => setModalActive(true)}
          />
          <img src={logo} className="w-20 h-16 cursor-pointer" />
          <div className="hidden lg:flex font-bold hover:scale-110 cursor-pointer my-auto">
            MERNestate
          </div>
          <div className="hidden md:flex hover:scale-110 cursor-pointer">
            Home
          </div>
          <div className="hidden md:flex hover:scale-110 cursor-pointer">
            About
          </div>
          <div className="hidden md:flex hover:scale-110 cursor-pointer">
            Contact
          </div>
          <div className="hidden md:flex hover:scale-110 cursor-pointer">
            Agents
          </div>
        </div>
        <div className="sm:hidden p-2">
          <button className="p-2 bg-yellow-500 rounded-lg">
            Login / Signup
          </button>
        </div>
        <div className="hidden sm:flex gap-2 md:gap-5 md:border md:border-black rounded-lg p-2">
          <button className="p-2 hover:scale-110">Sign up</button>
          <div className="p-2 text-lg">|</div>
          <button className="p-2 bg-yellow-500 rounded-lg">
            <div className="hover:scale-105">Sign in</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
