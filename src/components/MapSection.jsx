import React, { useContext } from 'react';
import { PlansContext } from '../contexts/PlansContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue in React-Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

const hotspots = [
  { name: 'Lagos', coords: [6.5244, 3.3792] },
  { name: 'Abuja', coords: [9.0579, 7.4951] },
  { name: 'Port Harcourt', coords: [4.8156, 7.0498] },
  { name: 'Kano', coords: [12.0022, 8.5919] },
  { name: 'Enugu', coords: [6.5246, 7.5086] },
];

const MapSection = () => {
  const { content } = useContext(PlansContext);

  // Set zoom based on screen width
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  const zoomLevel = isMobile ? 5 : 6;

  if (content.length == 0) return <></>;
  return (
    <section className="map-section">
      {content.lenght==0?<></> : <div className="plan-title">{content[3]["content"]}</div>}
      <MapContainer center={[9.082, 8.6753]} zoom={zoomLevel} scrollWheelZoom={false} id="map">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotspots.map((hotspot, i) => (
          <Marker position={hotspot.coords} key={i}>
            <Popup>
              <b>{hotspot.name}</b><br />Chafinity Hotspot
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  )
};

export default MapSection;
