<template>
<b-table
  :data="books"
  :hoverable="true"
  :mobile-cards="true">

  <b-table-column field="id" label="ISBN" width="40" numeric centered v-slot="props">
    {{ props.row.isbn }}
  </b-table-column>

  <b-table-column field="title" label="Title" width="40" numeric centered v-slot="props">
    {{ props.row.title }}
  </b-table-column>

  <b-table-column field="binding" label="Binding" width="40" numeric centered v-slot="props">
    {{ props.row.binding }}
  </b-table-column>

  <b-table-column field="warp" label="View" width="40" centered v-slot="props">
    <b-button type="is-primary" @click="warpToBook(props.row.isbn)">View</b-button>
  </b-table-column>
</b-table>
</template>

<script>
export default {
  name: 'Pile',
  data() {
    return {
      books: []
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
    warpToBook: function(isbn) {
      this.$router.push({name: 'PileBook', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id, isbn: isbn }});
    }
  }
}
</script>
