import React from 'react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, useMap, GeoJSON, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
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

// Color function for circle markers based on comparison
function getMarkerColor(comparison) {
  return comparison === "higher"
    ? "#ff0000"  // Red for higher
    : comparison === "lower"
      ? "#00ff00"  // Green for lower
      : "#ffff00";  // Yellow for no difference
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

function LegendControl({ activeLayer }) {
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
        display: ${activeLayer ? 'block' : 'none'};  // Hide legend when no layer is active
      `;
      
      if (activeLayer === 'circleMarkers') {
        div.innerHTML = `
          <h4 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; text-align: center;">Markers Legend</h4>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="width: 20px; height: 20px; background: #ff0000; display: inline-block; margin-right: 10px; border-radius: 3px;"></span>
            <strong>Higher Rate</strong>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="width: 20px; height: 20px; background: #00ff00; display: inline-block; margin-right: 10px; border-radius: 3px;"></span>
            <strong>Lower Rate</strong>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="width: 20px; height: 20px; background: #ffff00; display: inline-block; margin-right: 10px; border-radius: 3px;"></span>
            <strong>No Difference</strong>
          </div>`;
      } else {
        div.innerHTML = `
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
      }
      return div;
    };
    legend.addTo(map);
    return () => {
      map.removeControl(legend);
    };
  }, [map, activeLayer]);
  return null;
}

function CircleMarkers({ breastCancerData, activeLayer }) {
  const map = useMap();

  useEffect(() => {
    if (!map || activeLayer !== 'circleMarkers' || !breastCancerData) return;
  
    const markers = breastCancerData
      .filter(area => area.lat !== undefined && area.lng !== undefined)
      .map(area =>
        L.circleMarker([area.lat, area.lng], {
          radius: 8,
          fillColor: getMarkerColor(area.comparison),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        }).bindPopup(
          `<div>
            <h3>${area.name}</h3>
            <p>${area.rate} per 100,000</p>
            <p>Cases: ${area.cases}</p>
            <p>Comparison: ${area.comparison}</p>
          </div>`
        )
      );

    const layerGroup = L.layerGroup(markers).addTo(map);
    return () => {
      map.removeLayer(layerGroup);
    };
  }, [map, activeLayer, breastCancerData]);

  return null;
}

function LayerHandler({ setActiveLayer }) {
  const map = useMap();

  useEffect(() => {
    const handleLayerChange = (e) => {
      if (e.type === "overlayadd") {
        if (e.name === "Circle Markers Layer") {
          setActiveLayer('circleMarkers');
        } else if (e.name === "Chloropleth Layer") {
          setActiveLayer('geoJSON');
        }
      } else if (e.type === "overlayremove") {
        setActiveLayer(null);  // Set to null when layer is removed
      }
    };

    map.on('overlayadd', handleLayerChange);
    map.on('overlayremove', handleLayerChange);

    return () => {
      map.off('overlayadd', handleLayerChange);
      map.off('overlayremove', handleLayerChange);
    };
  }, [map, setActiveLayer]);

  return null;
}

function MapComponent() {
  const [breastCancerData, setBreastCancerData] = useState([]);
  const [geoDataWithComparison, setGeoDataWithComparison] = useState(null);
  const [activeLayer, setActiveLayer] = useState(null);
  const [demographicData, setDemographicData] = useState(null);

  useEffect(() => {
    fetch("/api/heatmap")
      .then((res) => res.json())
      .then((data) => {
        setBreastCancerData(data.heatmap);
      })
      .catch((err) => {
        console.error("Error fetching heatmap data:", err);
      });
  }, []);

  useEffect(() => {
    const updatedGeoData = geoData.features.map((feature) => {
      const cancerData = breastCancerData.find(
        (data) => data.name === feature.properties.name
      );

      if (cancerData) {
        feature.properties.comparison = cancerData.comparison;
        feature.properties.rate = cancerData.rate;
        feature.properties.cases = cancerData.cases;
      }
      return feature;
    });

    setGeoDataWithComparison(updatedGeoData);
  }, [breastCancerData]);

  useEffect(() => {
    // Fetch demographic data
    fetch("/api/demographics")
      .then((res) => res.json())
      .then((data) => {
        setDemographicData(data);
      })
      .catch((err) => {
        console.error("Error fetching demographic data:", err);
      });
  }, []);

  const geoJSONStyle = (feature) => ({
    fillColor: getChloroplethColor(feature.properties.rate),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7,
  });

  // Create enhanced popup content with demographic data
  const createPopupContent = (name, rate, cases, comparison) => {
    const areaData = demographicData?.[name];
    if (!areaData) return `
      <div>
        <h3>${name}</h3>
        <p>${rate} per 100,000</p>
        <p>Cases: ${cases}</p>
        <p>Comparison: ${comparison}</p>
      </div>
    `;

    return `
      <div class="popup-content">
        <h3>${name}</h3>
        <div class="popup-section">
          <h4>Cancer Statistics</h4>
          <p>Rate: ${rate} per 100,000</p>
          <p>Cases: ${cases}</p>
          <p>Comparison: ${comparison}</p>
        </div>
        
        <div class="popup-section">
          <h4>Demographics</h4>
          <div class="demographic-chart">
            <div style="width: ${areaData.race.white}%; background: #1f77b4;">White ${areaData.race.white}%</div>
            <div style="width: ${areaData.race.asian}%; background: #2ca02c;">Asian ${areaData.race.asian}%</div>
            <div style="width: ${areaData.race.black}%; background: #ff7f0e;">Black ${areaData.race.black}%</div>
            <div style="width: ${areaData.race.hispanic}%; background: #d62728;">Hispanic ${areaData.race.hispanic}%</div>
            <div style="width: ${areaData.race.multiracial}%; background: #9467bd;">Multiple ${areaData.race.multiracial}%</div>
          </div>
        </div>

        <div class="popup-section">
          <h4>Health Insurance</h4>
          <p>Uninsured: ${areaData.health.uninsured}%</p>
        </div>
      </div>
    `;
  };

  // Update your GeoJSON and CircleMarkers components to use the new popup content
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(`
        <div>
          <h3>${feature.properties.name}</h3>
          <p>${feature.properties.rate} per 100,000</p>
          <p>Cases: ${feature.properties.cases}</p>
          <p>Comparison: ${feature.properties.comparison}</p>
        </div>
      `);
    }
  };

  // Add some CSS for the popup styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .popup-content {
        max-width: 300px;
        padding: 10px;
      }
      .popup-section {
        margin: 10px 0;
      }
      .demographic-chart div {
        height: 20px;
        margin: 2px 0;
        color: white;
        padding: 2px;
        font-size: 12px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
        <LayersControl position="topright">
          <LayersControl.Overlay
            name="Chloropleth Layer"
            checked={false}
          >
            <LayerGroup>
              {geoDataWithComparison && (
                <GeoJSON
                  data={{ type: "FeatureCollection", features: geoDataWithComparison }}
                  style={geoJSONStyle}
                  onEachFeature={onEachFeature}
                />
              )}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay
            name="Circle Markers Layer"
            checked={false}
          >
            <LayerGroup>
              <CircleMarkers breastCancerData={breastCancerData} activeLayer={activeLayer} />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <LegendControl activeLayer={activeLayer} />
        <LayerHandler setActiveLayer={setActiveLayer} />
      </MapContainer>
      <Description />
    </div>
  );
}

export default MapComponent;
