import axios from "axios";
import React from "react";
import ListPathForm from "./ListPathForm";
import AllPathForm from "./AllPathForm";
import { useContext, useState, useEffect } from "react";
import { PathContext } from "../Home/PathContext";

import Alert from "@mui/material/Alert";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";

const FindPathForm = () => {
  const {
    selectedStart,
    setselectedStart,
    selectedEnd,
    setselectedEnd,
    selectedStartId,
    setselectedStartId,
    selectedEndId,
    setselectedEndId,
  } = useContext(PathContext);

  const mapURL = "https://ski-resort-map.onrender.com/map";
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    axios.get(mapURL).then((res) => {
      setLocation(res.data.nodes);
    });
  }, []);

  const [startingLocation, setStartingLocation] = React.useState("");
  const [destinationLocation, setDestinationLocation] = React.useState("");

  useEffect(() => {
    setStartingLocation(selectedStartId);
    setDestinationLocation(selectedEndId);
  }, [selectedStartId, selectedEndId]);

  const [pathInfo, setPathInfo] = React.useState(null);

  const [startAlert, setStartAlert] = useState(false);
  const [startAlertContent, setStartAlertContent] = useState("");
  const [endAlert, setEndAlert] = useState(false);
  const [endAlertContent, setEndAlertContent] = useState("");
  const [difficultyAlert, setDifficultyAlert] = useState(false);
  const [difficultyAlertContent, setDifficultyAlertContent] = useState("");

  const [easyCheckedFlag, setEasyCheckedFlag] = useState(true);
  const [mediumCheckedFlag, setMediumCheckedFlag] = useState(true);
  const [hardCheckedFlag, setHardCheckedFlag] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const checkedFlag = [easyCheckedFlag, mediumCheckedFlag, hardCheckedFlag];
    console.log(checkedFlag);

    const requestBody = {
      startNodeId: startingLocation,
      targetNodeId: destinationLocation,
      difficulty: checkedFlag,
    };

    console.log("Submitting: ", requestBody);

    if (startingLocation === "") {
      setStartAlertContent("Please select the start node!");
      setStartAlert(true);
    } else {
      setStartAlert(false);
    }

    if (destinationLocation === "") {
      setEndAlertContent("Please select the end node!");
      setEndAlert(true);
    } else {
      setEndAlert(false);
    }

    if (!easyCheckedFlag && !mediumCheckedFlag && !hardCheckedFlag) {
      setDifficultyAlertContent("Please select the difficulty!");
      setDifficultyAlert(true);
    } else {
      setDifficultyAlert(false);
    }

    // http://localhost:3000/map/path
    // https://ski-resort-map.onrender.com/map/path
    axios
      .post("https://ski-resort-map.onrender.com/map/path", requestBody)
      .then((res) => {
        console.log(res.data);
        setPathInfo(res.data);
      })
      .catch((err) => {
        console.error("Error in Submission", err);
      });
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className="max-w-xl m-auto">
      {/* <h1 className="text-center mt-5">Find Your Desired Path</h1> */}

      <div>
        {startAlert ? (
          <Alert severity="error">{startAlertContent}</Alert>
        ) : (
          <></>
        )}
      </div>
      <div>
        {endAlert ? <Alert severity="error">{endAlertContent}</Alert> : <></>}
      </div>

      <div>
        {difficultyAlert ? (
          <Alert severity="error">{difficultyAlertContent}</Alert>
        ) : (
          <></>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startLocation"
          >
            Starting Location
          </label>
          <select
            value={startingLocation}
            onChange={(e) => setStartingLocation(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {/* <option>Select Your Starting Location</option> */}
            {selectedStart ? (
              <option>{selectedStart}</option>
            ) : (
              <option>Select Your Starting Location</option>
            )}
            {location
              ? location.map((obj) => {
                  return (
                    <option key={obj.id} value={obj.id} type={obj.nodeType}>
                      {obj.name}
                    </option>
                  );
                })
              : "None"}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startLocation"
          >
            Destination Location
          </label>
          <select
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {/* <option>Select Your Destination Location</option> */}
            {selectedEnd ? (
              <option>{selectedEnd}</option>
            ) : (
              <option>Select Your Destination Location</option>
            )}
            {location
              ? location.map((obj) => {
                  return (
                    <option key={obj.id} value={obj.id} type={obj.nodeType}>
                      {obj.name}
                    </option>
                  );
                })
              : "None"}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startLocation"
          >
            Select Difficulty
          </label>

          <FormControlLabel
            control={
              <Checkbox
                checked={easyCheckedFlag}
                // onChange={handleChange("east")}
                onClick={() => setEasyCheckedFlag(!easyCheckedFlag)}
                style={{
                  color: "#3C55C7",
                }}
                value="1.0"
              />
            }
            label={
              <Typography variant="h9" style={{ color: "#3C55C7" }}>
                Easy
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mediumCheckedFlag}
                // onChange={handleChange("medium")}
                onClick={() => setMediumCheckedFlag(!mediumCheckedFlag)}
                style={{
                  color: "#C73C3C",
                }}
                value="1.5"
              />
            }
            label={
              <Typography variant="h9" style={{ color: "#C73C3C" }}>
                Medium
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={hardCheckedFlag}
                // onChange={handleChange("hard")}
                onClick={() => setHardCheckedFlag(!hardCheckedFlag)}
                style={{
                  color: "#474747",
                }}
                value="2.0"
              />
            }
            label={
              <Typography variant="h9" style={{ color: "#474747" }}>
                Hard
              </Typography>
            }
          />
        </div>

        <button
          className="shadow bg-black hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Find A Path
        </button>
      </form>

      <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
        <AllPathForm selectedPath={{ path: pathInfo, node: location }} />
      </div>

      <div>
        <ListPathForm selectedPath={{ path: pathInfo, node: location }} />
      </div>
    </div>
  );
};

export default FindPathForm;
