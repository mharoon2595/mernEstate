import React, { useEffect, useState } from "react";

const Counter = ({ num, include, decimal }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let int;
    if (count < num && decimal) {
      int = setInterval(() => {
        setCount((prev) => prev + 0.1);
      }, 20);
    } else if (count < num && !decimal) {
      int = setInterval(
        () => {
          setCount((prev) => prev + 1);
        },
        include ? 1 : 5
      );
    }

    return () => clearInterval(int);
  }, [count]);

  return (
    <div className="w-fit">
      {include
        ? Math.floor(count * 10) / 10 + "+"
        : decimal
        ? Math.floor(count * 10) / 10 + "/5"
        : Math.floor(count * 10) / 10}
    </div>
  );
};

export default Counter;
