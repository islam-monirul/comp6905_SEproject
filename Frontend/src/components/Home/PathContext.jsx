import axios from "axios";
import { React, createContext, useEffect, useState } from "react";

export const PathContext = createContext({});

export function PathContextProvider({ children }) {
  const [path, setPath] = useState(null);
  const [selectedStart, setselectedStart] = useState("");
  const [selectedEnd, setselectedEnd] = useState("");
  const [selectedStartId, setselectedStartId] = useState("");
  const [selectedEndId, setselectedEndId] = useState("");

  return (
    <PathContext.Provider
      value={{
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
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
