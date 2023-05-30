import React, { useState, useEffect } from "react";
import AddPetStoreForm from "./AddPetStoreForm";
import EditPettoreForm from "./EditPetStoreForm";

function PetStore({
  stores,
  onFetchstores,
  onAddStore,
  onEditStore,
  onDeleteStore,
  onChooseStore,
  chosenStore,
}) {
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

  function toggleAddstores() {
    setShowAdd(!showAdd);
  }

  function toggleEditstores() {
    setShowEdit(!showEdit);
  }

  return (
    <div>
      <h1>stores</h1>
      <button onClick={toggleAddstores}>Add stores</button>
      <br />
      <br />
      <button onClick={toggleEditstores}>Edit stores</button>
      <br />
      {showAdd && <AddStoreForm onAddStore={onAddStore} />}
      {showAdd && showEdit && <hr />}
      {showEdit && (
        <EditStoreForm
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
