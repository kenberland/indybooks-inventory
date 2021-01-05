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
      console.log(value);
    }
  },
  beforeMount: function() {
    this.books = [
      { 'isbn': '1400032717', 'title': 'The Curious Incident of the Dog in the Night-Time', 'binding': 'Paperback' },
      { 'isbn': '0440330076', 'title': 'Go Tell It on the Mountain', 'binding': 'Mass Market Paperback' },
    ]
    if(localStorage.token) {
      console.log('This is where I get the pile externally and load it into stores');
    }
  },
  methods: {
    warpToPile: function() {
      this.$router.push({name: 'Pile', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id }});
    }
  }
}
</script>
