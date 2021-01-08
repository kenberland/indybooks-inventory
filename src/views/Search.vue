<template>
  <div id="scanner">
    <scanner :store_ids="store_ids"/>
  </div>
</template>

<script>
import Scanner from '@/components/Scanner.vue';
export default {
  name: 'Search',
  components: { Scanner },
  data() {
    return {
      store_ids: []
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
        this.store_ids = response.data.stores.map(store => {
          return store.uuid
        });
      })
    }
  }
}
</script>
