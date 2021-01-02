<template>
<div>
  <div class="media mb-6">
    <div class="media-left">
      <figure class="image is-128x128">
        <img :src="image">
      </figure>
    </div>
    <div class="media-content">
      <p class="title is-4">{{ title }}</p>
      <p class="subtitle is-6">{{ authors.join(", ") }}</p>
      <div style="text-align: left;">
        <p v-if="binding">Binding: {{ binding }}</p>
        <p v-if="publisher">Publisher: {{ publisher }}</p>
        <p v-if="publish_date">Publish Date: {{ publish_date }}</p>
        <p v-if="isbn">ISBN: {{ isbn }}</p>
      </div>
    </div>
  </div>
  <div class="buttons is-clearfix mt-6" v-if="preview">
    <b-button type="is-primary" expanded v-on:click="warpToBook">Go To</b-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    image: String,
    title: String,
    authors: {
      type: Array,
      default: function() {
        return [];
      }
    },
    publisher: String,
    publish_date: String,
    binding: String,
    isbn: String,
    preview: {
      type: Boolean,
      default: false
    },
    store_id: String
  },
  methods: {
    warpToBook: function() {
      this.$router.push({name: 'Book', params: { store_id: this.store_id, isbn: this.isbn }});
    }
  }
}
</script>
