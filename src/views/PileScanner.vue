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
export default {
  name: 'PileScanner',
  components: { Scanner },
  data() {
    return {
      books: []
    }
  },
  watch: {
    books(value) {
      this.axios.put(`https://api.indybooks.net/v5/auth/pile/${this.$route.params.pile_id}`, {
        pile: {
          isbn: value.map(book => book.isbn)
        }
      }, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
          console.log(response);
      })
      .catch((err) => {
        console.error(err);
      })
      console.log(value);
    }
  },
  beforeMount: function() {
    if(localStorage.token) {
      this.axios.get(`https://api.indybooks.net/v5/auth/pile/${this.$route.params.pile_id}`, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.books = response.data.pile.isbn_list;
      })
    }
  },
  methods: {
    warpToPile: function() {
      this.$router.push({name: 'Pile', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id }});
    }
  }
}
</script>
