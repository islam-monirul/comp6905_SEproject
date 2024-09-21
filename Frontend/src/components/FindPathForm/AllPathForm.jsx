import axios from "axios";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { PathContext } from "../Home/PathContext";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ListPathForm(props) {
  const { path, setPath } = useContext(PathContext);

  const [pathIndex, setPathIndex] = useState(null);
  const [pathChecker, setPathChecker] = useState(false);

  function handleMapChange(event, index) {
    const localChecker = event.target.checked;

    setPathChecker(localChecker);

    setPathIndex(index);

    if (!localChecker) {
      setPath(null);
    }

    if (localChecker) {
      setPath(props.selectedPath.path[index]);
    }
  }

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories) {
    return { name, calories };
  }

  let rows = [];
  if (
    props.selectedPath.path === null ||
    props.selectedPath.path.length === 0
  ) {
    rows.push(createData("No Path Found", 0));
  } else {
    for (let i = 0; i < props.selectedPath.path.length; i++) {
      rows.push(createData("Route " + (i + 1).toString(), i));
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Returned Route Name</StyledTableCell>
            <StyledTableCell align="right">
              Which Path Would You Like to See?
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              {/* <StyledTableCell align="right">{row.calories}</StyledTableCell> */}
              <StyledTableCell align="right">
                <div className="flex float-right gap-3">
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        // defaultChecked={index === pathIndex ? true : false}
                        checked={
                          index === pathIndex && pathChecker ? true : false
                        }
                        onChange={(e) => handleMapChange(e, index)}
                        disabled={
                          props.selectedPath.path === null ||
                          props.selectedPath.path.length === 0
                            ? true
                            : false
                        }
                      />
                    }
                    label="Show Path on Map (scroll up)"
                  />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
