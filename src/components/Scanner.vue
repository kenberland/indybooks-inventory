<template>
<div style="width: 100%; overflow-x: hidden;">
  <div class="media">
    <div class="media-left">
       <v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="['ean_reader']"/>
    </div>
    <div class="media-content">
      <book-card/>
    </div>
  </div>
</div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';

export default {
  name: 'Scanner',
  components: { BookCard },
  props: {
    store_id: String
  },
  data() {
    return {
      readerSize: {
        width: 280,
        height: 200
      },
      detecteds: []
    }
  },
  methods: {
    getNewBook: function(isbn) {
      if(localStorage.token) {
        this.axios.put(`https://api.indybooks.net/v5/auth/inventory/stores/${this.store_id}/isbn/${isbn}`,
        {
          book: {
            ask: this.localValue.price,
            quantity: this.localValue.quantity,
            delivery_promise: this.localValue.deliveryPromise,
          }
        },
        {
          headers: {
            'Authorization': localStorage.token
          }
        })
        .then((response) => {
          console.log(response);
        })
      }
    },
    logIt: function(data) {
      console.log('detected', data)
    }
  }
}
</script>
