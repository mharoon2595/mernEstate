import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin"; // Make sure to import the Pin component

const MapCenterUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
    if (zoom) {
      map.setZoom(zoom);
    }
  }, [center, zoom]);

  return null;
};

const Map = ({ data, contact }) => {
  const center =
    data.length > 0 ? [data[0].latitude, data[0].longitude] : [0, 0];
  const zoom = data.length > 0 ? 10 : 1;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className={`${
        contact ? "h-full min-w-full z-0" : "h-full min-w-full z-0"
      }`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenterUpdater center={center} zoom={zoom} />
      {data.length > 0 &&
        data.map((item) => (
          <Pin key={item.id || item.latitude} item={item} contact={contact} />
        ))}
    </MapContainer>
  );
};

export default Map;
