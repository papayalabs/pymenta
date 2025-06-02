import React, { useState } from 'react';

const WarehouseForm = ({ handleNewWarehouse }) => {
  const [formState, setFormState] = useState({
    code: '',
    name: '',
    city: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/warehouses', { warehouse: formState }, (data) => {
      handleNewWarehouse(data);
      setFormState({ code: '', name: '', city: '' });
    }, 'JSON');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValid = () => formState.code && formState.name;

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Code"
        name="code"
        value={formState.code}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={formState.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="City"
        name="city"
        value={formState.city}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isValid()}
      >
        Create
      </button>
    </form>
  );
};

export default WarehouseForm;
