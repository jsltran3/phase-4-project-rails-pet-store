import React, { useEffect, useState } from "react";
import ChoosePetStoreDropdown from "../store/ChoosePetStoreDropDown";
import swal from "sweetalert";

function EditPetStoreForm({
  stores,
  onChooseStore,
  onEditStore,
  onDeleteStore,
  chosenStore,
}) {
  useEffect(() => {
    setEditStoreFormData({
      name: chosenStore.name,
    });
  }, [chosenStore]);

  const [editStoreFormData, setEditStoreFormData] = useState({
    name: chosenStore.name,
  });

  const handleEditStoreChange = (e) => {
    setEditStoreFormData({
      ...editStoreFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const id = chosenStore.id;

    fetch(`/pet_stores/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: editStoreFormData["name"],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response: ", response);
        if (!response.errors) {
          onEditStore(response);
          swal("Store edited!");
        } else {
          swal(
            "Store could not be edited! You need to associate items and a location to a Store before it can be edited!"
          );
        }
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = chosenStore.id;

    fetch(`/pet_stores/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        onDeleteStore(chosenStore);
        swal("Store deleted!");
      } else {
        swal(
          "Store could not be deleted! You need to associate items to a Store before it can be deleted!"
        );
      }
    });
  };

  return (
    <div>
      <ChoosePetStoreDropdown stores={stores} onChooseStore={onChooseStore} />
      <h2>Edit Store</h2>
      <form>
        <label htmlFor="name">Name of Store:</label>
        <br />
        <input
          onChange={handleEditStoreChange}
          type="text"
          id="name"
          name="name"
          value={editStoreFormData.name}
        />
        <br />

        <input onClick={handleEdit} type="submit" value="Edit" />
        <br />
        <input onClick={handleDelete} type="submit" value="Delete" />
      </form>
    </div>
  );
}

export default EditPetStoreForm;
