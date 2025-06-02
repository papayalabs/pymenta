import React, { useState, useRef } from 'react';

const Category = ({ category, handleDeleteCategory, handleEditCategory }) => {
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
        url: `/categories/${category.id}`,
        dataType: 'JSON',
        success: () => {
          handleDeleteCategory(category);
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
      url: `/categories/${category.id}`,
      dataType: 'JSON',
      data: { category: data },
      success: (updatedCategory) => {
        setEdit(false);
        handleEditCategory(category, updatedCategory);
      }
    });
  };

  const categoryRow = () => (
    <tr>
      <td>
        <a href={`/categories/${category.id}`}>{category.code}</a>
      </td>
      <td>{category.description}</td>
      <td>
        <button className="btn btn-mini" onClick={handleToggle}>Edit</button>
        {' '}
        <button className="btn btn-mini btn-danger" onClick={handleDelete}>Destroy</button>
      </td>
    </tr>
  );

  const categoryForm = () => (
    <tr>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={category.code}
          ref={codeRef}
        />
      </td>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={category.description}
          ref={descriptionRef}
        />
      </td>
      <td>
        <button className="btn btn-mini btn-default" onClick={handleEdit}>Update</button>
        <button className="btn btn-mini btn-danger" onClick={handleToggle}>Cancel</button>
      </td>
    </tr>
  );

  return edit ? categoryForm() : categoryRow();
};

export default Category;
