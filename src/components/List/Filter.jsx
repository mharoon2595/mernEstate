import React from "react";
import search from "../../assets/search.png";
import style from "./filter.module.css";

const Filter = () => {
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
              <option value="type1" defaultChecked>
                Type 1
              </option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="property">Type</label>
            <select
              id="property"
              name="property"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
            >
              <option value="property1" defaultChecked>
                Type 1
              </option>
              <option value="property2">Type 2</option>
              <option value="property3">Type 3</option>
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
