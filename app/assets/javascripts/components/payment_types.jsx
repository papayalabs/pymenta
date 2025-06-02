import { html } from 'htm/react';
import React, { useState } from 'react';
import PaymentTypeForm from './PaymentTypeForm';
import PaymentType from './PaymentType';

const PaymentTypes = ({ data, page_header, form_data }) => {
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
    <div className="payment_types">
      <h1 className="title">${page_header}</h1>
      ${PaymentTypeForm({ handleNewPaymentType: addItem, form_data })}
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
            PaymentType({
              key: item.id,
              payment_type: item,
              handleDeletePaymentType: deleteItem,
              handleEditPaymentType: updateItem,
              form_data
            })
          )}
        </tbody>
      </table>
    </div>
  `;
};

export default PaymentTypes;
