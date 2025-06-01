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
  name: 'PaymentTypeForm',
  props: {
    handleNewPaymentType: Function,
  },
  setup(props) {
    const form = ref({
      code: '',
      description: '',
    });

    const handleSubmit = async () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch('/payment_types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ payment_type: form.value }),
      });

      if (response.ok) {
        const data = await response.json();
        props.handleNewPaymentType(data);
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
