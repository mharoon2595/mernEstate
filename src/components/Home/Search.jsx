import React, { useState } from "react";
import search from "../../assets/search.png";

const Search = () => {
  const [active, setActive] = useState("buy");
  return (
    <div>
      <div className="flex w-1/3">
        <div
          className={`${
            active === "buy"
              ? "p-2 bg-black w-1/2 border text-center text-lg border-black rounded-tl-lg border-b-0 border-r-0 text-white"
              : "p-2 border w-1/2 text-center rounded-tl-lg border-black border-b-0 border-r-0 text-lg"
          }`}
          onClick={() => setActive("buy")}
        >
          Buy
        </div>
        <div
          className={`${
            active === "rent"
              ? "p-2 bg-black w-1/2 border text-center text-lg border-black border-b-0 rounded-tr-lg text-white"
              : "p-2 border w-1/2 text-center rounded-tr-lg border-black border-b-0 text-lg"
          }`}
          onClick={() => setActive("rent")}
        >
          Rent
        </div>
      </div>
      <form className="flex  border border-black ">
        <input
          type="text"
          className="p-2 w-1/3"
          name="location"
          placeholder="City location"
        />
        <input
          type="number"
          className="p-2 w-1/3"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          className="p-2 w-1/3"
          name="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
        />
        <button className="bg-yellow-500 p-2">
          <img src={search} alt="search" />
        </button>
      </form>
    </div>
  );
};

export default Search;
