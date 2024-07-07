import React, { useEffect, useState } from "react";
import apiRequest from "../../../lib/apiRequest";
import swal from "sweetalert";
import LoadingSpinner from "../../utils/LoadingSpinner";
import AgentCard from "./AgentCard";

const Agents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fixedData, setFixedData] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetch = await apiRequest("/user/");
        console.log(fetch);
        setData(fetch.data);
        setFixedData(fetch.data);
        setIsLoading(false);
      } catch (err) {
        swal(
          "Oops",
          "Something went wrong, please try again in a bit",
          "error"
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const changeHandler = (e) => {
    if (e.target.value === "") {
      setData(fixedData);
    } else {
      let filteredData = data.filter((i) =>
        i.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filteredData);
      console.log(filteredData);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)]  p-2 mx-10 flex-wrap">
      {isLoading && <LoadingSpinner asOverlay />}
      <p className="text-3xl text-center my-3 font-bold">Our Agents</p>
      <div className="flex justify-center my-2">
        <input
          className=" border border-black p-1"
          type="text"
          placeholder="Search for agent"
          onChange={changeHandler}
        />
      </div>

      <div className="flex justify-evenly flex-wrap">
        {data &&
          data.map((i) => (
            <AgentCard
              key={i.id}
              id={i.id}
              avatar={i.avatar}
              username={i.username}
              posts={i.posts}
            />
          ))}
      </div>
    </div>
  );
};

export default Agents;
