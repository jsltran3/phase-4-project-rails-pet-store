import React from "react";

function ChoosePetStoreDropDown({ stores, onChooseStore }) {
  let storeOptionsArray = stores.map((store) => {
    return (
      <option key={store.id} value={store.name}>
        {store.name}
      </option>
    );
  });

  return (
    <>
      <h2>Choose store: </h2>
      <form>
        <label htmlFor="choose_store">Choose a store:</label>
        <br />
        <select name="choose_store" id="choose_store" onChange={onChooseStore}>
          <option disabled selected value>
            {" "}
            -- Select a store --{" "}
          </option>
          {storeOptionsArray}
        </select>
        <br />
      </form>
    </>
  );
}

export default ChoosePetStoreDropDown;
