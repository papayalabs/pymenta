import React, { useState, useRef } from 'react';

const DocumentType = ({ document_type, handleDeleteDocumentType, handleEditDocumentType, form_data }) => {
  const [edit, setEdit] = useState(false);
  const descriptionRef = useRef(null);
  const accountTypeRef = useRef(null);
  const stockTypeRef = useRef(null);
  const stockRef = useRef(null);

  const handleToggle = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handleDelete = (e) => {
    if (confirm("Are you sure?")) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        method: 'DELETE',
        url: `/document_types/${document_type.id}`,
        dataType: 'JSON',
        success: () => {
          handleDeleteDocumentType(document_type);
        }
      });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      description: descriptionRef.current.value,
      account_type: accountTypeRef.current.value,
      stock_type: stockTypeRef.current.value,
      stock: stockRef.current.checked
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: `/document_types/${document_type.id}`,
      dataType: 'JSON',
      data: { document_type: data },
      success: (updatedDocumentType) => {
        setEdit(false);
        handleEditDocumentType(document_type, updatedDocumentType);
      }
    });
  };

  const documentTypeRow = () => (
    <tr>
      <td>
        <a href={`/document_types/${document_type.id}`}>{document_type.description}</a>
      </td>
      <td>{document_type.account_type}</td>
      <td>{document_type.stock_type}</td>
      <td>{document_type.stock ? 'Yes' : 'No'}</td>
      <td>
        <button className="btn btn-mini" onClick={handleToggle}>Edit</button>
        {' '}
        <button className="btn btn-mini btn-danger" onClick={handleDelete}>Destroy</button>
      </td>
    </tr>
  );

  const documentTypeForm = () => (
    <tr>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={document_type.description}
          ref={descriptionRef}
        />
      </td>
      <td>
        <select
          defaultValue={document_type.account_type}
          ref={accountTypeRef}
        >
          <option value="">{form_data.select_prompt}</option>
          {form_data.account_types.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </td>
      <td>
        <select
          defaultValue={document_type.stock_type}
          ref={stockTypeRef}
        >
          <option value="">{form_data.select_prompt}</option>
          {form_data.stock_types.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={document_type.stock}
          ref={stockRef}
        />
      </td>
      <td>
        <button className="btn btn-mini btn-default" onClick={handleEdit}>Update</button>
        <button className="btn btn-mini btn-danger" onClick={handleToggle}>Cancel</button>
      </td>
    </tr>
  );

  return edit ? documentTypeForm() : documentTypeRow();
};

export default DocumentType;
