<template>
<div class="container">
  <div class="buttons">
    <b-button type="is-primary" expanded @click="warpToPileScanner">
      Add to pile
    </b-button>
  </div>
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
</div>
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
    warpToBook: function(isbn) {
      this.$router.push({name: 'PileBook', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id, isbn: isbn }});
    },
    warpToPileScanner: function() {
      this.$router.push({name: 'PileScanner', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id }});
    }
  }
}
</script>
