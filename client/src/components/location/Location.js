import React, { useEffect, useState } from "react";
import AddLocationForm from "./AddLocationForm";
import EditLocationForm from "./EditLocationForm";

function Location({
  stores,
  onFetchstores,
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
  location,
  locationId,
  onChooseStore,
  chosenStore,
}) {
  console.log("stores within Location child component: ", stores);
  useEffect(() => {
    fetch("/stores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onFetchstores(data);
      });
  }, []);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  function toggleAddLocation() {
    setShowAdd(!showAdd);
  }

  function toggleEditLocation() {
    setShowEdit(!showEdit);
  }

  return (
    <div>
      <h1>Locations</h1>
      <button onClick={toggleAddLocation}>Add Location</button>
      <br />
      <br />
      <button onClick={toggleEditLocation}>Edit Location</button>
      <br />
      {showAdd && (
        <AddLocationForm
          onAddLocation={onAddLocation}
          stores={stores}
          onChooseStore={onChooseStore}
          chosenStore={chosenStore}
        />
      )}
      {showAdd && showEdit && <hr />}
      {showEdit && (
        <EditLocationForm
          onEditLocation={onEditLocation}
          onDeleteLocation={onDeleteLocation}
          location={location}
          locationId={locationId}
          stores={stores}
          onChooseStore={onChooseStore}
          chosenStore={chosenStore}
        />
      )}
    </div>
  );
}

export default Location;
