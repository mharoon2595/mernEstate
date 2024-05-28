import styles from "./Home.module.css";

import React from "react";
import Navbar from "./Navbar";
import Splash from "./Splash";

const Home = () => {
  return (
    <>
      <div className={`${styles.layout}`}>
        <Splash />
      </div>
    </>
  );
};

export default Home;
