<template>
<div class="container">
  <div class="buttons">
    <b-button type="is-primary" expanded @click="createPile">
      Start a new pile
    </b-button>
  </div>
  <b-table
    :data="piles"
    :hoverable="true"
    :mobile-cards="true">

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
export default {
  name: 'Inventory',
  data() {
    return {
      piles: [],
    }
  },
  beforeMount() {
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
          return { id: pile }
        });
      })
      .catch((err) => {
        if(err.response.status === 404) {
          console.log('No Piles');
        }
      })
    },
    createPile: function() {
      this.axios.post(`https://api.indybooks.net/v5/auth/pile`, {
        pile: {
          isbn: []
        }
      }, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.getPiles();
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      })
    },
    warpToPile: function(uuid) {
      this.$router.push({name: 'Pile', params: { store_id: this.store_id, pile_id: uuid }});
    }
  }
}
</script>
