import React from "react";
import search from "../../assets/search.png";
import style from "./filter.module.css";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({});

  console.log(searchParams.get("city"));

  return (
    <div className="p-5 ">
      <label className="my-3 text-lg">Search results for</label>
      <form className="my-3 ">
        <div className="flex flex-col ">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="City Location"
            className="w-full p-2 border border-slate-400 rounded-md"
          />
        </div>
        <div className="flex justify-between flex-wrap sm:flex-nowrap  items-center my-3">
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
            >
              <option value="" defaultChecked>
                Any
              </option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="property">Type</label>
            <select
              id="property"
              name="property"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
            >
              <option value="" defaultChecked>
                Any
              </option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              name="minPrice"
              min={0}
              max={1000000}
              placeholder="any"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              min={0}
              max={1000000}
              placeholder="any"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bedroom">Bedroom</label>
            <input
              type="number"
              name="bedroom"
              min={0}
              max={5}
              placeholder="any"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
            />
          </div>
          <button className="h-full w-10 sm:w-20 p-3 m-1 bg-yellow-300 flex justify-center items-center rounded-md">
            <img src={search} alt="search" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
