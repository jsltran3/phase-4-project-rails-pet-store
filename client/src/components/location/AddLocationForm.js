import React, { useState } from "react";
import ChooseStoreDropdown from "../store/ChoosePetStoreDropDown";
import swal from "sweetalert";

function AddLocationForm({
  stores,
  onChooseStore,
  onAddLocation,
  chosenStore,
}) {
  console.log("stores within AddLocationForm child component: ", stores);

  const [createLocationFormData, setCreateLocationFormData] = useState({
    name: "",
  });

  const handleCreateLocationChange = (e) => {
    setCreateLocationFormData({
      ...createLocationFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = chosenStore.id;
    console.log(
      "id in handleCreate function in AddLocationForm child component: ",
      id
    );
    fetch(`/stores/${id}/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: createLocationFormData["location_name"],
        Store_id: id,
      }),
    })
      .then((response) => response.json())
      .then((newLocation) => {
        onAddLocation(newLocation);
        swal("Location added!");
      });
  };

  return (
    <div>
      <ChooseStoreDropdown stores={stores} onChooseStore={onChooseStore} />
      <h2>Add Location</h2>
      <form>
        <label htmlFor="name">Name of Location:</label>
        <br />
        <input
          onChange={handleCreateLocationChange}
          type="text"
          id="name"
          name="location_name"
        />
        <br />
        <input onClick={handleCreate} type="submit" />
      </form>
    </div>
  );
}

export default AddLocationForm;
