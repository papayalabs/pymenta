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
      placeholder="Description"
      name="description"
      v-model="form.description"
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
  name: 'BrandForm',
  props: {
    handleNewBrand: Function,
  },
  setup(props) {
    const form = ref({
      code: '',
      description: '',
    });

    const handleSubmit = async () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch('/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ brand: form.value }),
      });

      if (response.ok) {
        const data = await response.json();
        props.handleNewBrand(data);
        form.value = { code: '', description: '' };
      }
    };

    const isValid = computed(() => form.value.code && form.value.description);

    return {
      form,
      handleSubmit,
      isValid,
    };
  },
};
</script>
