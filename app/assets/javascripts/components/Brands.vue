<template>
  <div class="brands">
    <h1 class="title">{{ pageHeader }}</h1>
    <BrandForm :handleNewBrand="addItem" :formData="formData" />
    <hr />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Brand
          v-for="item in items"
          :key="item.id"
          :brand="item"
          :handleDeleteBrand="deleteItem"
          :handleEditBrand="updateItem"
          :formData="formData"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import BrandForm from './BrandForm.vue';
import Brand from './Brand.vue';

export default {
  name: 'Brands',
  components: { BrandForm, Brand },
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
