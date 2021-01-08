<template>
<div style="width: 100%;">
  <p class="title is-4">Stock Information</p>
  <b-field label="Quantity" label-position="on-border">
    <b-field>
      <template v-if="loading">
        <b-numberinput class="has-text-left" controls-alignment="right" loading/>
      </template>
      <template v-else>
        <b-numberinput class="has-text-left" min="0" controls-alignment="right" v-model="localValue.quantity"/>
      </template>
    </b-field>
  </b-field>
  <b-field label="Price" label-position="on-border">
    <template v-if="loading">
      <b-numberinput loading :controls="false"/>
    </template>
    <template v-else>
      <b-currency-input v-model="localValue.price"/>
    </template>
  </b-field>
  <b-field label="Delivery Time" label-position="on-border">
    <template v-if="loading">
      <b-select placeholder="Select Delivery Time" icon="truck-fast" expanded loading/>
    </template>
    <template v-else>
      <b-promise-select v-model="localValue.deliveryPromise"/>
    </template>
  </b-field>
  <div class="buttons" v-if="pile">
    <b-button type="is-primary" expanded @click="updateStockInfo">Update and Next</b-button>
  </div>
  <div class="buttons" v-else>
    <b-button type="is-primary" expanded @click="updateStockInfo">Update</b-button>
  </div>
  <b-loading :is-full-page="false" v-model="updating" :can-cancel="true"/>
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
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      localValue: {
        price: null,
        quantity: 0,
        deliveryPromise: null,
      },
      updating: false
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
    openUpdating: function() {
      this.updating = true;
    },
    closeUpdating: function() {
      this.updating = false;
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
      this.openUpdating();
      if(localStorage.token) {
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
          this.closeUpdating();
        })
        .catch(() => {
          if(this.pile) {
            this.goToNextBook();
          }
          this.toast(false);
          this.closeUpdating();
        })
      }
    }
  }
}
</script>
