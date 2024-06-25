import React from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

const Map = ({ data }) => {
  return (
    <MapContainer
      center={
        data.length === 1
          ? [data[0].latitude, data[0].longitude]
          : [52.4797, -1.98269]
      }
      zoom={7}
      scrollWheelZoom={true}
      className="h-full min-w-full min-h-[200px] z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[52.4797, -1.98269]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {data && data.map((item) => <Pin key={item.id} item={item} />)}
    </MapContainer>
  );
};

export default Map;
