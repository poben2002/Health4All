import React from 'react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import breastCancerDataExp from './Data/breastCancerRateData';

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

    const legend = L.control({ position: "bottomright"});
    legend.onAdd = function() {
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
      return div
    };
    legend.addTo(map);
    return () => {
      map.removeControl(legend);
    };
  }, [map]);
  return null;
}


function CircleMarkers({ breastCancerData }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    breastCancerData.forEach((area) => {
      L.circleMarker([area.lat, area.lon], {
        radius: 8,
        fillColor: getColor(area.comparison),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .bindPopup(
          `<div>
            <h3>${area.name}</h3>
            <p>${area.rate} per 100,000</p>
            <p>Cases: ${area.cases}</p>
            <p>Comparison: ${area.comparison}</p>
          </div>`
        )
        .addTo(map);
    });
  }, [map, breastCancerData]);

  return null;
}

function MapComponent() {
  // Need to move this out eventually

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
        <CircleMarkers breastCancerData={breastCancerData} />
        <LegendControl/>
      </MapContainer>
    </div>
  );
}

export default MapComponent;



