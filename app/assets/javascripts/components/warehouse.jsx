import React, { useState, useRef } from 'react';

const Warehouse = ({ warehouse, handleDeleteWarehouse, handleEditWarehouse }) => {
  const [edit, setEdit] = useState(false);
  const codeRef = useRef(null);
  const nameRef = useRef(null);
  const cityRef = useRef(null);

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
        url: `/warehouses/${warehouse.id}`,
        dataType: 'JSON',
        success: () => {
          handleDeleteWarehouse(warehouse);
        }
      });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      code: codeRef.current.value,
      name: nameRef.current.value,
      city: cityRef.current.value
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: `/warehouses/${warehouse.id}`,
      dataType: 'JSON',
      data: { warehouse: data },
      success: (updatedWarehouse) => {
        setEdit(false);
        handleEditWarehouse(warehouse, updatedWarehouse);
      }
    });
  };

  const warehouseRow = () => (
    <tr>
      <td>
        <a href={`/warehouses/${warehouse.id}`}>{warehouse.code}</a>
      </td>
      <td>{warehouse.name}</td>
      <td>{warehouse.city}</td>
      <td>
        <button className="btn btn-mini" onClick={handleToggle}>Edit</button>
        {' '}
        <button className="btn btn-mini btn-danger" onClick={handleDelete}>Destroy</button>
      </td>
    </tr>
  );

  const warehouseForm = () => (
    <tr>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={warehouse.code}
          ref={codeRef}
        />
      </td>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={warehouse.name}
          ref={nameRef}
        />
      </td>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={warehouse.city}
          ref={cityRef}
        />
      </td>
      <td>
        <button className="btn btn-mini btn-default" onClick={handleEdit}>Update</button>
        <button className="btn btn-mini btn-danger" onClick={handleToggle}>Cancel</button>
      </td>
    </tr>
  );

  return edit ? warehouseForm() : warehouseRow();
};

export default Warehouse;
