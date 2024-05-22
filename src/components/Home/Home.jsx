import styles from "./Home.module.css";

import React from "react";
import Navbar from "./Navbar";
import Splash from "./Splash";

const Home = () => {
  return (
    <>
      <div className={`${styles.layout}`}>
        <div className="px-3 lg:px-12">
          <Navbar />
        </div>
        <Splash />
      </div>
    </>
  );
};

export default Home;
