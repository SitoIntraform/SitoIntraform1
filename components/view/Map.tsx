"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = () => {
  return (
    <MapContainer
      center={[44.880713557083546, 7.347154455996236]}
      zoom={17}
      scrollWheelZoom={true}
      className="h-[400px] w-full rounded-lg z-[10]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[44.880713557083546, 7.347154455996236]}>
        <Popup>
          Associazione Intraform <br />
          Via E. Bignone 85/12 <br/>
          Pinerolo, TO
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
