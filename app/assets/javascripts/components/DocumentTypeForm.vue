<template>
  <form class="form-inline" @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="Description"
      name="description"
      v-model="form.description"
    />
    <select
      name="account_type"
      v-model="form.account_type"
    >
      <option value="">{{ formData.select_prompt }}</option>
      <option v-for="option in formData.account_types" :value="option">
        {{ option }}
      </option>
    </select>
    <select
      name="stock_type"
      v-model="form.stock_type"
    >
      <option value="">{{ formData.select_prompt }}</option>
      <option v-for="option in formData.stock_types" :value="option">
        {{ option }}
      </option>
    </select>
    <label class="checkbox">
      <input
        type="checkbox"
        name="stock"
        v-model="form.stock"
      />
      Stock
    </label>
    <button
      type="submit"
      class="btn btn-primary"
      :disabled="!isValid"
    >
      Create
    </button>
  </form>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'DocumentTypeForm',
  props: {
    handleNewDocumentType: Function,
    formData: Object,
  },
  setup(props) {
    const form = ref({
      description: '',
      account_type: '',
      stock_type: '',
      stock: false,
    });

    const handleSubmit = async () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch('/document_types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ document_type: form.value }),
      });

      if (response.ok) {
        const data = await response.json();
        props.handleNewDocumentType(data);
        form.value = {
          description: '',
          account_type: '',
          stock_type: '',
          stock: false,
        };
      }
    };
    const isValid = computed(
      () => form.value.description && form.value.account_type && form.value.stock_type
    );

    return {
      form,
      handleSubmit,
      isValid,
    };
  },
};
</script>
