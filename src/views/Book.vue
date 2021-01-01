<template>
<section class="section">
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="box tile is-child">
          <book-card v-bind="book"/>
        </article>
      </div>
      <div class="tile is-parent is-8">
        <article class="box tile is-child">
          <stock-info v-bind="stock"/>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <scanner v-bind:store_id="this.store_id"/>
        </article>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import StockInfo from '@/components/StockInfo.vue';
import Scanner from '@/components/Scanner.vue';

export default {
  name: 'Book',
  components: { BookCard, StockInfo, Scanner },
  data() {
    const book = {};
    const stock = {};
    return {
      book,
      stock,
      store_id: null,
      isbn: null
    }
  },
  created: function() {
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
        this.stock.price = response.data.price;
        this.stock.quantity = response.data.quantity;
        this.stock.delivery_promise = response.data.delivery_promise;
        this.stock.store_id = this.store_id;
        this.stock.isbn = this.isbn;
        console.log(response);
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
