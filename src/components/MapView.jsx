import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../css/home.css"
import L from 'leaflet';

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const AutoZoom = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 12);
    }
  }, [userLocation, map]);
  return null;
};

export default function MapChart({lat,lon}) {
  const [userLocation, setUserLocation] = useState([lat,lon]);

  const handleMarkerDrag = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setUserLocation([lat, lng]);
  };
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation([lat, lng]);
  };

  const handleUpdateLocation = (e) => {
    e.preventDefault();
    const newLocation = [parseFloat(lat), parseFloat(lon)];
    if (isValidCoordinate(newLocation)) {
      setUserLocation(newLocation);
    } else {
      alert("Invalid coordinates");
    }
  };
    
  const isValidCoordinate = (coords) => {
    const [lat, lon] = coords;
    return (
      isFinite(lat) && Math.abs(lat) <= 90 &&
      isFinite(lon) && Math.abs(lon) <= 180
    );
  };
  

  return [(
    <div style={{ height: "79", width: "100%" }}>
        <button className="ulbtn" type="submit" onClick={handleUpdateLocation}>Update Location</button>
    <div>
        {/* <strong>Latitude:</strong> {userLocation[0]}
        <br />
        <strong>Longitude:</strong> {userLocation[1]} */}
      </div>
      <MapContainer center={[lat,lon]} style={{ height: "70vh",margin: "20px auto", borderRadius:"20px" }} onClick={handleMapClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={userLocation} icon={userIcon} draggable={true} eventHandlers={{ dragend: handleMarkerDrag }}>
          <Popup>Drag me</Popup>
        </Marker>
        <AutoZoom userLocation={userLocation} />
      </MapContainer>
    </div>
  )];
}

