<template>
<section class="section">
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-4">
        <book-card
          v-bind:image="book.image"
          v-bind:title="book.title"
          v-bind:authors="book.authors"
          v-bind:publisher="book.publisher"
          v-bind:publish_date="book.publish_date"
          v-bind:binding="book.binding"
          v-bind:isbn="book.isbn13"
          />
      </div>
      <div class="tile is-8">
        <div class="box" style="width: 100%;">
          <p class="title is-4">Stock Information</p>
          <b-field label="Quantity" label-position="on-border">
            <b-field>
              <b-numberinput class="has-text-left" controls-alignment="right" v-model="quantity"></b-numberinput>
            </b-field>
          </b-field>
          <b-field label="Price" label-position="on-border">
            <b-currency-input v-model="ask"/>
          </b-field>
          <b-promise-select v-model="delivery_promise"/>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import BCurrencyInput from '@/components/BCurrencyInput.vue';
import BPromiseSelect from '@/components/BPromiseSelect.vue';

export default {
  name: 'Book',
  components: { BookCard, BCurrencyInput, BPromiseSelect },
  data() {
    const book = {};
    const isbn = null;
    const store_id = null;
    const delivery_promise = null;
    const ask = null;
    const quantity = null;
    return {
      book,
      isbn,
      store_id,
      delivery_promise,
      quantity,
      ask
    }
  },
  beforeMount: function() {
    this.store_id = this.$route.params.store_id;
    this.isbn = this.$route.params.isbn;
    if(localStorage.token) {
      this.axios.get(`https://api.indybooks.net/v5/auth/inventory/stores/${this.store_id}/isbn/${this.isbn}`, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.book = response.data.book;
        this.delivery_promise = response.data.delivery_promise;
        this.ask = response.data.ask;
        this.quantity = response.data.quantity;
        console.log(response.data);
      })
    }
  }
}
</script>

<style>
.b-numberinput.has-text-left input[type=number] {
    text-align: left;
}
</style>
