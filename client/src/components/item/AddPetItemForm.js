import React, { useState } from "react";
import ChoosePetStoreDropdown from "../store/ChoosePetStoreDropDown";

function AddPetItemForm({ onAddItem, stores, onChooseStore, chosenStore }) {
  const [createItemFormData, setCreateItemFormData] = useState({
    name: "",
  });

  const handleCreateItemChange = (e) => {
    setCreateItemFormData({
      ...createItemFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = chosenStore.id;
    fetch(`/pet_stores/${id}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: createItemFormData["item_name"],
        Store_id: id,
      }),
    })
      .then((response) => response.json())
      .then((newItem) => {
        onAddItem(newItem);
      });
  };

  return (
    <div>
      <ChoosePetStoreDropdown stores={stores} onChooseStore={onChooseStore} />
      <h2>Add New Item</h2>
      <form>
        <label htmlFor="name">Name of Item:</label>
        <br />
        <input
          onChange={handleCreateItemChange}
          type="text"
          id="name"
          name="item_name"
        />
        <br />
        <input onClick={handleCreate} type="submit" />
      </form>
    </div>
  );
}

export default AddPetItemForm;
