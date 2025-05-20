import React, { useMemo, useState } from 'react';
import { Map, Source, Layer, NavigationControl, Popup } from 'react-map-gl/mapbox';
import type { MapMouseEvent } from 'mapbox-gl';
import type { FillLayer, LineLayer } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './WorldMap.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.PRIVATE_MAPBOX_API_KEY || '';

const usInitiatives = [
  'Foreign aid',
  'Health programs',
  'Terrorism combat',
  'Education',
  'Military bases',
] as const;

const chinaInitiatives = [
  'Infrastructure',
  'Financial development',
  'Resource extraction',
  'Belt & Road projects',
  'Telecom investments',
] as const;

interface SelectedCountry {
  name: string;
  code: string;
  lng: number;
  lat: number;
}


const AfricaMap: React.FC = () => {
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
  const [popupInfo, setPopupInfo] = useState<{
    longitude: number;
    latitude: number;
    countryName: string;
    popupContent: string;
  } | null>(null);

  const onHover = (event: MapMouseEvent) => {
    const feature = event.features && event.features[0];
    if (feature) {
      event.target.getCanvas().style.cursor = 'pointer';
    } else {
      event.target.getCanvas().style.cursor = '';
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

  const layerStyle = {
    id: 'countries',
    type: 'fill' as const,
    paint: {
      'fill-color': [
        'case',
        ['has', 'color'],
        ['get', 'color'],
        '#3388ff'
      ] as any,
      'fill-opacity': 0.7,
      'fill-outline-color': '#fff'
    }
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
        <div style={{ width: '70%', height: '70vh' }}>
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
        <aside className="africa-map-sidebar right">
          <h2>China</h2>
          <ul>
            {chinaInitiatives.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </aside>
      </div>
      
    </div>
  );
};

export default AfricaMap; 