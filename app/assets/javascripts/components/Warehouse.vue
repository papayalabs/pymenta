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
        v-model="form.name"
      />
    </td>
    <td>
      <input
        class="form-control"
        type="text"
        v-model="form.city"
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
      <a :href="`/warehouses/${warehouse.id}`">{{ warehouse.code }}</a>
    </td>
    <td>{{ warehouse.name }}</td>
    <td>{{ warehouse.city }}</td>
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
  name: 'Warehouse',
  props: {
    warehouse: Object,
    handleDeleteWarehouse: Function,
    handleEditWarehouse: Function,
  },
  setup(props) {
    const edit = ref(false);
    const form = ref({
      code: props.warehouse.code,
      name: props.warehouse.name,
      city: props.warehouse.city,
    });

    const toggleEdit = () => {
      edit.value = !edit.value;
    };

    const handleDelete = async () => {
      if (confirm('Are you sure?')) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const response = await fetch(`/warehouses/${props.warehouse.id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        });

        if (response.ok) {
          props.handleDeleteWarehouse(props.warehouse);
        }
      }
    };

    const handleEdit = async () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch(`/warehouses/${props.warehouse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ warehouse: form.value }),
      });

      if (response.ok) {
        const data = await response.json();
        props.handleEditWarehouse(props.warehouse, data);
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
