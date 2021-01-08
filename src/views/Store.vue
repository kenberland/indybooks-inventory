<template>
<div class="container">
  <b-crumb/>
  <div class="buttons">
    <b-button type="is-primary" expanded @click="createPile">
      Start a new pile
    </b-button>
  </div>
  <b-table
    :data="piles"
    :hoverable="true"
    :mobile-cards="true"
    :loading="loading">

    <b-table-column field="id" label="Id" width="40" numeric centered v-slot="props">
      {{ props.row.id }}
    </b-table-column>

    <b-table-column field="warp" label="View" width="40" centered v-slot="props">
      <b-button type="is-primary" @click="warpToPile(props.row.id)">View</b-button>
    </b-table-column>
  </b-table>
</div>
</template>

<script>
import BCrumb from '@/components/BCrumb.vue';
import { mapState } from 'vuex'

export default {
  name: 'Store',
  components: { BCrumb },
  data() {
    return {
      piles: [],
      loading: true
    }
  },
  computed: {
    ...mapState({
      store_id: state => state.store.uuid
    })
  },
  beforeMount() {
    this.$store.commit('store/uuid', this.$route.params.store_id);
    this.$store.commit('pile/books', []);
    if(localStorage.token) {
      this.getPiles();
    }
  },
  methods: {
    getPiles: function() {
      this.axios.get(`https://api.indybooks.net/v5/auth/my/pile`, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.piles = response.data.user_pile.pile_uuid_list.map(pile => {
          this.loading = false;
          return { id: pile }
        });
      })
      .catch((err) => {
        if(err.response.status === 404) {
          this.loading = false;
          console.log('No Piles');
        }
      })
    },
    createPile: function() {
      this.axios.post(`https://api.indybooks.net/v5/auth/pile`, {
        pile: {
          book_list: []
        }
      }, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.getPiles();
        this.$buefy.toast.open({
          duration: 2000,
          message: `Created new Pile <b>${response.data.uuid}</b>`,
          position: 'is-bottom',
        });
      })
      .catch((err) => {
        this.$buefy.toast.open({
          duration: 2000,
          message: `Could not create Pile`,
          position: 'is-bottom',
          type: 'is-danger'
        });
        console.error(err);
      })
    },
    warpToPile: function(uuid) {
      this.$router.push({name: 'Pile', params: { store_id: this.store_id, pile_id: uuid }});
    }
  },
}
</script>
