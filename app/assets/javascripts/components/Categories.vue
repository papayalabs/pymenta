<template>
  <div class="categories">
    <h1 class="title">{{ pageHeader }}</h1>
    <CategoryForm :handleNewCategory="addItem" :formData="formData" />
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
        <Category
          v-for="item in items"
          :key="item.id"
          :category="item"
          :handleDeleteCategory="deleteItem"
          :handleEditCategory="updateItem"
          :formData="formData"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import CategoryForm from './CategoryForm.vue';
import Category from './Category.vue';

export default {
  name: 'Categories',
  components: { CategoryForm, Category },
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
