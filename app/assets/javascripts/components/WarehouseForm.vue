<template>
  <form class="form-inline" @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="Code"
      name="code"
      v-model="form.code"
    />
    <input
      type="text"
      placeholder="Name"
      name="name"
      v-model="form.name"
    />
    <input
      type="text"
      placeholder="City"
      name="city"
      v-model="form.city"
    />
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
  name: 'WarehouseForm',
  props: {
    handleNewWarehouse: Function,
  },
  setup(props) {
    const form = ref({
      code: '',
      name: '',
      city: '',
    });

    const handleSubmit = async () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch('/warehouses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ warehouse: form.value }),
      });

      if (response.ok) {
        const data = await response.json();
        props.handleNewWarehouse(data);
        form.value = { code: '', name: '', city: '' };
      }
    };

    const isValid = computed(() => form.value.code && form.value.name);

    return {
      form,
      handleSubmit,
      isValid,
    };
  },
};
</script>
