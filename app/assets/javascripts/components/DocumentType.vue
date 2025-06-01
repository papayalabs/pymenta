<template>
  <tr v-if="edit">
    <td>
      <input
        class="form-control"
        type="text"
        v-model="form.description"
      />
    </td>
    <td>
      <select v-model="form.account_type">
        <option value="">{{ formData.select_prompt }}</option>
        <option v-for="option in formData.account_types" :value="option">
          {{ option }}
        </option>
      </select>
    </td>
    <td>
      <select v-model="form.stock_type">
        <option value="">{{ formData.select_prompt }}</option>
        <option v-for="option in formData.stock_types" :value="option">
          {{ option }}
        </option>
      </select>
    </td>
    <td>
      <input
        type="checkbox"
        v-model="form.stock"
      />
    </td>
    <td>
      <button
        class="btn btn-mini btn-default"
        @click="handleEdit"
      >
        Update
      </button>
      <button
        class="btn btn-mini btn-danger"
        @click="toggleEdit"
      >
        Cancel
      </button>
    </td>
  </tr>
  <tr v-else>
    <td>
      <a :href="`/document_types/${documentType.id}`">{{ documentType.description }}</a>
    </td>
    <td>{{ documentType.account_type }}</td>
    <td>{{ documentType.stock_type }}</td>
    <td>{{ documentType.stock ? 'Yes' : 'No' }}</td>
    <td>
      <button
        class="btn btn-mini"
        @click="toggleEdit"
      >
        Edit
      </button>
      <button
        class="btn btn-mini btn-danger"
        @click="handleDelete"
      >
        Destroy
      </button>
    </td>
  </tr>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'DocumentType',
  props: {
    documentType: Object,
    handleDeleteDocumentType: Function,
    handleEditDocumentType: Function,
    formData: Object,
  },
  setup(props) {
    const edit = ref(false);
    const form = ref({
      description: props.documentType.description,
      account_type: props.documentType.account_type,
      stock_type: props.documentType.stock_type,
      stock: props.documentType.stock,
    });

    const toggleEdit = () => {
      edit.value = !edit.value;
    };

    const handleDelete = async () => {
      if (confirm('Are you sure?')) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const response = await fetch(`/document_types/${props.documentType.id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        });

        if (response.ok) {
          props.handleDeleteDocumentType(props.documentType);
        }
      }
    };

    const handleEdit = async () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch(`/document_types/${props.documentType.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ document_type: form.value }),
      });

      if (response.ok) {
        const data = await response.json();
        props.handleEditDocumentType(props.documentType, data);
        edit.value = false;
      }
    };

    return {
      edit,
      form,
      toggleEdit,
      handleDelete,
      handleEdit,
    };
  },
};
</script>
