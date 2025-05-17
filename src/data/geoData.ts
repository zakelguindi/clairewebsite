import { FeatureCollection } from 'geojson';
import { CountryData } from './mapData';

// World map GeoJSON data
export const worldGeoData: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        countryCode: 'US',
        countryName: 'United States',
        highlighted: true,
        popupContent: 'Major policy changes announced today that will affect global markets.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          // Simplified coordinates for US
          [[-125, 49], [-66, 49], [-66, 25], [-125, 25], [-125, 49]]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        countryCode: 'CN',
        countryName: 'China',
        highlighted: true,
        popupContent: 'New trade agreements signed between major economic powers.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          // Simplified coordinates for China
          [[73, 53], [135, 53], [135, 18], [73, 18], [73, 53]]
        ]
      }
    }
  ]
};

// Africa map GeoJSON data
export const africaGeoData: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        countryCode: 'EG',
        countryName: 'Egypt',
        highlighted: true,
        popupContent: 'Major infrastructure projects underway.',
        color: '#3388ff'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          // Simplified coordinates for Egypt
          [[25, 32], [37, 32], [37, 22], [25, 22], [25, 32]]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        countryCode: 'ZA',
        countryName: 'South Africa',
        highlighted: true,
        popupContent: 'Economic growth and development initiatives.',
        color: '#3388ff'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          // Simplified coordinates for South Africa
          [[16, -22], [33, -22], [33, -35], [16, -35], [16, -22]]
        ]
      }
    }
  ]
}; 