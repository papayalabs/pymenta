import { html } from 'htm/react';
import React, { useState } from 'react';
import WarehouseForm from './WarehouseForm';
import Warehouse from './Warehouse';

const Warehouses = ({ data, page_header, form_data }) => {
  const [items, setItems] = useState(data || []);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const deleteItem = (item) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const updateItem = (item, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((i) => (i === item ? updatedData : i))
    );
  };

  return html`
    <div className="warehouses">
      <h1 className="title">${page_header}</h1>
      ${WarehouseForm({ handleNewWarehouse: addItem, form_data })}
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) =>
            Warehouse({
              key: item.id,
              warehouse: item,
              handleDeleteWarehouse: deleteItem,
              handleEditWarehouse: updateItem,
              form_data
            })
          )}
        </tbody>
      </table>
    </div>
  `;
};

export default Warehouses;
