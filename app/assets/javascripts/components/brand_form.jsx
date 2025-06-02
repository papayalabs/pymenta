import React, { useState } from 'react';

const BrandForm = ({ handleNewBrand }) => {
  const [formState, setFormState] = useState({
    code: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/brands', { brand: formState }, (data) => {
      handleNewBrand(data);
      setFormState({ code: '', description: '' });
    }, 'JSON');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValid = () => formState.code && formState.description;

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
        placeholder="Description"
        name="description"
        value={formState.description}
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

export default BrandForm;
