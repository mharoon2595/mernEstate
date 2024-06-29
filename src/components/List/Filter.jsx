// import React, { useState } from "react";
// import search from "../../assets/search.png";
// import style from "./filter.module.css";
// import { Link, useSearchParams } from "react-router-dom";

// const Filter = ({ setIsLoading }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [query, setQuery] = useState({
//     type: searchParams.get("type") || "",
//     city: searchParams.get("city") || "",
//     property: searchParams.get("property") || "",
//     minPrice: searchParams.get("minPrice") || "",
//     maxPrice: searchParams.get("maxPrice") || "",
//     bedroom: searchParams.get("bedroom") || "",
//   });

//   const handleChange = (e) => {
//     setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <div className="p-5 ">
//       <label className="my-3 text-lg">
//         Search results for{" "}
//         {searchParams.get("city") ? searchParams.get("city") : "all properties"}
//       </label>
//       <form className="my-3 ">
//         <div className="flex flex-col ">
//           <label>Location</label>
//           <input
//             type="text"
//             name="city"
//             placeholder="City Location"
//             className="w-full p-2 border border-slate-400 rounded-md"
//             onChange={handleChange}
//             defaultValue={query.city}
//           />
//         </div>
//         <div className="flex justify-between flex-wrap sm:flex-nowrap  items-center my-3">
//           <div className="flex flex-col">
//             <label htmlFor="type" className="text-sm">
//               Type
//             </label>
//             <select
//               id="type"
//               name="type"
//               className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
//               onChange={handleChange}
//               defaultValue={query.type}
//             >
//               <option value="" defaultChecked>
//                 Any
//               </option>
//               <option value="buy">Buy</option>
//               <option value="rent">Rent</option>
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="property">Property</label>
//             <select
//               id="property"
//               name="property"
//               className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
//               onChange={handleChange}
//               defaultValue={query.property}
//             >
//               <option value="" defaultChecked>
//                 Any
//               </option>
//               <option value="apartment">Apartment</option>
//               <option value="house">House</option>
//               <option value="condo">Condo</option>
//               <option value="land">Land</option>
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="minPrice">Min Price</label>
//             <input
//               type="number"
//               name="minPrice"
//               min={0}
//               max={1000000}
//               placeholder="any"
//               className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
//               onChange={handleChange}
//               defaultValue={query.minPrice}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="maxPrice">Max Price</label>
//             <input
//               type="number"
//               name="maxPrice"
//               min={0}
//               max={1000000}
//               placeholder="any"
//               className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
//               onChange={handleChange}
//               defaultValue={query.maxPrice}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="bedroom">Bedroom</label>
//             <input
//               type="number"
//               name="bedroom"
//               min={0}
//               max={5}
//               placeholder="any"
//               className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
//               onChange={handleChange}
//               defaultValue={query.bedroom}
//             />
//           </div>
//           <Link
//             to={`/list?city=${query.city}&type=${query.type}&property=${query.property}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}`}
//             onClick={() => setIsLoading(true)}
//           >
//             <button className="h-full w-10 sm:w-20 p-3 m-1 bg-yellow-300 flex justify-center items-center rounded-md">
//               <img src={search} alt="search" />
//             </button>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Filter;

import React, { useState } from "react";
import search from "../../assets/search.png";
import { Link, useSearchParams } from "react-router-dom";

const Filter = ({ setIsLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-5">
      <label className="my-3 text-lg">
        Search results for{" "}
        {searchParams.get("city") ? searchParams.get("city") : "all properties"}
      </label>
      <form className="my-3">
        <div className="flex flex-col">
          <label>Location</label>
          <input
            type="text"
            name="city"
            placeholder="City Location"
            className="w-full p-2 border border-slate-400 rounded-md"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
        <div className="flex justify-between flex-wrap sm:flex-nowrap items-center my-3">
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
              onChange={handleChange}
              defaultValue={query.type}
            >
              <option value="" defaultChecked>
                Any
              </option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="property">Property</label>
            <select
              id="property"
              name="property"
              className="p-1 border text-sm md:text-md border-slate-400 rounded-md"
              onChange={handleChange}
              defaultValue={query.property}
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
              onChange={handleChange}
              defaultValue={query.minPrice}
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
              onChange={handleChange}
              defaultValue={query.maxPrice}
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
              onChange={handleChange}
              defaultValue={query.bedroom}
            />
          </div>
          <Link
            to={`/list?city=${query.city}&type=${query.type}&property=${query.property}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}`}
            onClick={() => setIsLoading(true)}
          >
            <button className="h-full w-10 sm:w-20 p-3 m-1 bg-yellow-300 flex justify-center items-center rounded-md">
              <img src={search} alt="search" />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Filter;
