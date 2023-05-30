import React, { useState } from "react";
import swal from "sweetalert";

function AddPetStoreForm({ onAddStore }) {
  const [createStoreFormData, setCreateStoreFormData] = useState({
    name: "",
  });

  const handleCreateStoreChange = (e) => {
    setCreateStoreFormData({
      ...createStoreFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateStoreFormSubmit = (e) => {
    e.preventDefault();
    fetch("/pet_stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: createStoreFormData["name"],
      }),
    })
      .then((response) => response.json())
      .then((newStore) => {
        onAddStore(newStore);
        swal("New Store created!");
      });
  };

  return (
    <div>
      <h2>Add New Store</h2>
      <form onSubmit={handleCreateStoreFormSubmit}>
        <label htmlFor="name">Name of Store:</label>
        <br />
        <input
          onChange={handleCreateStoreChange}
          type="text"
          id="name"
          name="name"
        />
        <br />
        <br />

        <br />
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddPetStoreForm;
