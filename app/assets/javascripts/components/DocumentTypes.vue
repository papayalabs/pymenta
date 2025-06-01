<template>
  <div class="document-types">
    <h1 class="title">{{ pageHeader }}</h1>
    <DocumentTypeForm :handleNewDocumentType="addDocumentType" :formData="formData" />
    <hr />
    <table class="table table-striped">
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
        <DocumentType
          v-for="documentType in documentTypes"
          :key="documentType.id"
          :documentType="documentType"
          :handleDeleteDocumentType="deleteDocumentType"
          :handleEditDocumentType="updateDocumentType"
          :formData="formData"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import DocumentTypeForm from './DocumentTypeForm.vue';
import DocumentType from './DocumentType.vue';

export default {
  name: 'DocumentTypes',
  components: { DocumentTypeForm, DocumentType },
  props: {
    data: Array,
    pageHeader: String,
    formData: Object,
  },
  setup(props) {
    const documentTypes = ref(props.data);

    const addDocumentType = (documentType) => {
      documentTypes.value.push(documentType);
    };

    const deleteDocumentType = (documentType) => {
      const index = documentTypes.value.indexOf(documentType);
      if (index > -1) {
        documentTypes.value.splice(index, 1);
      }
    };

    const updateDocumentType = (documentType, data) => {
      const index = documentTypes.value.indexOf(documentType);
      if (index > -1) {
        documentTypes.value.splice(index, 1, data);
      }
    };

    return {
      documentTypes,
      addDocumentType,
      deleteDocumentType,
      updateDocumentType,
    };
  },
};
</script>
