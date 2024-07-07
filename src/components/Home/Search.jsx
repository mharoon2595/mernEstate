import React, { useState } from "react";
import search from "../../assets/search.png";
import { Link } from "react-router-dom";

const Search = () => {
  const [active, setActive] = useState("buy");
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div className="flex w-1/3">
        <div
          className={`${
            active === "buy"
              ? "p-2 bg-black w-1/2 border text-center text-sm md:text-lg border-black rounded-tl-lg border-b-0 border-r-0 text-white cursor-pointer"
              : "p-2 border w-1/2 text-center rounded-tl-lg border-black border-b-0 border-r-0 text-sm md:text-lg cursor-pointer"
          }`}
          onClick={() => {
            setActive("buy");
            setQuery((prev) => ({ ...prev, type: "buy" }));
          }}
        >
          Buy
        </div>
        <div
          className={`${
            active === "rent"
              ? "p-2 bg-black flex justify-center w-1/2 border text-center text-sm md:text-lg border-black border-b-0 rounded-tr-lg text-white cursor-pointer"
              : "p-2 border w-1/2 flex justify-center text-center rounded-tr-lg border-black border-b-0 text-sm md:text-lg cursor-pointer"
          }`}
          onClick={() => {
            setActive("rent");
            setQuery((prev) => ({ ...prev, type: "rent" }));
          }}
        >
          Rent
        </div>
      </div>
      <form className="flex border border-black ">
        <input
          type="text"
          className="p-2 w-1/3 text-sm sm:text-base"
          name="city"
          placeholder="City location "
          onChange={handleChange}
        />
        <input
          type="number"
          className="p-2 w-1/3 text-sm sm:text-base"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          className="p-2 w-1/3 text-sm sm:text-base"
          name="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button className="bg-yellow-500 p-2" type="submit">
            <img src={search} alt="search" />
          </button>
        </Link>
      </form>
      <div className="py-2">{`( Leaving all fields blank will return all places that can be ${
        active === "buy" ? "bought" : "rented"
      }. )`}</div>
    </div>
  );
};

export default Search;
