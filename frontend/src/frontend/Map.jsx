import React, { createContext } from 'react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, useMap, GeoJSON, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback, useRef } from "react";
import geoData from "./Data/geoData.json";

// Create context for sharing map data between components
const MapContext = createContext({});

function Description() {
  return (
    <section className="pt-4">
      <div className="flex flex-col text-center px-4">
        <p className="mt-6=4 text-lg font-light leading-7">
          Interactive map of Neighborhoods and Cities in the King County area. Use the layer options in the top right to toggle between views.
        </p>
      </div>
    </section>
  );
}

// Color function for chloropleth map based on rate values
function getChloroplethColor(rate) {
  return rate > 200 ? '#800026' :
         rate > 180 ? '#BD0026' :
         rate > 160 ? '#E31A1C' :
         rate > 140 ? '#FC4E2A' :
         rate > 120 ? '#FD8D3C' :
         rate > 100 ? '#FEB24C' :
                     '#FED976';
}

// Add this function to format numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add this function to format percentages
function formatPercent(num) {
  return num.toFixed(1) + "%";
}

// Restore marker color function
function getMarkerColor(comparison) {
  return comparison === "higher"
    ? "#ff0000"  // Red for higher
    : comparison === "lower"
      ? "#00ff00"  // Green for lower
      : "#ffff00";  // Yellow for no difference
}

// Create a custom control for layer toggling
function LayerToggleControl({ currentLayer, setCurrentLayer }) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    // Create the custom control
    const customControl = L.control({ position: 'topright' });
    
    customControl.onAdd = function() {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      container.style.cssText = `
        background: white;
        padding: 12px;
        margin-top: 20px;
        margin-right: 20px;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        font-size: 14px;
        z-index: 1000;
        max-width: 180px;
      `;
      
      container.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px; text-align: center;">Layer Options</div>
        <div>
          <label style="display: block; margin-bottom: 8px;">
            <input type="radio" name="layer" value="none" ${currentLayer === 'none' ? 'checked' : ''}>
            <span style="margin-left: 5px;">No Layers</span>
          </label>
          <label style="display: block; margin-bottom: 8px;">
            <input type="radio" name="layer" value="choropleth" ${currentLayer === 'choropleth' ? 'checked' : ''}>
            <span style="margin-left: 5px;">Choropleth Map</span>
          </label>
          <label style="display: block;">
            <input type="radio" name="layer" value="markers" ${currentLayer === 'markers' ? 'checked' : ''}>
            <span style="margin-left: 5px;">Circle Markers</span>
          </label>
        </div>
      `;
      
      // Prevent map interactions behind the control
      L.DomEvent.disableClickPropagation(container);
      
      // Add event listeners to radio buttons
      const radioButtons = container.querySelectorAll('input[type="radio"]');
      radioButtons.forEach(radio => {
        radio.addEventListener('change', function(e) {
          setCurrentLayer(e.target.value);
        });
      });
      
      return container;
    };
    
    customControl.addTo(map);
    
    return () => {
      map.removeControl(customControl);
    };
  }, [map, currentLayer, setCurrentLayer]);
  
  return null;
}

// Restore the legend control
function LegendControl({ currentLayer }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.style.cssText = `
        background: white;
        padding: 12px 15px;
        margin-bottom: 60px;
        margin-right: 20px;
        border-radius: 6px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        font-size: 14px;
        font-family: Inter, sans-serif;
        max-width: 180px;
        z-index: 1000;
      `;
      
      // Create different legends based on active layer
      const chloroplethLegend = `
        <h4 style="font-size: 16px; font-weight: bold; margin-bottom: 10px; text-align: center;">Rate per 100,000</h4>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #800026; display: inline-block; margin-right: 10px;"></span>
          <strong>200+</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #BD0026; display: inline-block; margin-right: 10px;"></span>
          <strong>180-200</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #E31A1C; display: inline-block; margin-right: 10px;"></span>
          <strong>160-180</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #FC4E2A; display: inline-block; margin-right: 10px;"></span>
          <strong>140-160</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #FD8D3C; display: inline-block; margin-right: 10px;"></span>
          <strong>120-140</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #FEB24C; display: inline-block; margin-right: 10px;"></span>
          <strong>100-120</strong>
        </div>`;
      
      const markerLegend = `
        <h4 style="font-size: 16px; font-weight: bold; margin-bottom: 10px; text-align: center;">Comparison to Average</h4>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #ff0000; display: inline-block; margin-right: 10px; border-radius: 50%;"></span>
          <strong>Higher Rate</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #00ff00; display: inline-block; margin-right: 10px; border-radius: 50%;"></span>
          <strong>Lower Rate</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="width: 18px; height: 18px; background: #ffff00; display: inline-block; margin-right: 10px; border-radius: 50%;"></span>
          <strong>No Difference</strong>
        </div>`;

      div.innerHTML = currentLayer === 'markers' ? markerLegend : 
                     currentLayer === 'choropleth' ? chloroplethLegend : '';
      return div;
    };
    legend.addTo(map);
    return () => {
      map.removeControl(legend);
    };
  }, [map, currentLayer]);
  return null;
}

function MapComponent() {
  const [breastCancerData, setBreastCancerData] = useState([]);
  const [geoDataWithComparison, setGeoDataWithComparison] = useState(null);
  const [demographicData, setDemographicData] = useState({
    race: [],
    insurance: [],
    income: []
  });
  const [currentLayer, setCurrentLayer] = useState('choropleth');
  
  // Map reference for direct rendering
  const mapRef = useRef(null);

  // Update the apiBaseUrl to use window.API_BASE_URL
  const apiBaseUrl = window.API_BASE_URL || import.meta.env.VITE_API_URL || 'https://health4all-backend-13a9.onrender.com';
  
  // Add this for debugging
  useEffect(() => {
    console.log("API Base URL:", apiBaseUrl);
    console.log("VITE_API_URL env var:", import.meta.env.VITE_API_URL);
    console.log("window.API_BASE_URL:", window.API_BASE_URL);
  }, []);

  // Fetch breast cancer data
  useEffect(() => {
    console.log("Fetching from:", `${apiBaseUrl}/api/heatmap`);
    fetch(`${apiBaseUrl}/api/heatmap`)
      .then((res) => {
        console.log("Heatmap response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Received heatmap data:", data);
        console.log("Heatmap data type:", typeof data);
        console.log("Heatmap data structure:", data ? Object.keys(data) : "null or undefined");
        console.log("Heatmap array length:", data?.heatmap?.length);
        setBreastCancerData(data.heatmap || []);
      })
      .catch((err) => {
        console.error("Error fetching heatmap data:", err);
      });
  }, [apiBaseUrl]);

  // Fetch demographic data
  useEffect(() => {
    // Fetch race data
    fetch(`${apiBaseUrl}/api/demographics/population-race`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Received race data:", data);
        setDemographicData(prev => ({ ...prev, race: data }));
      })
      .catch((err) => {
        console.error("Error fetching race data:", err);
      });

    // Fetch health insurance data
    fetch(`${apiBaseUrl}/api/demographics/health-insurance`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Received insurance data:", data);
        setDemographicData(prev => ({ ...prev, insurance: data }));
      })
      .catch((err) => {
        console.error("Error fetching insurance data:", err);
      });

    // Fetch income data
    fetch(`${apiBaseUrl}/api/demographics/median-income`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Received income data:", data);
        setDemographicData(prev => ({ ...prev, income: data }));
      })
      .catch((err) => {
        console.error("Error fetching income data:", err);
      });
  }, [apiBaseUrl]);

  // Helper functions
  const getDemographicData = useCallback((regionName) => {
    const raceData = demographicData.race.find(d => d.hra_name === regionName);
    const insuranceData = demographicData.insurance.find(d => d.hra_name === regionName);
    const incomeData = demographicData.income.find(d => d.hra_name === regionName);
    return { raceData, insuranceData, incomeData };
  }, [demographicData]);

  const createPopupContent = useCallback((name, cancerData, demographics) => {
    const { raceData, insuranceData, incomeData } = demographics;
    
    return `
      <div class="popup-content" style="max-width: 300px; font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 10px 0; color: #333;">${name}</h3>
        
        <div style="margin-bottom: 15px;">
          <strong>Breast Cancer Statistics:</strong>
          <div>Rate: ${cancerData.rate} per 100,000</div>
          <div>Cases: ${cancerData.cases}</div>
          <div>Comparison to average: ${cancerData.comparison}</div>
        </div>

        ${raceData ? `
          <div style="margin-bottom: 15px;">
            <strong>Demographics:</strong>
            <div>Total Population: ${formatNumber(raceData.total_pop)}</div>
            <div>White: ${formatPercent(raceData.white_pop_pct)}</div>
            <div>Asian: ${formatPercent(raceData.asian_pop_pct)}</div>
            <div>Black/African American: ${formatPercent(raceData.black_african_american_pop_pct)}</div>
            <div>Hispanic/Latino: ${formatPercent(raceData.hispanic_latino_pop_pct)}</div>
          </div>
        ` : ''}

        ${insuranceData ? `
          <div style="margin-bottom: 15px;">
            <strong>Health Insurance:</strong>
            <div>Uninsured: ${formatPercent(insuranceData.percent_uninsured)}</div>
          </div>
        ` : ''}

        ${incomeData ? `
          <div style="margin-bottom: 15px;">
            <strong>Economic:</strong>
            <div>Median Income: $${formatNumber(Math.round(incomeData.median_income))}</div>
          </div>
        ` : ''}
      </div>
    `;
  }, [formatNumber, formatPercent]);

  useEffect(() => {
    if (!breastCancerData.length) {
      console.log("No breast cancer data available yet, skipping GeoJSON update");
      return;
    }

    console.log("Updating GeoJSON with breast cancer data:", breastCancerData.length, "items");
    console.log("Original geoData features:", geoData.features.length);

    const updatedGeoData = geoData.features.map((feature) => {
      const cancerData = breastCancerData.find(
        (data) => data.name === feature.properties.name
      );

      if (cancerData) {
        console.log("Found matching cancer data for:", feature.properties.name);
        return {
          ...feature,
          properties: {
            ...feature.properties,
            comparison: cancerData.comparison,
            rate: cancerData.rate,
            cases: cancerData.cases
          }
        };
      }
      return feature;
    });

    console.log('Updated GeoData:', updatedGeoData.length, "features"); 
    console.log('Sample feature:', updatedGeoData[0]);
    setGeoDataWithComparison(updatedGeoData);
  }, [breastCancerData]);

  // Update debug logging to no longer reference activeLayer
  useEffect(() => {
    console.log("GeoData with comparison:", geoDataWithComparison ? geoDataWithComparison.length : "not set");
  }, [geoDataWithComparison]);

  // Simplified GetMapRef component to just get the map reference
  const GetMapRef = () => {
    const map = useMap();
    
    // Set the map reference
    useEffect(() => {
      if (!map) return;
      console.log("Map reference obtained");
      mapRef.current = map;
    }, [map]);
    
    return null;
  };

  // Restore the geoJSONStyle function that was removed
  const geoJSONStyle = useCallback((feature) => {
    const cancerData = breastCancerData.find(
      (data) => data.name === feature.properties.name
    );
    return {
      fillColor: cancerData ? getChloroplethColor(cancerData.rate) : '#FED976',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    };
  }, [breastCancerData]);

  // Restore the onEachFeature function that was removed
  const onEachFeature = useCallback((feature, layer) => {
    const cancerData = breastCancerData.find(
      (data) => data.name === feature.properties.name
    );
    if (cancerData) {
      const demographics = getDemographicData(feature.properties.name);
      const popupContent = createPopupContent(feature.properties.name, cancerData, demographics);
      layer.bindPopup(popupContent);
    }
  }, [breastCancerData, getDemographicData, createPopupContent]);

  // Handle layer changes
  useEffect(() => {
    if (!mapRef.current || !breastCancerData.length || !geoDataWithComparison) {
      console.log("Cannot update layers yet - waiting for map and data");
      return;
    }
    
    console.log("Layer changed to:", currentLayer);
    
    // Remove existing layers
    if (window.currentGeoLayer) {
      mapRef.current.removeLayer(window.currentGeoLayer);
      window.currentGeoLayer = null;
    }
    
    if (window.currentMarkerLayer) {
      mapRef.current.removeLayer(window.currentMarkerLayer);
      window.currentMarkerLayer = null;
    }
    
    // Add the selected layer
    if (currentLayer === 'choropleth') {
      // Add choropleth layer
      window.currentGeoLayer = L.geoJSON({
        type: "FeatureCollection",
        features: geoDataWithComparison
      }, {
        style: geoJSONStyle,
        onEachFeature: onEachFeature
      }).addTo(mapRef.current);
      
      console.log("Choropleth layer added");
    } 
    else if (currentLayer === 'markers') {
      // Add circle markers
      const markers = breastCancerData
        .filter(area => area.lat !== undefined && area.lng !== undefined)
        .map(area => {
          const demographics = getDemographicData(area.name);
          return L.circleMarker([area.lat, area.lng], {
            radius: 8,
            fillColor: getMarkerColor(area.comparison),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          }).bindPopup(createPopupContent(area.name, area, demographics));
        });

      window.currentMarkerLayer = L.layerGroup(markers).addTo(mapRef.current);
      console.log("Markers layer added");
    }
    
  }, [currentLayer, breastCancerData, geoDataWithComparison, mapRef, getDemographicData, createPopupContent, geoJSONStyle, onEachFeature]);

  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      <div className="w-full" style={{ padding: 0, margin: 0 }}>
        <MapContainer
          center={[47.608013, -122.335167]}
          zoom={9}
          style={{ 
            height: "100vh",
            width: "100vw",  // Use viewport width to ensure full width
            maxWidth: "100%", // Prevent horizontal scrollbar
            margin: 0,
            padding: 0
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GetMapRef />
          
          {/* Layer controls */}
          <LayerToggleControl 
            currentLayer={currentLayer} 
            setCurrentLayer={setCurrentLayer} 
          />
          
          {/* Legend based on current layer */}
          <LegendControl currentLayer={currentLayer} />
        </MapContainer>
      </div>
      <Description />
    </div>
  );
}

export default MapComponent;
