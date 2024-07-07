import React from "react";
import { Popup, Marker } from "react-leaflet";
import { Link } from "react-router-dom";

const Pin = ({ item }) => {
  console.log(item);
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex  gap-5 min-w-[200px]">
          {item.images && (
            <img
              src={item.images[0]}
              className="w-[78px] h-[64px] object-cover rounded-md"
              alt=""
            />
          )}
          <div className="flex flex-col gap-1 justify-between">
            <Link to={`/${item.id}`}>{item.title}</Link>

            <div>{item.bedroom} bedrooms</div>
            <div>$ {item.price} </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
