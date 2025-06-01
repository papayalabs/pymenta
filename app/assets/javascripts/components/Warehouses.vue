<template>
  <div class="warehouses">
    <h1 class="title">{{ pageHeader }}</h1>
    <WarehouseForm :handleNewWarehouse="addItem" :formData="formData" />
    <hr />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Warehouse
          v-for="item in items"
          :key="item.id"
          :warehouse="item"
          :handleDeleteWarehouse="deleteItem"
          :handleEditWarehouse="updateItem"
          :formData="formData"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import WarehouseForm from './WarehouseForm.vue';
import Warehouse from './Warehouse.vue';

export default {
  name: 'Warehouses',
  components: { WarehouseForm, Warehouse },
  props: {
    data: Array,
    pageHeader: String,
    formData: Object,
  },
  setup(props) {
    const items = ref(props.data);

    const addItem = (item) => {
      items.value.push(item);
    };

    const deleteItem = (item) => {
      const index = items.value.indexOf(item);
      if (index > -1) {
        items.value.splice(index, 1);
      }
    };

    const updateItem = (item, data) => {
      const index = items.value.indexOf(item);
      if (index > -1) {
        items.value.splice(index, 1, data);
      }
    };

    return {
      items,
      addItem,
      deleteItem,
      updateItem,
    };
  },
};
</script>
