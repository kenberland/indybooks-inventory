<template>
<div style="width: 100%;">
  <p class="title is-4">Stock Information</p>
  <b-field label="Quantity" label-position="on-border">
    <b-field>
      <b-numberinput class="has-text-left" controls-alignment="right" v-model="localValue.quantity"/>
    </b-field>
  </b-field>
  <b-field label="Price" label-position="on-border">
    <b-currency-input v-model="localValue.price"/>
  </b-field>
  <b-field label="Delivery Time" label-position="on-border">
    <b-promise-select v-model="localValue.deliveryPromise"/>
  </b-field>
  <div class="buttons">
    <b-button type="is-primary" expanded v-on:click="submitStockInfo">Update</b-button>
  </div>
  <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="true"/>
</div>
</template>

<script>
import BCurrencyInput from '@/components/BCurrencyInput.vue';
import BPromiseSelect from '@/components/BPromiseSelect.vue';

export default {
  name: 'StockInfo',
  components: { BCurrencyInput, BPromiseSelect },
  props: {
    price: Number,
    quantity: Number,
    delivery_promise: String,
    store_id: String,
    isbn: String
  },
  data() {
    return {
      localValue: {
        price: null,
        quantity: 0,
        deliveryPromise: null,
      },
      isLoading: false
    }
  },
  watch: {
    price: function(value) {
      this.localValue.price = value;
    },
    quantity: function(value) {
      this.localValue.quantity = value;
    },
    delivery_promise: function(value) {
      this.localValue.deliveryPromise = value;
    }
  },
  methods: {
    openLoading: function() {
      this.isLoading = true;
    },
    closeLoading: function() {
      this.isLoading = false;
    },
    submitStockInfo: function() {
      this.openLoading();
      if(localStorage.token) {
        this.axios.put(`https://api.indybooks.net/v5/auth/inventory/stores/${this.store_id}/isbn/${this.isbn}`,
        {
          book: {
            ask: this.localValue.price,
            quantity: this.localValue.quantity,
            delivery_promise: this.localValue.deliveryPromise,
          }
        },
        {
          headers: {
            'Authorization': localStorage.token
          }
        })
        .then(() => {
          this.closeLoading();
        })
      }
    }
  }
}
</script>
