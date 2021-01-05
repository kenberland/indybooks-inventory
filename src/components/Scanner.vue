<template>
<div class="tile is-parent box">
  <article class="tile is-child is-4 pr-3">
    <v-quagga :onDetected="updatePreview" :readerSize="readerSize" :aspectRatio="aspectRatio" :readerTypes="['ean_reader']"/>
  </article>
  <div class="tile is-child is-8 pl-3">
    <book-card v-bind="book"/>
  </div>
</div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';

export default {
  name: 'Scanner',
  components: { BookCard },
  props: {
    store_id: String,
    pile: {
      type: Boolean,
      default: false
    },
    books: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      readerSize: {
        width: 285,
        height: 285
      },
      aspectRatio: { min: 1, max: 1 },
      book: {},
      preview: !this.pile
    }
  },
  methods: {
    addToPile: function() {
      var returnBooks = this.books;
      const foundBook = this.books.find(searchBook => searchBook.isbn === this.book.isbn);
      if(typeof(foundBook) === 'undefined') {
        returnBooks.push({'isbn': this.book.isbn, 'title': this.book.title, 'binding': this.book.binding});
        this.$emit('update:books', returnBooks);
        this.$buefy.toast.open({
          duration: 2000,
          message: `Added ISBN: <b>${this.book.isbn}</b> to pile`,
          position: 'is-bottom',
        });
      }
    },
    updatePreview: function(data) {
      const isbn = data.codeResult.code;
      if(localStorage.token) {
        this.axios.get(`https://api.indybooks.net/v5/auth/inventory/stores/${this.store_id}/isbn/${isbn}`, {
          headers: {
            'Authorization': localStorage.token
          }
        })
        .then((response) => {
          if(response.data.book) {
            this.book = response.data.book;
            this.book.store_id = this.store_id;
            this.book.preview = this.preview;
            if(this.pile) {
              this.addToPile(this.book);
            }
          }
        })
      }
    }
  }
}
</script>

<style>
  #interactive video {
    position: relative;
  }
</style>
