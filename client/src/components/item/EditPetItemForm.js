import React, { useState, useEffect } from "react";
import ChooseStoreDropdown from "../store/ChoosePetStoreDropDown";
import swal from "sweetalert";

function EditPetItemForm({
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
}) {
  const [editItemFormData, setEditItemFormData] = useState({
    item_name: "",
  });

  function handleChooseItem(e) {
    let mapMatch = itemOptions.find((item) => {
      return item.props.value === e.target.value;
    });

    let itemMatch = mapMatch.props.value;

    setEditItemFormData({ item_name: itemMatch });

    let chosenStoreItemsMatch = chosenStore.items.find(
      (item) => item.name === itemMatch
    );

    let chosenItemIndex = chosenStore.items
      .map((item) => item.name)
      .indexOf(itemMatch);

    let chosenItemId = chosenStoreItemsMatch.id;
    onChangeItemInfo(chosenItemId, chosenItemIndex);
  }

  const handleEditItemChange = (e) => {
    setEditItemFormData({
      ...editItemFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const StoreId = chosenStore.id;

    fetch(`/stores/${StoreId}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: editItemFormData["item_name"],
        Store_id: StoreId,
      }),
    })
      .then((response) => response.json())
      .then((editedItem) => {
        onEditItem(editedItem);
        swal("Item edited!");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const StoreId = chosenStore.id;

    fetch(`/stores/${StoreId}/items/${itemId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        onDeleteItem(response, itemId);
        swal("Item deleted!");
      }
    });
  };

  return (
    <div>
      <ChooseStoreDropdown stores={stores} onChooseStore={onChooseStore} />
      <h2>Edit Item</h2>
      <form>
        <label htmlFor="item_select">Choose an Item:</label>
        <br />
        <select name="item_select" id="item_select" onChange={handleChooseItem}>
          <option disabled selected value>
            {" "}
            -- Select an item --{" "}
          </option>
          {itemOptions}
        </select>
        <br />
        <br />
        <label htmlFor="name">Name of Item:</label>
        <br />
        <input
          onChange={handleEditItemChange}
          type="text"
          id="name"
          name="item_name"
          value={editItemFormData.item_name}
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

export default EditPetItemForm;
