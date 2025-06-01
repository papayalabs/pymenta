<template>
  <tr v-if="edit">
    <td>
      <input
        class="form-control"
        type="text"
        v-model="form.code"
      />
    </td>
    <td>
      <input
        class="form-control"
        type="text"
        v-model="form.description"
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
      <a :href="`/categories/${category.id}`">{{ category.code }}</a>
    </td>
    <td>{{ category.description }}</td>
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
  name: 'Category',
  props: {
    category: Object,
    handleDeleteCategory: Function,
    handleEditCategory: Function,
  },
  setup(props) {
    const edit = ref(false);
    const form = ref({
      code: props.category.code,
      description: props.category.description,
    });

    const toggleEdit = () => {
      edit.value = !edit.value;
    };

    const handleDelete = async () => {
      if (confirm('Are you sure?')) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const response = await fetch(`/categories/${props.category.id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        });

        if (response.ok) {
          props.handleDeleteCategory(props.category);
        }
      }
    };

    const handleEdit = async () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch(`/categories/${props.category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ category: form.value }),
      });

      if (response.ok) {
        const data = await response.json();
        props.handleEditCategory(props.category, data);
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
