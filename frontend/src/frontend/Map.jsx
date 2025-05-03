import React from 'react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, useMap, GeoJSON, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback, useRef } from "react";
import geoData from "./Data/geoData.json";

function Description() {
  return (
    <section className="pt-4">
      <div className="flex flex-col text-center px-4">
        <p className="mt-6=4 text-lg font-light leading-7">
          Interactive map of Neighborhoods and Cities in the King County area. Use the icon at the top right to toggle between marker view and chloropleth view.
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

function LegendControl() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.style.cssText = `
        background: white;
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        font-size: 16px;
        font-family: Inter, sans-serif;
        width: fit-content;
      `;
      
      // Only show Chloropleth legend
      const chloroplethLegend = `
        <h4 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; text-align: center;">Rate per 100,000</h4>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="width: 20px; height: 20px; background: #800026; display: inline-block; margin-right: 10px;"></span>
          <strong>200+</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="width: 20px; height: 20px; background: #BD0026; display: inline-block; margin-right: 10px;"></span>
          <strong>180-200</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="width: 20px; height: 20px; background: #E31A1C; display: inline-block; margin-right: 10px;"></span>
          <strong>160-180</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="width: 20px; height: 20px; background: #FC4E2A; display: inline-block; margin-right: 10px;"></span>
          <strong>140-160</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="width: 20px; height: 20px; background: #FD8D3C; display: inline-block; margin-right: 10px;"></span>
          <strong>120-140</strong>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="width: 20px; height: 20px; background: #FEB24C; display: inline-block; margin-right: 10px;"></span>
          <strong>100-120</strong>
        </div>`;

      div.innerHTML = chloroplethLegend;
      return div;
    };
    legend.addTo(map);
    return () => {
      map.removeControl(legend);
    };
  }, [map]);
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

  // Add direct GeoJSON rendering without relying on LayersControl
  const GetMapRef = () => {
    const map = useMap();
    
    // Set the map reference
    useEffect(() => {
      if (!map) return;
      console.log("Map reference obtained");
      mapRef.current = map;
      
      // Add GeoJSON if data is ready
      if (geoDataWithComparison && breastCancerData.length) {
        console.log("Adding GeoJSON directly after getting map reference");
        
        // Remove any existing layer
        if (window.currentGeoLayer) {
          map.removeLayer(window.currentGeoLayer);
        }
        
        // Create and add the new layer
        window.currentGeoLayer = L.geoJSON({
          type: "FeatureCollection",
          features: geoDataWithComparison
        }, {
          style: geoJSONStyle,
          onEachFeature: onEachFeature
        }).addTo(map);
        
        console.log("GeoJSON layer added to map");
      }
    }, [map, geoDataWithComparison, breastCancerData, geoJSONStyle, onEachFeature]);
    
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

  // Watch for changes in data and update the GeoJSON layer
  useEffect(() => {
    if (!mapRef.current || !geoDataWithComparison || !breastCancerData.length) {
      console.log("Cannot update GeoJSON layer yet - waiting for dependencies");
      return;
    }
    
    console.log("Data has changed, updating GeoJSON layer");
    
    // Remove any existing layer
    if (window.currentGeoLayer) {
      mapRef.current.removeLayer(window.currentGeoLayer);
    }
    
    // Create and add the new layer
    window.currentGeoLayer = L.geoJSON({
      type: "FeatureCollection",
      features: geoDataWithComparison
    }, {
      style: geoJSONStyle,
      onEachFeature: onEachFeature
    }).addTo(mapRef.current);
    
    console.log("GeoJSON layer updated on map");
    
  }, [geoDataWithComparison, breastCancerData, geoJSONStyle, onEachFeature]);

  return (
    <div>
      <Navbar />
      <MapContainer
        center={[47.608013, -122.335167]}
        zoom={10}
        style={{ height: "1000px", width: "2000px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GetMapRef />
        
        {/* Render the legend directly */}
        <LegendControl />
        
        {/* We've removed the LayersControl and LayerHandler components */}
      </MapContainer>
      <Description />
    </div>
  );
}

export default MapComponent;
