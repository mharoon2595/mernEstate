import React, { useState } from "react";
import hamburger from "../../assets/menuIcon.png";
import logo from "../../assets/estateLogo.png";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

const Navbar = () => {
  const [modalActive, setModalActive] = useState(false);
  const user = true;
  return (
    <>
      {modalActive && <Backdrop onClick={() => setModalActive(false)} />}
      {modalActive && (
        <Modal active={modalActive} onClick={() => setModalActive(false)} />
      )}
      <div className="flex  justify-between items-center">
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
          {user ? (
            <button className="relative p-2 flex gap-2 bg-yellow-500 rounded-lg items-center">
              <div className="absolute -top-3 -right-2 bg-red-500 w-5 h-5 text-xs text-white font-semibold flex justify-center items-center rounded-full">
                8
              </div>
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                className="h-10 w-10 rounded-full"
              />
              <p>John Doe</p>
              <button className="rotate-90">{">"}</button>
            </button>
          ) : (
            <button className="p-2 bg-yellow-500 rounded-lg">
              Login / Signup
            </button>
          )}
        </div>
        {user ? (
          <div className="hidden sm:flex items-center gap-2 md:gap-5">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="h-12 w-12 md:h-14 md:w-14 rounded-full"
            />
            <p className="font-bold text-md">John Doe</p>
            <button className="p-3 relative bg-yellow-500 rounded-lg text-md font-semibold">
              <div className="absolute -top-3 -right-2 bg-red-500 w-5 h-5 text-xs text-white font-semibold flex justify-center items-center rounded-full">
                8
              </div>
              Profile
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex gap-2 md:gap-5 md:border md:border-black rounded-lg p-2">
            <button className="p-2 hover:scale-110">Sign up</button>
            <div className="p-2 text-lg">|</div>
            <button className="p-2 bg-yellow-500 rounded-lg">
              <div className="hover:scale-105">Sign in</div>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
