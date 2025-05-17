import { FeatureCollection } from 'geojson';

export interface CountryData {
  countryCode: string;
  countryName: string;
  highlighted?: boolean;
  popupContent?: string;
  color?: string;
}

export interface MapSettings {
  minZoom: number;
  maxZoom: number;
  defaultCenter: [number, number];
  defaultZoom: number;
}

export const defaultMapSettings = {
  worldMap: {
    minZoom: 2,
    maxZoom: 8,
    defaultCenter: [20, 0],
    defaultZoom: 2
  },
  africaMap: {
    minZoom: 3,
    maxZoom: 7,
    defaultCenter: [-2, 20],
    defaultZoom: 3
  }
};

// Sample country data - you'll want to replace this with your actual data
export const sampleCountryData: CountryData[] = [
  {
    countryCode: 'US',
    countryName: 'United States',
    highlighted: true,
    popupContent: 'Major policy changes announced today that will affect global markets.'
  },
  {
    countryCode: 'CN',
    countryName: 'China',
    highlighted: true,
    popupContent: 'New trade agreements signed between major economic powers.'
  },
  // Add more countries as needed
]; 