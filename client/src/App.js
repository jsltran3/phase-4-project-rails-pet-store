import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

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
  const [stores, setStores] = useState([]);
  const [chosenStore, setChosenStore] = useState({});
  const [storeIndex, setStoreIndex] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemIndex, setItemIndex] = useState("");
  const [location, setLocation] = useState([]);
  const [locationId, setLocationId] = useState("");
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (chosenStore) {
      if (chosenStore.items) {
        let itemOptions = chosenStore.items.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        });

        setItemOptions(itemOptions);
      }
    }
  }, [chosenStore]);

  if (!user) return <Login onLogin={setUser} />;

  function handleFetchStores(fetchedStores) {
    setStores(fetchedStores);
  }

  // NOTE: This function is necessary to obtain the 'lat' (latitude) and 'lng' (longitude) to later display the proper
  // marker positions for the map on the 'Summary' page:
  async function get_coordinates(name) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    return await Geocode.fromAddress(name)
      .then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          let position = { lat: lat, lng: lng };
          // Related Stackoverflow post:
          // https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val
          return position;
        },
        (error) => {
          console.error(error);
        }
      )
      .then((response) => {
        return response;
      });

    async function handleFetchSummaryStores(fetchedStores) {
      // Loop through each store and check to see if it has a location
      // If it has a location, then run the 'get_coordinates' function to its actual 'lat' and 'lng' values accordingly so that we can
      // later use them for the map on the summary page:
      const promises = fetchedStores.map(async (store) => {
        if (store.location) {
          let position = await get_coordinates(store.location.name);

          return {
            ...store,
            location: { ...store.location, position: position },
          };
        } else {
          return store;
        }
      });

      const modifiedStores = await Promise.all(promises);
      setStores(modifiedStores);
    }

    function handleAddStore(newStore) {
      const updatedStoresArray = [...stores, newStore];
      setStores(updatedStoresArray);
    }

    function handleEditStore(editedStore) {
      setStores((stores) =>
        stores.map((store) => {
          return store.id === editedStore.id ? editedStore : store;
        })
      );
    }

    function handleDeleteStore(deletedStore) {
      setStores((stores) =>
        stores.filter((store) => store.id !== deletedStore.id)
      );
    }
    function handleChooseStore(e) {
      const match = stores.find((item) => item.name == e.target.value);

      setChosenStore(match);

      let index = stores.map((store) => store.name).indexOf(e.target.value);

      setStoreIndex(index);

      // NOTE:
      // Adding use case scenario of when a location exists for the match, then update the location accordingly so I don't have to write two functions
      // to do the same thing:
      if (match.location) {
        let location = match.location.name;
        let locationId = match.location.id;
        setLocation(location);
        setLocationId(locationId);
      } else {
        setLocation("");
      }
    }

    function handleAddItem(newItem) {
      stores.map((store) => {
        if (store.id == chosenStore.id) {
          const updatedItemsArray = [...store.items, newItem];

          let itemOptions = updatedItemsArray.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          });

          setItemOptions(itemOptions);
          let tempArray = [...stores];
          tempArray[storeIndex].items.push(newItem);
          setStores(tempArray);
        } else {
          console.log("Match not found within 'handleAddNewItem!");
        }
      });
    }

    function handleChangeItemInfo(chosenItemId, chosenItemIndex) {
      setItemId(chosenItemId);
      setItemIndex(chosenItemIndex);
    }

    function handleEditItem(editedItem) {
      let tempArray = [...stores];
      tempArray[storeIndex].items[itemIndex] = editedItem;
      setStores(tempArray);

      let itemOptions = chosenStore.items.map((item) => {
        return (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        );
      });

      setItemOptions(itemOptions);
    }

    function handleDeleteItem(response, deletedItemId) {
      let tempArray = [...stores];
      tempArray[storeIndex].items.splice(itemIndex, 1);
      setStores(tempArray);

      let filteredItemOptions = chosenStore.items.map((item) => {
        return (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        );
      });

      setItemOptions(filteredItemOptions);
    }

    function handleAddLocation(newLocation) {
      stores.map((store) => {
        if (store.id == chosenStore.id) {
          let tempArray = [...stores];
          tempArray[storeIndex].location = newLocation;
          setStores(tempArray);
        } else {
          console.log("Match not found within 'handleAddNewLocation!");
        }
      });

      console.log("stores after setStores() called for tempArray: ", stores);
    }

    function handleEditLocation(editedLocation, locationId) {
      let tempArray = [...stores];
      tempArray[storeIndex].location = editedLocation;
      setStores(tempArray);
      setLocation(editedLocation);
    }

    function handleDeleteLocation(response, locationId) {
      let tempArray = [...stores];
      tempArray[storeIndex].location = null;
      setStores(tempArray);
      setLocation("");
    }
  }
  // Two resources used for 'Navigate' for '/' route for '/about' component:
  // https://www.pluralsight.com/guides/how-to-set-react-router-default-route-redirect-to-home
  // https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom

  return (
    <>
      <NavBar />

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
