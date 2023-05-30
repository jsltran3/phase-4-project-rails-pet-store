import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import './App.css';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import About from "./components/About";
import PetStore from "./components/store/PetStore";
import PetItem from "./components/item/PetItem";
import Geocode from "react-geocode";

import Location from "./components/location/Location";
import PetStoreOverview from "./components/store/PetStoreOverview";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

// import Geocode from "react-geocode";
// import { VisibileUserName } from "./components/context/VisibleUsername";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <NavBar />
      <h1 className="bg-blue-500">Hello world!</h1>
      bg-blue-500
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/petstores" element={<PetStore />} />
        <Route path="/petitems" element={<PetItem />} />
        <Route path="/location" element={<PetItem />} />
      </Routes>
    </>
  );
}

export default App;
