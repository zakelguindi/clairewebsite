import React, { useState, useRef } from 'react';
import './AdminPage.css';
import { MapContainer, TileLayer, GeoJSON, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultMapSettings, CountryData } from '../data/mapData';
import { worldGeoData, africaGeoData } from '../data/geoData';

type ContentType = 'projects' | 'blog' | 'opinions' | 'timeline' | 'world-map' | 'africa-map';

interface FormData {
  id?: number;
  title?: string;
  name?: string;
  description?: string;
  content?: string;
  date?: string;
  author?: string;
  image?: string;
  location?: string;
  link?: string;
  countryCode?: string;
  countryName?: string;
  highlighted?: boolean;
  popupContent?: string;
  color?: string;
  [key: string]: string | number | boolean | undefined;
}

const AdminPage: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>('projects');
  const [formData, setFormData] = useState<FormData>({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const mapRef = useRef(null);

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    setFormData({});
    setIsEditing(false);
    setSelectedCountry(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue as FormData[keyof FormData]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API integration
    console.log('Form submitted:', { contentType, formData });
    setFormData({});
    setIsEditing(false);
    setSelectedCountry(null);
  };

  const handleEdit = (item: FormData) => {
    setFormData(item);
    setIsEditing(true);
    setSelectedCountry({
      countryCode: item.countryCode || '',
      countryName: item.countryName || '',
      highlighted: item.highlighted,
      popupContent: item.popupContent,
      color: item.color
    });
  };

  const handleDelete = (id: number) => {
    // TODO: Implement API integration
    console.log('Delete item:', { contentType, id });
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: (e: any) => {
        const countryData = feature.properties as CountryData;
        setSelectedCountry(countryData);
        setFormData({
          countryCode: countryData.countryCode,
          countryName: countryData.countryName,
          highlighted: countryData.highlighted,
          popupContent: countryData.popupContent,
          color: countryData.color
        });
        setIsEditing(true);
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

  const renderForm = () => {
    if (contentType !== 'world-map' && contentType !== 'africa-map') {
      return null;
    }

    return (
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{isEditing ? 'Edit' : 'Create'} Country Data</h3>
        <div className="form-group">
          <label>Country Name</label>
          <div className="selected-country">
            {formData.countryName || 'Select a country on the map'}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="highlighted">Highlighted</label>
          <input
            type="checkbox"
            id="highlighted"
            name="highlighted"
            checked={formData.highlighted || false}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="popupContent">Popup Content</label>
          <textarea
            id="popupContent"
            name="popupContent"
            value={formData.popupContent || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        {contentType === 'africa-map' && (
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color || '#3388ff'}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Update' : 'Create'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setFormData({});
                setIsEditing(false);
                setSelectedCountry(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      
      <div className="admin-content">
        <div className="admin-sidebar">
          <h2>Content Types</h2>
          <nav>
            <button
              className={contentType === 'projects' ? 'active' : ''}
              onClick={() => handleContentTypeChange('projects')}
            >
              Projects
            </button>
            <button
              className={contentType === 'blog' ? 'active' : ''}
              onClick={() => handleContentTypeChange('blog')}
            >
              Blog Posts
            </button>
            <button
              className={contentType === 'opinions' ? 'active' : ''}
              onClick={() => handleContentTypeChange('opinions')}
            >
              Opinions
            </button>
            <button
              className={contentType === 'timeline' ? 'active' : ''}
              onClick={() => handleContentTypeChange('timeline')}
            >
              Timeline Events
            </button>
            <button
              className={contentType === 'world-map' ? 'active' : ''}
              onClick={() => handleContentTypeChange('world-map')}
            >
              World Map
            </button>
            <button
              className={contentType === 'africa-map' ? 'active' : ''}
              onClick={() => handleContentTypeChange('africa-map')}
            >
              Africa Map
            </button>
          </nav>
        </div>

        <div className="admin-main">
          {(contentType === 'world-map' || contentType === 'africa-map') && (
            <div className="map-container">
              <MapContainer
                center={contentType === 'world-map' 
                  ? defaultMapSettings.worldMap.defaultCenter as [number, number]
                  : defaultMapSettings.africaMap.defaultCenter as [number, number]}
                zoom={contentType === 'world-map'
                  ? defaultMapSettings.worldMap.defaultZoom
                  : defaultMapSettings.africaMap.defaultZoom}
                minZoom={contentType === 'world-map'
                  ? defaultMapSettings.worldMap.minZoom
                  : defaultMapSettings.africaMap.minZoom}
                maxZoom={contentType === 'world-map'
                  ? defaultMapSettings.worldMap.maxZoom
                  : defaultMapSettings.africaMap.maxZoom}
                style={{ height: '500px', width: '100%' }}
                scrollWheelZoom={true}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <GeoJSON
                  data={contentType === 'world-map' ? worldGeoData : africaGeoData}
                  style={style}
                  onEachFeature={onEachFeature}
                />
              </MapContainer>
            </div>
          )}
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 