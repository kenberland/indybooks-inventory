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
      {{ props.row.isbn }}
    </b-table-column>

    <b-table-column field="title" label="Title" width="40" numeric centered v-slot="props">
      {{ props.row.title }}
    </b-table-column>

    <b-table-column field="count" label="Num. Of Books" width="40" numeric centered v-slot="props">
      {{ props.row.binding }}
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
      this.axios.get(`https://api.indybooks.net/v5/auth/my/piles`, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        console.log(response);
        this.piles = [];
      })
    }
  },
  methods: {
    createPile: function() {
      this.axios.post(`https://api.indybooks.net/v5/auth/piles`, {
        pile: {
          isbn: ['foo']
        }
      }, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        console.log(response);
      })
    }
  }
}
</script>
