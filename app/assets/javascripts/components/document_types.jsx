import { html } from 'htm/react';
import React, { useState } from 'react';
import DocumentTypeForm from './DocumentTypeForm';
import DocumentType from './DocumentType';

const DocumentTypes = ({ data, page_header, form_data }) => {
  const [documentTypes, setDocumentTypes] = useState(data || []);

  const addDocumentType = (documentType) => {
    setDocumentTypes((prevDocumentTypes) => [...prevDocumentTypes, documentType]);
  };

  const deleteDocumentType = (documentType) => {
    setDocumentTypes((prevDocumentTypes) =>
      prevDocumentTypes.filter((dt) => dt !== documentType)
    );
  };

  const updateDocumentType = (documentType, updatedData) => {
    setDocumentTypes((prevDocumentTypes) =>
      prevDocumentTypes.map((dt) => (dt === documentType ? updatedData : dt))
    );
  };

  return html`
    <div className="document-types">
      <h1 className="title">${page_header}</h1>
      ${DocumentTypeForm({ handleNewDocumentType: addDocumentType, form_data })}
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Account Type</th>
            <th>Stock Type</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${documentTypes.map((documentType) =>
            DocumentType({
              key: documentType.id,
              document_type: documentType,
              handleDeleteDocumentType: deleteDocumentType,
              handleEditDocumentType: updateDocumentType,
              form_data
            })
          )}
        </tbody>
      </table>
    </div>
  `;
};

export default DocumentTypes;
