<template>
<b-table
  :data="stores"
  :hoverable="true"
  :mobile-cards="true">

  <b-table-column field="name" label="Name" width="40" numeric centered v-slot="props">
    {{ props.row.name }}
  </b-table-column>

  <b-table-column field="warp" label="View" width="40" centered v-slot="props">
    <b-button type="is-primary" @click="warpToStore(props.row.uuid)">View</b-button>
  </b-table-column>
</b-table>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      stores: []
    }
  },
  beforeMount: function() {
    if(localStorage.token) {
      this.axios.get('https://api.indybooks.net/v5/auth/my/stores', {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.stores = response.data.stores;
      })
    }
  },
  methods: {
    warpToStore: function(uuid) {
      this.$router.push({name: 'Store', params: { store_id: uuid }});
    }
  }
}
</script>
