import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './WorldMap.css';
import { defaultMapSettings, CountryData } from '../data/mapData';

// Reset view component
const ResetView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  const handleReset = () => {
    map.setView(center, zoom);
  };
  return null;
};

const WorldMap: React.FC = () => {
  const mapRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const handleResetView = () => {
    if (mapRef.current) {
      const map = mapRef.current as L.Map;
      map.setView(
        defaultMapSettings.worldMap.defaultCenter as L.LatLngTuple,
        defaultMapSettings.worldMap.defaultZoom
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
      fillColor: feature.properties.highlighted ? '#ff0000' : '#3388ff',
      fillOpacity: 0.7,
      weight: 1,
      color: '#fff',
      opacity: 1
    };
  };

  return (
    <div className="world-map-container">
      <h2>Interactive World Map</h2>
      <div className="map-wrapper">
        <MapContainer
          center={defaultMapSettings.worldMap.defaultCenter as [number, number]}
          zoom={defaultMapSettings.worldMap.defaultZoom}
          minZoom={defaultMapSettings.worldMap.minZoom}
          maxZoom={defaultMapSettings.worldMap.maxZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          <ResetView 
            center={defaultMapSettings.worldMap.defaultCenter as [number, number]}
            zoom={defaultMapSettings.worldMap.defaultZoom}
          />
          {/* GeoJSON layer will be added here when we have the data */}
        </MapContainer>
      </div>
      <div className="map-controls">
        <button className="map-control" onClick={handleResetView}>
          Reset View
        </button>
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

export default WorldMap; 