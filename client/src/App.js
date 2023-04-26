import React, { useContext, useState, useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import About from './components/About'
import PetStore from './components/pet_daycare/PetStore'
import PetItem from './components/pet/PetItem'
import Location from './components/location/Location'
import PetStoreOverview from './components/pet_daycare/PetStoreOverview'
// import Geocode from "react-geocode";
import { VisibileUserName } from './components/context/VisibleUsername'
import styled from "styled-components";



function App() {
  return (
    <>
      <NavBar />
      <Routes>
      <Route path="/about"
          element={ <About/> }
      />
      <Route
        path="/petstores"
          element={<PetStore/>}
      />
      <Route
        path="/petitems"
          element={<PetItem/>}
      />
      </Routes>
      </>
  );
 
}

export default App;
