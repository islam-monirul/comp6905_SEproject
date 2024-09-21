import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { CRS } from "leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useContext, useState } from "react";
import { PathContext } from "../Home/PathContext";

import "leaflet/dist/leaflet.css";
import axios from "axios";

const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export default function Map() {
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);

  const {
    path,
    setPath,
    selectedStart,
    setselectedStart,
    selectedEnd,
    setselectedEnd,
    selectedStartId,
    setselectedStartId,
    selectedEndId,
    setselectedEndId,
  } = useContext(PathContext);

  const selectedLine = [];
  if (path !== null) {
    for (let i = 0; i < path.path.length; i++) {
      let fromNodeId = path.path[i].fromNodeId;
      let toNodeId = path.path[i].toNodeId;

      let tempCoordinatesList = [];
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].id.localeCompare(fromNodeId) == 0) {
          tempCoordinatesList.push([
            (607 * nodes[j].coordinates.y) / 174 - 607,
            150 + ((1049 - 150) * nodes[j].coordinates.x) / 255,
          ]);
        }

        if (nodes[j].id.localeCompare(toNodeId) == 0) {
          tempCoordinatesList.push([
            (607 * nodes[j].coordinates.y) / 174 - 607,
            150 + ((1049 - 150) * nodes[j].coordinates.x) / 255,
          ]);
        }
      }

      selectedLine.push(tempCoordinatesList);
    }
  }

  const lineOptions = { color: "green", weight: 2, fillOpacity: 0.4 };

  const lineOptionsSelected = { color: "red", weight: 3, fillOpacity: 0.4 };

  const lineOptionsBackground = { color: "grey", weight: 4 };

  const polyline = [];

  for (let i = 0; i < edges.length; i++) {
    let fromNodeId = edges[i].fromNodeId;
    let toNodeId = edges[i].toNodeId;

    let tempCoordinatesList = [];
    for (let j = 0; j < nodes.length; j++) {
      if (nodes[j].id.localeCompare(fromNodeId) == 0) {
        tempCoordinatesList.push([
          (607 * nodes[j].coordinates.y) / 174 - 607,
          150 + ((1049 - 150) * nodes[j].coordinates.x) / 255,
        ]);
      }

      if (nodes[j].id.localeCompare(toNodeId) == 0) {
        tempCoordinatesList.push([
          (607 * nodes[j].coordinates.y) / 174 - 607,
          150 + ((1049 - 150) * nodes[j].coordinates.x) / 255,
        ]);
      }
    }

    polyline.push(tempCoordinatesList);
  }

  // https://ski-resort-map.onrender.com/map
  // http://localhost:3000/map
  React.useEffect(() => {
    axios
      .get("https://ski-resort-map.onrender.com/map")
      .then((response) => {
        setNodes(response.data.nodes);
        setEdges(response.data.edges);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="mainMap">
      <h2 className="pb-5 pt-5">Map</h2>
      <div className="flex items-center justify-center border-x-8 border-solid">
        <MapContainer
          style={{ height: "620px", width: "950px" }}
          center={[-310, 600]}
          zoom={0}
          scrollWheelZoom={false}
          crs={CRS.Simple}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url={"/tiles/{z}/{x}/{y}.png"}
            noWrap={true}
            tileSize={1200}
          />

          {nodes.map((node, index) => {
            return (
              <Marker
                icon={customMarkerIcon}
                key={index}
                position={[
                  (607 * node.coordinates.y) / 174 - 607,
                  150 + ((1049 - 150) * node.coordinates.x) / 255,
                ]}
              >
                <Popup>
                  <div>
                    <div>{node.name}</div>
                    <div className="grid grid-cols-2 gap-1 px-1 py-2">
                      <button
                        className="shadow bg-black hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
                        onClick={() => {
                          setselectedStart(node.name);
                          setselectedStartId(node.id);
                        }}
                      >
                        Start
                      </button>
                      <button
                        className="shadow bg-black hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
                        onClick={() => {
                          setselectedEnd(node.name);
                          setselectedEndId(node.id);
                        }}
                      >
                        End
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {polyline.map((line, index) => {
            return (
              <Polyline
                key={index}
                pathOptions={lineOptions}
                positions={line}
              />
            );
          })}

          {path &&
            polyline.map((line, index) => {
              return (
                <Polyline
                  key={index}
                  pathOptions={lineOptionsBackground}
                  positions={line}
                />
              );
            })}

          {path &&
            selectedLine.map((line, index) => {
              return (
                <Polyline
                  key={index}
                  pathOptions={lineOptionsSelected}
                  positions={line}
                />
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
}
