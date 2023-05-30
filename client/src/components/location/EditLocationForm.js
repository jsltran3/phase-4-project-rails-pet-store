import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ChooseStoreDropdown from "../store/ChoosePetStoreDropDown";

function EditLocationForm({
  location,
  locationId,
  onEditLocation,
  onDeleteLocation,
  stores,
  onChooseStore,
  chosenStore,
}) {
  const [editLocationFormData, setEditLocationFormData] = useState({
    location_name: "",
  });

  console.log("location within EditLocationForm child component: ", location);

  // TODO:
  // Use a 'useEffect' block that pulls in the form data each time the 'chosenStore' within the 'Store/ChooseStoreDropdown' menu is changed:
  useEffect(() => {
    console.log(
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    console.log(
      "chosenStore changed, reacting to this change with a useEffect block in EditLocationForm"
    );
    if (location.length === 0) {
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      console.log("if block reached");
      console.log("location's length is less than 0");
      console.log("location: ", location);
      console.log("location.length: ", location.length);
      console.log("location: ", location);
      console.log(
        "Store doesn't have a location, setting location to a blank string"
      );
      setEditLocationFormData({ location_name: "" });
      console.log(
        "editLocationFormData after useEffect: ",
        editLocationFormData
      );
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
    } else {
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      console.log("else block reached");
      console.log("location's length is greater than 0");
      console.log("location: ", location);
      console.log("location.length: ", location.length);
      console.log(
        "Store has a location, setting location to the actual location"
      );
      setEditLocationFormData({ location_name: location });
      console.log(
        "editLocationFormData after useEffect: ",
        editLocationFormData
      );
      console.log(
        "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
      );
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
    }
    //
  }, [chosenStore]);

  console.log("editLocationFormData outside useEffect: ", editLocationFormData);

  const handleEditLocationChange = (e) => {
    setEditLocationFormData({
      ...editLocationFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const StoreId = chosenStore.id;

    console.log(
      "handleEdit function called in EditLocationForm child component"
    );
    console.log("e.target.value: ", e.target.value);
    console.log("StoreId: ", StoreId);
    console.log("editLocationFormData: ", editLocationFormData);
    console.log("locationId: ", locationId);

    // TODO:
    // Figure out how to specify the specific route for a Store's location for editing purposes:
    fetch(`/stores/${StoreId}/location`, {
      // fetch(`/stores/${StoreId}/location/${locationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: editLocationFormData["location_name"],
        Store_id: StoreId,
        locationId: locationId,
      }),
    })
      .then((response) => response.json())
      .then((editedLocation) => {
        onEditLocation(editedLocation);
        swal("Location edited!");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const StoreId = chosenStore.id;

    fetch(`/stores/${StoreId}/location`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: editLocationFormData["location_name"],
        Store_id: StoreId,
        locationId: locationId,
      }),
    }).then((response) => {
      if (response.ok) {
        onDeleteLocation(response, locationId);
        swal("Location deleted!");
      }
    });
  };

  return (
    <div>
      <ChooseStoreDropdown stores={stores} onChooseStore={onChooseStore} />
      <h2>Edit Location</h2>
      <form>
        <label htmlFor="name">Name of Location:</label>
        <br />
        <input
          onChange={handleEditLocationChange}
          type="text"
          id="name"
          name="location_name"
          value={editLocationFormData.location_name}
        />
        <br />
        <br />
        <input onClick={handleEdit} type="submit" value="Edit" />
        <br />
        <input onClick={handleDelete} type="submit" value="Delete" />
      </form>
    </div>
  );
}

export default EditLocationForm;
