<template>
<div class="container">
  <div class="buttons">
    <b-button type="is-primary" expanded @click="warpToPile">
      View Pile
    </b-button>
  </div>
  <scanner :books.sync="books" :pile="true"/>
</div>
</template>

<script>
import Scanner from '@/components/Scanner.vue';
import { mapState } from 'vuex'

export default {
  name: 'PileScanner',
  components: { Scanner },
  data() {
    return {
      books: this.startingBooks
    }
  },
  watch: {
    books: function(value) {
      if(typeof(value) !== 'undefined') {
        const bookList = value.map(book => {
          return { isbn: book.isbn, title: book.title }
        });
        this.axios.put(`https://api.indybooks.net/v5/auth/pile/${this.$route.params.pile_id}`, {
          pile: {
            book_list: bookList
          }
        }, {
          headers: {
            'Authorization': localStorage.token
          }
        })
        .then(() => {
          this.$store.commit('pile/books', bookList);
        })
        .catch((err) => {
          console.error(err);
        })
      }
    }
  },
  beforeMount() {
    this.books = this.startingBooks;
  },
  computed: {
    ...mapState({
      startingBooks: state => state.pile.books
    }),
  },
  methods: {
    warpToPile: function() {
      this.$router.push({name: 'Pile', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id }});
    }
  }
}
</script>
