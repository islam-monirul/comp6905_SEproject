import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { PathContext } from "../Home/PathContext";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function getNodeName(id, nodes) {
  for (let k = 0; k < nodes.length; k++) {
    if (nodes[k].id.localeCompare(id) == 0) {
      return nodes[k].name;
    }
  }
}

export default function ListPathForm(props) {
  console.log(props);

  const { path, setPath } = useContext(PathContext);

  let classList = [
    "Easiest Path",
    "Fastest Path",
    "Shortest Path",
    "Minimum Lift Usage",
  ];
  let classDescription = [
    "No Path Found",
    "No Path Found",
    "No Path Found",
    "No Path Found",
  ];

  let easiestPath = null;
  let easiestValue = 1000;
  let easiestnumberOfSlope = 0;
  let easiestnumberOfLift = 0;
  if (props.selectedPath.path !== null) {
    for (let i = 0; i < props.selectedPath.path.length; i++) {
      if (easiestValue > props.selectedPath.path[i].metric.difficulty) {
        easiestValue = props.selectedPath.path[i].metric.difficulty;
        easiestPath = props.selectedPath.path[i];
      }
    }

    if (easiestPath !== null) {
      let detailedDescription = "";
      for (let j = 0; j < easiestPath.path.length; j++) {
        if (easiestPath.path[j].type.localeCompare("SLOPE") == 0) {
          easiestnumberOfSlope += 1;
        }
        if (easiestPath.path[j].type.localeCompare("SKI_LIFT") == 0) {
          easiestnumberOfLift += 1;
        }

        let tempDescription = "(" + (j + 1).toString() + ") From ";

        let name = getNodeName(
          easiestPath.path[j].fromNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += " to ";

        name = getNodeName(
          easiestPath.path[j].toNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += ". This is a ";

        if (easiestPath.path[j].type.localeCompare("SLOPE") == 0) {
          if (easiestPath.path[j].difficulty <= 1.0) {
            tempDescription += "easy ";
          } else if (1.0 < easiestPath.path[j].difficulty < 2.0) {
            tempDescription += "medium ";
          } else {
            tempDescription += "hard ";
          }

          tempDescription += "slope";
        } else {
          tempDescription += "lift";
        }

        tempDescription += ". \n";

        detailedDescription += tempDescription;
      }

      detailedDescription += "\n";

      detailedDescription +=
        "- Distance: " + easiestPath.metric.distance + " (km) \n";

      let printDifficulty = "";
      if (easiestPath.metric.difficulty <= 1.0) {
        printDifficulty = "easy ";
      } else if (1.0 < easiestPath.metric.difficulty < 2.0) {
        printDifficulty = "medium ";
      } else {
        printDifficulty = "hard ";
      }

      detailedDescription += "- Difficulty: " + printDifficulty + " \n";

      detailedDescription +=
        "- Time Taken: " + easiestPath.metric.timeTaken + " (min) \n";

      detailedDescription +=
        "- Number of Slopes: " + easiestnumberOfSlope.toString() + " \n";

      detailedDescription +=
        "- Number of Lifts: " + easiestnumberOfLift.toString() + " \n";

      classDescription[0] = detailedDescription;
    }
  }

  let fastestPath = null;
  let fastestValue = 1000;
  let fastestnumberOfSlope = 0;
  let fastestnumberOfLift = 0;
  if (props.selectedPath.path !== null) {
    for (let i = 0; i < props.selectedPath.path.length; i++) {
      if (fastestValue > props.selectedPath.path[i].metric.timeTaken) {
        fastestValue = props.selectedPath.path[i].metric.timeTaken;
        fastestPath = props.selectedPath.path[i];
      }
    }

    if (fastestPath !== null) {
      let detailedDescription = "";
      for (let j = 0; j < fastestPath.path.length; j++) {
        if (fastestPath.path[j].type.localeCompare("SLOPE") == 0) {
          fastestnumberOfSlope += 1;
        }
        if (fastestPath.path[j].type.localeCompare("SKI_LIFT") == 0) {
          fastestnumberOfLift += 1;
        }

        let tempDescription = "(" + (j + 1).toString() + ") From ";

        let name = getNodeName(
          fastestPath.path[j].fromNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += " to ";

        name = getNodeName(
          fastestPath.path[j].toNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += ". This is a ";

        if (fastestPath.path[j].type.localeCompare("SLOPE") == 0) {
          if (fastestPath.path[j].difficulty <= 1.0) {
            tempDescription += "easy ";
          } else if (1.0 < fastestPath.path[j].difficulty < 2.0) {
            tempDescription += "medium ";
          } else {
            tempDescription += "hard ";
          }

          tempDescription += "slope";
        } else {
          tempDescription += "lift";
        }

        tempDescription += ". \n";

        detailedDescription += tempDescription;
      }

      detailedDescription += "\n";

      detailedDescription +=
        "- Distance: " + fastestPath.metric.distance + " (km) \n";

      let printDifficulty = "";
      if (fastestPath.metric.difficulty <= 1.0) {
        printDifficulty = "easy ";
      } else if (1.0 < fastestPath.metric.difficulty < 2.0) {
        printDifficulty = "medium ";
      } else {
        printDifficulty = "hard ";
      }

      detailedDescription += "- Difficulty: " + printDifficulty + " \n";

      detailedDescription +=
        "- Time Taken: " + fastestPath.metric.timeTaken + " (min) \n";

      detailedDescription +=
        "- Number of Slopes: " + fastestnumberOfSlope.toString() + " \n";

      detailedDescription +=
        "- Number of Lifts: " + fastestnumberOfLift.toString() + " \n";

      classDescription[1] = detailedDescription;
    }
  }

  let shortestPath = null;
  let shortestValue = 1000;
  let shortestnumberOfSlope = 0;
  let shortestnumberOfLift = 0;
  if (props.selectedPath.path !== null) {
    for (let i = 0; i < props.selectedPath.path.length; i++) {
      if (shortestValue > props.selectedPath.path[i].metric.distance) {
        shortestValue = props.selectedPath.path[i].metric.distance;
        shortestPath = props.selectedPath.path[i];
      }
    }

    if (shortestPath !== null) {
      let detailedDescription = "";
      for (let j = 0; j < shortestPath.path.length; j++) {
        if (shortestPath.path[j].type.localeCompare("SLOPE") == 0) {
          shortestnumberOfSlope += 1;
        }
        if (shortestPath.path[j].type.localeCompare("SKI_LIFT") == 0) {
          shortestnumberOfLift += 1;
        }

        let tempDescription = "(" + (j + 1).toString() + ") From ";

        let name = getNodeName(
          shortestPath.path[j].fromNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += " to ";

        name = getNodeName(
          shortestPath.path[j].toNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += ". This is a ";

        if (shortestPath.path[j].type.localeCompare("SLOPE") == 0) {
          if (shortestPath.path[j].difficulty <= 1.0) {
            tempDescription += "easy ";
          } else if (1.0 < shortestPath.path[j].difficulty < 2.0) {
            tempDescription += "medium ";
          } else {
            tempDescription += "hard ";
          }

          tempDescription += "slope";
        } else {
          tempDescription += "lift";
        }

        tempDescription += ". \n";

        detailedDescription += tempDescription;
      }

      detailedDescription += "\n";

      detailedDescription +=
        "- Distance: " + shortestPath.metric.distance + " (km) \n";

      let printDifficulty = "";
      if (shortestPath.metric.difficulty <= 1.0) {
        printDifficulty = "easy ";
      } else if (1.0 < shortestPath.metric.difficulty < 2.0) {
        printDifficulty = "medium ";
      } else {
        printDifficulty = "hard ";
      }

      detailedDescription += "- Difficulty: " + printDifficulty + " \n";

      detailedDescription +=
        "- Time Taken: " + shortestPath.metric.timeTaken + " (min) \n";

      detailedDescription +=
        "- Number of Slopes: " + shortestnumberOfSlope.toString() + " \n";

      detailedDescription +=
        "- Number of Lifts: " + shortestnumberOfLift.toString() + " \n";

      classDescription[2] = detailedDescription;
    }
  }

  let minLiftPath = null;
  let minLiftnumberOfSlope = 0;
  let minLiftnumberOfLift = 1000;
  if (props.selectedPath.path !== null) {
    if (minLiftnumberOfLift > easiestnumberOfLift) {
      minLiftnumberOfLift = easiestnumberOfLift;
      minLiftPath = easiestPath;
      minLiftnumberOfSlope = easiestnumberOfSlope;
    }

    if (minLiftnumberOfLift > fastestnumberOfLift) {
      minLiftnumberOfLift = fastestnumberOfLift;
      minLiftPath = fastestPath;
      minLiftnumberOfSlope = fastestnumberOfSlope;
    }

    if (minLiftnumberOfLift > shortestnumberOfLift) {
      minLiftnumberOfLift = shortestnumberOfLift;
      minLiftPath = shortestPath;
      minLiftnumberOfSlope = shortestnumberOfSlope;
    }

    if (minLiftPath !== null) {
      let detailedDescription = "";
      for (let j = 0; j < minLiftPath.path.length; j++) {
        let tempDescription = "(" + (j + 1).toString() + ") From ";

        let name = getNodeName(
          minLiftPath.path[j].fromNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += " to ";

        name = getNodeName(
          minLiftPath.path[j].toNodeId,
          props.selectedPath.node
        );

        tempDescription += name;

        tempDescription += ". This is a ";

        if (minLiftPath.path[j].type.localeCompare("SLOPE") == 0) {
          if (minLiftPath.path[j].difficulty <= 1.0) {
            tempDescription += "easy ";
          } else if (1.0 < minLiftPath.path[j].difficulty < 2.0) {
            tempDescription += "medium ";
          } else {
            tempDescription += "hard ";
          }

          tempDescription += "slope";
        } else {
          tempDescription += "lift";
        }

        tempDescription += ". \n";

        detailedDescription += tempDescription;
      }

      detailedDescription += "\n";

      detailedDescription +=
        "- Distance: " + minLiftPath.metric.distance + " (km) \n";

      let printDifficulty = "";
      if (minLiftPath.metric.difficulty <= 1.0) {
        printDifficulty = "easy ";
      } else if (1.0 < minLiftPath.metric.difficulty < 2.0) {
        printDifficulty = "medium ";
      } else {
        printDifficulty = "hard ";
      }

      detailedDescription += "- Difficulty: " + printDifficulty + " \n";

      detailedDescription +=
        "- Time Taken: " + minLiftPath.metric.timeTaken + " (min) \n";

      detailedDescription +=
        "- Number of Slopes: " + minLiftnumberOfSlope.toString() + " \n";

      detailedDescription +=
        "- Number of Lifts: " + minLiftnumberOfLift.toString() + " \n";

      classDescription[3] = detailedDescription;
    }
  }

  const finalPathList = [easiestPath, fastestPath, shortestPath, minLiftPath];

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p className="block text-gray-700 text-sm font-bold mb-2">
        Select Preferable Path
      </p>
      <div className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        {classList.map((selectedClass, index) => {
          return (
            // <Accordion defaultExpanded={index === 0 ? true : false} key={index}>
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>{selectedClass}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component={"span"}>
                  {classDescription[index].split("\n").map((i, key) => {
                    return (
                      <div key={key}>
                        {i}
                        <br />
                      </div>
                    );
                  })}

                  <div className="pt-7 flex gap-3">
                    <button
                      className="shadow bg-black hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setPath(finalPathList[index]);
                        const elementMap = document.getElementById("mainMap");
                        elementMap?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      title="Show the path on the map"
                    >
                      Select Path
                    </button>
                    <button
                      className="shadow bg-black hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setPath(null);
                        const elementMap = document.getElementById("mainMap");
                        elementMap?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      title="Remove the path from the map"
                    >
                      Cancel Path
                    </button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
