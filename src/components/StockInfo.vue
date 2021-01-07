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
  <div class="buttons" v-if="pile">
    <b-button type="is-primary" expanded @click="updateStockInfo">Update and Next</b-button>
  </div>
  <div class="buttons" v-else>
    <b-button type="is-primary" expanded @click="updateStockInfo">Update</b-button>
  </div>
  <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="true"/>
</div>
</template>

<script>
import BCurrencyInput from '@/components/BCurrencyInput.vue';
import BPromiseSelect from '@/components/BPromiseSelect.vue';
import { mapState } from 'vuex'

export default {
  name: 'StockInfo',
  components: { BCurrencyInput, BPromiseSelect },
  props: {
    price: Number,
    quantity: Number,
    delivery_promise: String,
    isbn: String,
    pile: {
      type: Boolean,
      default: false
    }
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
  computed: {
    ...mapState({
      books: state => state.pile.books,
      store_id: state => state.store.uuid
    }),
  },
  methods: {
    openLoading: function() {
      this.isLoading = true;
    },
    closeLoading: function() {
      this.isLoading = false;
    },
    toast: function(success) {
      if(success) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Book updated successfully.`,
          position: 'is-bottom',
        })
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Error updating book.`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    goToNextBook: function() {
      const index = this.books.findIndex(book => book.isbn === this.isbn);
      if(this.books[index+1]) {
        const book = this.books.find(book => book.isbn === this.books[index + 1].isbn);
        this.$router.push({name: 'PileBook', params: { store_id: this.store_id, pile: this.$route.params.pile_id, isbn: book.isbn }});
      } else {
        this.$router.push({name: 'Pile', params: { store_id: this.store_id, pile: this.$route.params.pile_id }});
      }
    },
    updateStockInfo: function() {
      this.openLoading();
      if(localStorage.token) {
        console.log(this.store_id);
        this.axios.put(`https://api.indybooks.net/v5/auth/inventory/stores/${this.store_id}/isbn/${this.isbn}`, {
          book: {
            ask: this.localValue.price,
            quantity: this.localValue.quantity,
            delivery_promise: this.localValue.deliveryPromise,
          }
        }, {
          headers: {
            'Authorization': localStorage.token
          }
        })
        .then(() => {
          if(this.pile) {
            this.goToNextBook();
          }
          this.toast(true);
          this.closeLoading();
        })
        .catch(() => {
          if(this.pile) {
            this.goToNextBook();
          }
          this.toast(false);
          this.closeLoading();
        })
      }
    }
  }
}
</script>
