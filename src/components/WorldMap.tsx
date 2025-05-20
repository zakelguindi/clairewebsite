import React, { useMemo, useState } from 'react';
import { Map, Source, Layer, NavigationControl, Popup } from 'react-map-gl/mapbox';
import type { MapMouseEvent } from 'mapbox-gl';
import type { FillLayer, LineLayer } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './WorldMap.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

interface SelectedCountry {
  name: string;
  code: string;
  lng: number;
  lat: number;
}

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | null>(null);
  const [highlighted, setHighlighted] = useState<string[]>([]);

  const handleClick = (e: MapMouseEvent) => {
    if (!e.features || e.features.length === 0) return;
    
    const countryFeature = e.features[0];
    if (countryFeature?.properties) {
      const name = countryFeature.properties.name_en;
      const code = countryFeature.properties.iso_3166_1_alpha_3;

      setSelectedCountry({
        name,
        code,
        lng: e.lngLat.lng,
        lat: e.lngLat.lat
      });

      if (!highlighted.includes(code)) {
        console.log('highlighted', highlighted);
        setHighlighted([...highlighted, code]);
      }
    }
  };

  const highlightFilter = highlighted.length > 0
  ? ['in', 'iso_3166_1_alpha_3', ...highlighted]
  : ['in', 'iso_3166_1_alpha_3', '']; // fallback to harmless filter

  const highlightLayer: FillLayer = useMemo(() => ({
    id: 'highlight-layer',
    type: 'fill',
    source: 'country-boundaries',
    'source-layer': 'country_boundaries',
    paint: {
      'fill-color': '#00bcd4',
      'fill-opacity': 0.5
    },
    filter: highlightFilter
  }), [highlighted]);


  const borderLayer: LineLayer = useMemo(() => ({
    id: 'border-layer',
    type: 'line',
    source: 'country-boundaries',
    'source-layer': 'country_boundaries',
    paint: {
      'line-color': '#333',
      'line-width': 1
    }
  }), []);

  return (
    <div style={{ width: '90%', height: '90vh' }}>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{ longitude: 0, latitude: 20, zoom: 1.5 }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        interactiveLayerIds={['highlight-layer', 'border-layer']}
        onClick={handleClick}
        doubleClickZoom={false}
      >
        <NavigationControl position="top-right" />

        <Source
          id="country-boundaries"
          type="vector"
          url="mapbox://mapbox.country-boundaries-v1"
        >
          <Layer {...highlightLayer} />
          <Layer {...borderLayer} />
        </Source>

        {selectedCountry && (
          <Popup
            longitude={selectedCountry.lng}
            latitude={selectedCountry.lat}
            onClose={() => setSelectedCountry(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{selectedCountry.name}</h3>
              <textarea 
                placeholder="Enter description..." 
                style={{ 
                  width: '100%', 
                  minHeight: '60px',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }} 
              />
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

// const WorldMap = () => {
//   return (
//     <div>
//       <h1>World Map</h1>
//     </div>
//   );
// };

export default WorldMap; 