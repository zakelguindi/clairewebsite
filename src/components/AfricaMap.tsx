import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './AfricaMap.css';
import { defaultMapSettings, CountryData } from '../data/mapData';

const usInitiatives = [
  'Foreign aid',
  'Health programs',
  'Terrorism combat',
  'Education',
  'Military bases',
];

const chinaInitiatives = [
  'Infrastructure',
  'Financial development',
  'Resource extraction',
  'Belt & Road projects',
  'Telecom investments',
];

// Reset view component
const ResetView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  const handleReset = () => {
    map.setView(center, zoom);
  };
  return null;
};

const AfricaMap: React.FC = () => {
  const mapRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const handleResetView = () => {
    if (mapRef.current) {
      const map = mapRef.current as L.Map;
      map.setView(
        defaultMapSettings.africaMap.defaultCenter as L.LatLngTuple,
        defaultMapSettings.africaMap.defaultZoom
      );
    }
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: (e: any) => {
        const countryData = feature.properties as CountryData;
        setSelectedCountry(countryData);
        layer.bindPopup(countryData.popupContent || 'No information available').openPopup();
      }
    });
  };

  const style = (feature: any) => {
    return {
      fillColor: feature.properties.color || '#3388ff',
      fillOpacity: 0.7,
      weight: 1,
      color: '#fff',
      opacity: 1
    };
  };

  return (
    <div className="africa-map-page">
      <header className="africa-map-header">
        <h1>US vs. China in Africa</h1>
      </header>
      <div className="africa-map-layout">
        <aside className="africa-map-sidebar left">
          <h2>US</h2>
          <ul>
            {usInitiatives.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </aside>
        <div className="africa-map-container">
          <MapContainer
            center={defaultMapSettings.africaMap.defaultCenter as [number, number]}
            zoom={defaultMapSettings.africaMap.defaultZoom}
            minZoom={defaultMapSettings.africaMap.minZoom}
            maxZoom={defaultMapSettings.africaMap.maxZoom}
            style={{ height: '500px', width: '100%' }}
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            <ResetView 
              center={defaultMapSettings.africaMap.defaultCenter as [number, number]}
              zoom={defaultMapSettings.africaMap.defaultZoom}
            />
            {/* GeoJSON layer will be added here when we have the data */}
          </MapContainer>
          <button className="reset-view-btn" onClick={handleResetView}>
            Reset View
          </button>
        </div>
        <aside className="africa-map-sidebar right">
          <h2>China</h2>
          <ul>
            {chinaInitiatives.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </aside>
      </div>
      {selectedCountry && (
        <div className="country-info">
          <h3>{selectedCountry.countryName}</h3>
          <p>{selectedCountry.popupContent}</p>
        </div>
      )}
    </div>
  );
};

export default AfricaMap; 