import { useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.css";
import arrow from "../../assets/arrow.png";
import { images } from "../../../lib/dummyData";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const refInterval = useRef();

  const resetInterval = () => {
    if (refInterval.current) {
      clearInterval(refInterval.current);
    }
    refInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(refInterval.current);
  }, []);

  const handleNext = () => {
    resetInterval();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    resetInterval();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carousel}>
      <button onClick={handlePrev} className={styles["left-button"]}>
        <img src={arrow} className="w-5 h-10" alt="Previous" />
      </button>
      <div className={`w-full h-full overflow-hidden`}>
        <div
          className={styles["carousel-inner"]}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles["carousel-item"]}>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-3 md:gap-5 h-full w-full lg:mx-5">
                <img
                  src={image.img}
                  className="hidden sm:block h-24 w-24 lg:h-40 lg:w-40 rounded-full  lg:my-auto flex-shrink-0"
                  alt=""
                />
                <div className="flex flex-col justify-center gap-3  mx-10 lg:mx-0 lg:p-1">
                  <p className="text-sm md:text-base lg:max-w-[90%]">
                    {'"' + image.msg + '"'}
                  </p>
                  <p className="text-sm md:text-base ">{image.des}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleNext} className={styles["right-button"]}>
        <img src={arrow} className="w-5 h-10 rotate-180" alt="Next" />
      </button>
    </div>
  );
};

export default Carousel;
