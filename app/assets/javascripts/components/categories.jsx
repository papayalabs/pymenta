import { html } from 'htm/react';
import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import Category from './Category';

const Categories = ({ data, page_header, form_data }) => {
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
    <div className="categories">
      <h1 className="title">${page_header}</h1>
      ${CategoryForm({ handleNewCategory: addItem, form_data })}
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) =>
            Category({
              key: item.id,
              category: item,
              handleDeleteCategory: deleteItem,
              handleEditCategory: updateItem,
              form_data
            })
          )}
        </tbody>
      </table>
    </div>
  `;
};

export default Categories;
