<template>
  <div class="payment_types">
    <h1 class="title">{{ pageHeader }}</h1>
    <PaymentTypeForm :handleNewPaymentType="addItem" :formData="formData" />
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
        <PaymentType
          v-for="item in items"
          :key="item.id"
          :paymentType="item"
          :handleDeletePaymentType="deleteItem"
          :handleEditPaymentType="updateItem"
          :formData="formData"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import PaymentTypeForm from './PaymentTypeForm.vue';
import PaymentType from './PaymentType.vue';

export default {
  name: 'PaymentTypes',
  components: { PaymentTypeForm, PaymentType },
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
