import { html } from 'htm/react';
import React, { useState, useRef } from 'react';

const Brand = ({ brand, handleDeleteBrand, handleEditBrand }) => {
  const [edit, setEdit] = useState(false);
  const codeRef = useRef(null);
  const descriptionRef = useRef(null);

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
        url: `/brands/${brand.id}`,
        dataType: 'JSON',
        success: () => {
          handleDeleteBrand(brand);
        }
      });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      code: codeRef.current.value,
      description: descriptionRef.current.value
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: `/brands/${brand.id}`,
      dataType: 'JSON',
      data: { brand: data },
      success: (updatedBrand) => {
        setEdit(false);
        handleEditBrand(brand, updatedBrand);
      }
    });
  };

  const brandRow = () => html`
    <tr>
      <td>
        <a href=${`/brands/${brand.id}`}>${brand.code}</a>
      </td>
      <td>${brand.description}</td>
      <td>
        <button className="btn btn-mini" onClick=${handleToggle}>Edit</button>
        {' '}
        <button className="btn btn-mini btn-danger" onClick=${handleDelete}>Destroy</button>
      </td>
    </tr>
  `;

  const brandForm = () => html`
    <tr>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue=${brand.code}
          ref=${codeRef}
        />
      </td>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue=${brand.description}
          ref=${descriptionRef}
        />
      </td>
      <td>
        <button className="btn btn-mini btn-default" onClick=${handleEdit}>Update</button>
        <button className="btn btn-mini btn-danger" onClick=${handleToggle}>Cancel</button>
      </td>
    </tr>
  `;

  return edit ? brandForm() : brandRow();
};

export default Brand;
