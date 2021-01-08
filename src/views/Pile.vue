<template>
<div class="container">
  <b-crumb/>
  <div class="buttons">
    <b-button type="is-primary" expanded @click="warpToPileScanner">
      Add to pile
    </b-button>
  </div>
  <b-table
    :data="books"
    :hoverable="true"
    :mobile-cards="true"
    :loading="loading">

    <b-table-column field="id" label="ISBN" width="40" numeric centered v-slot="props">
      {{ props.row.isbn }}
    </b-table-column>

    <b-table-column field="title" label="Title" width="40" numeric centered v-slot="props">
      {{ props.row.title }}
    </b-table-column>

    <b-table-column field="warp" label="View" width="40" centered v-slot="props">
      <b-button type="is-primary" @click="warpToBook(props.row.isbn)">View</b-button>
    </b-table-column>
  </b-table>
  <div class="buttons">
    <b-button v-if="false" type="is-danger" expanded @click="destroyPile">
      Destroy Pile
    </b-button>
  </div>
</div>
</template>

<script>
import BCrumb from '@/components/BCrumb.vue';
import { mapState } from 'vuex'

export default {
  name: 'Pile',
  components: { BCrumb },
  data() {
    return {
      loading: true
    }
  },
  beforeMount: function() {
    this.$store.commit('store/uuid', this.$route.params.store_id);
    if(localStorage.token) {
      this.axios.get(`https://api.indybooks.net/v5/auth/pile/${this.$route.params.pile_id}`, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.loading = false;
        this.$store.commit('pile/books', response.data.pile.book_list);
      })
      .catch(() => {
        this.loading = false;
      })
    }
  },
  computed: {
    ...mapState({
      books: state => state.pile.books
    }),
  },
  methods: {
    warpToBook: function(isbn) {
      this.$router.push({name: 'PileBook', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id, isbn: isbn }});
    },
    warpToPileScanner: function() {
      this.$router.push({name: 'PileScanner', params: { store_id: this.$route.params.store_id, pile: this.$route.params.pile_id }});
    },
    destroyPile: function() {
      this.axios.delete(`https://api.indybooks.net/v5/auth/pile/${this.$route.params.pile_id}`, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then(() => {
        this.$buefy.toast.open({
          duration: 2000,
          message: `Destroyed Pile`,
          position: 'is-bottom',
          type: 'is-danger'
        });
        this.$router.push({name: 'Store'});
      })
    }
  }
}
</script>
