import React, { useState, useRef, useMemo } from 'react';
import './AdminPage.css';
import { Map, Source, Layer, NavigationControl, Popup } from 'react-map-gl/mapbox';
import type { MapMouseEvent } from 'mapbox-gl';
import type { FillLayer, LineLayer } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { defaultMapSettings } from '../data/mapData';
import AdminLogin from './AdminLogin';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('projects');
  const [formData, setFormData] = useState<FormData>({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{ lng: number; lat: number; name: string } | null>(null);
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>([]);
  const [isDragMode, setIsDragMode] = useState(true);

  // Move useMemo hooks to the top, before any conditional returns
  const highlightFilter = useMemo(() => 
    highlightedCountries.length > 0
      ? ['in', 'iso_3166_1_alpha_3', ...highlightedCountries]
      : ['in', 'iso_3166_1_alpha_3', ''], // fallback to harmless filter
    [highlightedCountries]
  );
  const fillLayer: FillLayer = useMemo(() => ({
    id: 'country-fills',
    type: 'fill',
    source: 'country-boundaries',
    'source-layer': 'country_boundaries',
    paint: {
      'fill-color': '#FFFFFF',
    }
  }), []);
    
  const highlightLayer: FillLayer = useMemo(() => ({
    id: 'highlight-layer',
    type: 'fill',
    source: 'country-boundaries',
    'source-layer': 'country_boundaries',
    paint: {
      'fill-color': formData.color || '#3388ff',
      'fill-opacity': 0.5
    },
    filter: highlightFilter
  }), [highlightFilter, formData.color]);

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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const handleMapClick = (e: MapMouseEvent) => {
    console.log('Map clicked:', e.lngLat);
    // console.log('Features:', e.features);
    
    console.log('Not in drag mode, processing click');
    console.log('e.features:', e.features);
    const features = e.features?.[0];
    console.log('Features:', features);

    // Always set the selected country coordinates
    setSelectedCountry({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      name: features?.properties?.name_en
    });
    // Initialize form data with default values
    const defaultFormData = {
      countryCode: features?.properties?.iso_3166_1_alpha_3 || '',
      countryName: features?.properties?.name_en || '',
      highlighted: false,
      popupContent: '',
      color: '#3388ff'
    };

    // If we have features and properties, update the form data
    if (e.features && e.features.length > 0 && e.features[0]?.properties) {
      const countryFeature = e.features[0];
      const properties = countryFeature.properties;
      const name = properties?.name_en || 'Unknown Location';
      const code = properties?.iso_3166_1_alpha_3 || '';
      
      console.log('Country details:', { name, code });

      setFormData({
        ...defaultFormData,
        countryName: name,
        highlighted: highlightedCountries.includes(code),
        popupContent: formData.popupContent || '',
        color: formData.color || '#3388ff'
      });
    } else {
      // If no features/properties found, use default values
      console.log('No country features found, using default values');
      setFormData(defaultFormData);
    }
    
    console.log('Updated state:', {
      selectedCountry: { lng: e.lngLat.lng, lat: e.lngLat.lat },
      formData: formData
    });
  };

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    setFormData({});
    setIsEditing(false);
    setSelectedCountry(null);
    setHighlightedCountries([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: newValue as FormData[keyof FormData]
      };

      // Update highlighted countries when highlight status changes
      if (name === 'highlighted' && prev.countryCode) {
        const countryCode = prev.countryCode as string;
        if (newValue) {
          setHighlightedCountries(current => [...current, countryCode]);
        } else {
          setHighlightedCountries(current => current.filter(code => code !== countryCode));
        }
      }

      return updated;
    });
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
      lng: 0,
      lat: 0,
      name: ''
    });
  };

  const handleDelete = (id: number) => {
    // TODO: Implement API integration
    console.log('Delete item:', { contentType, id });
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Popup form submitted:', formData);
    
    // Update highlighted countries if needed
    if (formData.countryCode) {
      if (formData.highlighted) {
        setHighlightedCountries(current => 
          current.includes(formData.countryCode as string) 
            ? current 
            : [...current, formData.countryCode as string]
        );
      } else {
        setHighlightedCountries(current => 
          current.filter(code => code !== formData.countryCode)
        );
      }
    }
    
    // TODO: Save the data to your backend/storage
    // For now, just close the popup
    setSelectedCountry(null);
    setFormData({});
  };

  const renderMap = () => {
    if (contentType !== 'world-map' && contentType !== 'africa-map') {
      return null;
    }

    return (
      <div className="map-container">
        <div className="map-controls">
          <button 
            className={`mode-switch ${isDragMode ? 'active' : ''}`}
            onClick={() => setIsDragMode(!isDragMode)}
          >
            {isDragMode ? 'Switch to Select Mode' : 'Switch to Drag Mode'}
          </button>
        </div>
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: contentType === 'world-map' ? 0 : 20,
            latitude: contentType === 'world-map' ? 20 : 0,
            zoom: contentType === 'world-map' ? 1.5 : 3
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          interactiveLayerIds={['country-fills', 'highlight-layer']}
          onClick={handleMapClick}
          onMouseMove={(e) => {
            const features = e.features || [];
            const isHoveringCountry = features.length > 0;
            e.target.getCanvas().style.cursor = isDragMode 
              ? 'grab' 
              : (isHoveringCountry ? 'pointer' : 'default');
          }}
          onMouseDown={(e) => {
            if (isDragMode) {
              e.target.getCanvas().style.cursor = 'grabbing';
            }
          }}
          onMouseUp={(e) => {
            if (isDragMode) {
              e.target.getCanvas().style.cursor = 'grab';
            }
          }}
          doubleClickZoom={false}
          dragPan={isDragMode}
        >
          <NavigationControl position="top-right" />

          <Source
            id="country-boundaries"
            type="vector"
            url="mapbox://mapbox.country-boundaries-v1"
          >
            <Layer {...fillLayer} />
            <Layer {...highlightLayer} />
            <Layer {...borderLayer} />
          </Source>

          {selectedCountry && (
            <Popup
              longitude={selectedCountry.lng}
              latitude={selectedCountry.lat}
              onClose={() => {
                setSelectedCountry(null);
                setFormData({});
              }}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
              offset={25}
            >
              <form onSubmit={handlePopupSubmit} className="popup-form">
                <div className="popup-header">
                  <h3>{formData.countryName}</h3>
                  <p className="country-code">{formData.countryCode}</p>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="highlighted"
                      checked={formData.highlighted || false}
                      onChange={handleInputChange}
                    />
                    Highlight Country
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="popupContent">Description</label>
                  <textarea
                    id="popupContent"
                    name="popupContent"
                    value={formData.popupContent || ''}
                    onChange={handleInputChange}
                    placeholder="Enter country description..."
                    rows={4}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </Popup>
          )}
        </Map>
      </div>
    );
  };

  const renderForm = () => {
    if (contentType === 'world-map' || contentType === 'africa-map') {
      return (
        <form onSubmit={handleSubmit} className="admin-form">
          <h3>Country Data Management</h3>
          
          <div className="form-group">
            <label>Selected Country</label>
            <div className="selected-country">
              {formData.countryName ? (
                <>
                  <span className="country-name">{formData.countryName}</span>
                  <span className="country-code">{formData.countryCode}</span>
                </>
              ) : (
                'Click on a country on the map to select it'
              )}
            </div>
          </div>

          {formData.countryName && (
            <>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="highlighted"
                    name="highlighted"
                    checked={formData.highlighted || false}
                    onChange={handleInputChange}
                  />
                  Highlight Country
                </label>
                <p className="form-help-text">
                  When highlighted, the country will be shown in a different color on the map
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="popupContent">Country Description</label>
                <textarea
                  id="popupContent"
                  name="popupContent"
                  value={formData.popupContent || ''}
                  onChange={handleInputChange}
                  placeholder="Enter a description for this country..."
                  required
                  rows={4}
                />
                <p className="form-help-text">
                  This description will be shown when users hover over the country on the map
                </p>
              </div>

              {contentType === 'africa-map' && (
                <div className="form-group">
                  <label htmlFor="color">Highlight Color</label>
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color || '#3388ff'}
                    onChange={handleInputChange}
                  />
                  <p className="form-help-text">
                    Choose a color to highlight this country on the map
                  </p>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {isEditing ? 'Update Country Data' : 'Save Country Data'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setFormData({});
                    setIsEditing(false);
                    setSelectedCountry(null);
                  }}
                >
                  Clear Selection
                </button>
              </div>
            </>
          )}
        </form>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{isEditing ? 'Edit' : 'Create'} {contentType.charAt(0).toUpperCase() + contentType.slice(1, -1)}</h3>
        
        {contentType === 'projects' && (
          <>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="link">Project Link</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link || ''}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {contentType === 'blog' && (
          <>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content || ''}
                onChange={handleInputChange}
                required
                rows={10}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        {contentType === 'opinions' && (
          <>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content || ''}
                onChange={handleInputChange}
                required
                rows={10}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        {contentType === 'timeline' && (
          <>
            <div className="form-group">
              <label htmlFor="title">Event Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
              />
            </div>
          </>
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
          {renderMap()}
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 