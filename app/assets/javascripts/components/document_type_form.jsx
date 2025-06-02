import React, { useState } from 'react';

const DocumentTypeForm = ({ handleNewDocumentType, form_data }) => {
  const [formState, setFormState] = useState({
    description: '',
    account_type: '',
    stock_type: '',
    stock: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/document_types', { document_type: formState }, (data) => {
      handleNewDocumentType(data);
      setFormState({ description: '', account_type: '', stock_type: '', stock: false });
    }, 'JSON');
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isValid = () => formState.description && formState.account_type && formState.stock_type;

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={formState.description}
        onChange={handleChange}
      />
      <select
        name="account_type"
        value={formState.account_type}
        onChange={handleChange}
      >
        <option value="">{form_data.select_prompt}</option>
        {form_data.account_types.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <select
        name="stock_type"
        value={formState.stock_type}
        onChange={handleChange}
      >
        <option value="">{form_data.select_prompt}</option>
        {form_data.stock_types.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {' '}
      <label className="checkbox">
        <input
          type="checkbox"
          name="stock"
          checked={formState.stock}
          onChange={handleChange}
        />
        Stock
      </label>
      {' '}
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

export default DocumentTypeForm;
