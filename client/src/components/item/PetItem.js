import React, { useState, useEffect } from "react";
import AddPetItemForm from "./AddPetItemForm";
import EditPetItemForm from "./EditPetItemForm";

function PetItem({
  onAddItem,
  itemOptions,
  setItemOptions,
  itemId,
  setItemId,
  onChangeItemInfo,
  onEditItem,
  onDeleteItem,
  stores,
  onChooseStore,
  chosenStore,
  onFetchStores,
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

  function toggleAddItems() {
    setShowAdd(!showAdd);
  }

  function toggleEditItems() {
    setShowEdit(!showEdit);
  }
  return (
    <div>
      <h1>Items</h1>
      <button onClick={toggleAddItems}>Add Items</button>
      <br />
      <br />
      <button onClick={toggleEditItems}>Edit Items</button>
      <br />
      {showAdd && (
        <AddPetItemForm
          onAddItem={onAddItem}
          stores={stores}
          onChooseStore={onChooseStore}
          chosenStore={chosenStore}
        />
      )}
      {showAdd && showEdit && <hr />}
      {showEdit && (
        <EditPetItemForm
          itemOptions={itemOptions}
          setItemOptions={setItemOptions}
          itemId={itemId}
          setItemId={setItemId}
          onChangeItemInfo={onChangeItemInfo}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
          stores={stores}
          onChooseStore={onChooseStore}
          chosenStore={chosenStore}
        />
      )}
    </div>
  );
}

export default PetItem;
