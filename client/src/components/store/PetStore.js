import React, { useState, useEffect } from "react";
import AddPetStoreForm from "./AddPetStoreForm";
import EditPetStoreForm from "./EditPetStoreForm";

function PetStore({
  stores,
  onFetchStores,
  onAddStore,
  onEditStore,
  onDeleteStore,
  onChooseStore,
  chosenStore,
}) {
  useEffect(() => {
    fetch("/pet_stores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onFetchStores(data);
      });
  }, []);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  function toggleAddstores() {
    setShowAdd(!showAdd);
  }

  function toggleEditstores() {
    setShowEdit(!showEdit);
  }

  return (
    <div>
      <h1>Stores</h1>
      <button onClick={toggleAddstores}>Add stores</button>
      <br />
      <br />
      <button onClick={toggleEditstores}>Edit stores</button>
      <br />
      {showAdd && <AddPetStoreForm onAddStore={onAddStore} />}
      {showAdd && showEdit && <hr />}
      {showEdit && (
        <EditPetStoreForm
          onEditStore={onEditStore}
          onDeleteStore={onDeleteStore}
          stores={stores}
          onChooseStore={onChooseStore}
          chosenStore={chosenStore}
        />
      )}
    </div>
  );
}

export default PetStore;
