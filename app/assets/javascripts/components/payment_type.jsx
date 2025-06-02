import React, { useState, useRef } from 'react';

const PaymentType = ({ payment_type, handleDeletePaymentType, handleEditPaymentType }) => {
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
        url: `/payment_types/${payment_type.id}`,
        dataType: 'JSON',
        success: () => {
          handleDeletePaymentType(payment_type);
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
      url: `/payment_types/${payment_type.id}`,
      dataType: 'JSON',
      data: { payment_type: data },
      success: (updatedPaymentType) => {
        setEdit(false);
        handleEditPaymentType(payment_type, updatedPaymentType);
      }
    });
  };

  const paymentTypeRow = () => (
    <tr>
      <td>
        <a href={`/payment_types/${payment_type.id}`}>{payment_type.code}</a>
      </td>
      <td>{payment_type.description}</td>
      <td>
        <button className="btn btn-mini" onClick={handleToggle}>Edit</button>
        {' '}
        <button className="btn btn-mini btn-danger" onClick={handleDelete}>Destroy</button>
      </td>
    </tr>
  );

  const paymentTypeForm = () => (
    <tr>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={payment_type.code}
          ref={codeRef}
        />
      </td>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={payment_type.description}
          ref={descriptionRef}
        />
      </td>
      <td>
        <button className="btn btn-mini btn-default" onClick={handleEdit}>Update</button>
        <button className="btn btn-mini btn-danger" onClick={handleToggle}>Cancel</button>
      </td>
    </tr>
  );

  return edit ? paymentTypeForm() : paymentTypeRow();
};

export default PaymentType;
