import React from 'react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, useMap, GeoJSON, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import breastCancerDataExp from './Data/breastCancerRateData';
import geoData from "./Data/geoData.json";
const breastCancerData = breastCancerDataExp();

function getColor(comparison) {
  return comparison === "higher"
    ? "#ff0000"
    : comparison === "lower"
    ? "#00ff00"
    : "#ffff00";
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
      div.innerHTML = `
        <h4 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; text-align: center;">Comparison Key</h4>
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
        </div>
      `;
      return div;
    };
    legend.addTo(map);
    return () => {
      map.removeControl(legend);
    };
  }, [map]);
  return null;
}

function CircleMarkers({ breastCancerData, activeLayer }) {
  const map = useMap();

  useEffect(() => {
    console.log("Rendering Circle Markers...");
    if (!map) {
      console.log("Map not available yet.");
      return;
    }

    if (activeLayer !== 'circleMarkers') {
      console.log("Skipping Circle Markers: Layer is not 'circleMarkers'");
      return;
    }

    console.log("Adding markers...");
    const markers = breastCancerData.map((area) => {
      console.log(`Adding marker for: ${area.name}`);
      return L.circleMarker([area.lat, area.lon], {
        radius: 8,
        fillColor: getColor(area.comparison),
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
      );
    });

    const layerGroup = L.layerGroup(markers).addTo(map);
    console.log("Markers added to map.");

    return () => {
      console.log("Cleaning up markers...");
      layerGroup.clearLayers();
    };
  }, [map, activeLayer, breastCancerData]);

  return null;
}

function LayerHandler({ setActiveLayer }) {
  const map = useMap();

  useEffect(() => {
    const handleLayerChange = (e) => {
      if (e.name === "Circle Markers Layer" && e.type === "overlayadd") {
        setActiveLayer('circleMarkers');
      } else if (e.name === "GeoJSON Layer" && e.type === "overlayadd") {
        setActiveLayer('geoJSON');
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
  const [geoDataWithComparison, setGeoDataWithComparison] = useState(null);
  const [activeLayer, setActiveLayer] = useState('circleMarkers');

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
  }, [breastCancerData, geoData]);

  const geoJSONStyle = (feature) => ({
    fillColor: getColor(feature.properties.comparison),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7,
  });

  return (
    <div>
      <Navbar />
      <MapContainer
        center={[47.608013, -122.335167]}
        zoom={10}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          <LayersControl.Overlay
            name="GeoJSON Layer"
            checked={activeLayer === 'geoJSON'}
          >
            <LayerGroup>
              {geoDataWithComparison && (
                <GeoJSON
                  data={{ type: "FeatureCollection", features: geoDataWithComparison }}
                  style={geoJSONStyle}
                  onEachFeature={(feature, layer) => {
                    layer.bindPopup(
                      `<div>
                        <h3>${feature.properties.name}</h3>
                        <p>${feature.properties.rate} per 100,000</p>
                        <p>Cases: ${feature.properties.cases}</p>
                        <p>Comparison: ${feature.properties.comparison}</p>
                      </div>`
                    );
                  }}
                />
              )}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay
            name="Circle Markers Layer"
            checked={activeLayer === 'circleMarkers'}
          >
            <LayerGroup>
              <CircleMarkers breastCancerData={breastCancerData} activeLayer={activeLayer} />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <LegendControl />
        <LayerHandler setActiveLayer={setActiveLayer} />
      </MapContainer>
    </div>
  );
}

export default MapComponent;