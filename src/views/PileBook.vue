><template>
<div class="container">
  <b-progress :value="bookSpot()" :max="books.length" size="is-medium" show-value>
    {{ bookSpot() }} / {{ books.length }}
  </b-progress>
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
</div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import StockInfo from '@/components/StockInfo.vue';

export default {
  name: 'Book',
  components: { BookCard, StockInfo },
  data() {
    return {
      book: {},
      books: [],
      stock: { pile: true },
      store_id: null,
      isbn: null
    }
  },
  watch: {
    $route(to) {
      this.store_id = to.params.store_id;
      this.isbn = to.params.isbn;
      this.updateBook();
    }
  },
  beforeMount: function() {
    this.books = [
      { 'isbn': '1400032717', 'title': 'The Curious Incident of the Dog in the Night-Time', 'binding': 'Paperback' },
      { 'isbn': '0440330076', 'title': 'Go Tell It on the Mountain', 'binding': 'Mass Market Paperback' },
    ]
  },
  methods: {
    updateBook: function() {
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
          this.stock.pile = true;
        })
      }
    },
    bookSpot: function() {
      const index = this.books.findIndex(book => book.isbn === this.isbn);
      return index + 1;
    },
  },
  mounted: function() {
    this.store_id = this.$route.params.store_id;
    this.isbn = this.$route.params.isbn;
    this.updateBook();
  },
}
</script>

<style>
.b-numberinput.has-text-left input[type=number] {
    text-align: left;
}
</style>
