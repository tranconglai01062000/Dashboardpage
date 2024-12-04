import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Cần sử dụng để tạo custom icon
import "leaflet/dist/leaflet.css";
//const image = require.context("./image", false, /\.(png|jpe?g|gif)$/);

const createUserIcon = (imageUrl) => {
  return new L.Icon({
    iconUrl: imageUrl, // Đặt ảnh người dùng làm icon
    iconSize: [40, 40], // Kích thước của icon
    iconAnchor: [20, 40], // Đặt điểm neo của icon ở dưới cùng
  });
};

const MapComponent = ({ locations }) => {
  return (
    <MapContainer
      center={[20, 0]} // Trung tâm mặc định (có thể thay đổi)
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      {/* Sử dụng TileLayer để hiển thị bản đồ từ OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Lặp qua danh sách locations và tạo Marker cho mỗi vị trí */}
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]} // Vị trí của marker
          icon={createUserIcon(location.image)} // Sử dụng ảnh người dùng làm icon
        >
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p>Email: {location.email}</p>
              <p>Address: {location.address}</p>
              <img
                src={location.image} // Hiển thị hình ảnh trong Popup
                alt={location.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
