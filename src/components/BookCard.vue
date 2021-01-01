<template>
<div>
  <div class="media">
    <div class="media-left">
      <figure class="image is-128x128">
        <img :src="image" alt="Book Cover">
      </figure>
    </div>
    <div class="media-content">
      <p class="title is-4">{{ title }}</p>
      <p class="subtitle is-6">{{ authors.join(", ") }}</p>
      <div style="text-align: left;">
        <p>Binding: {{ binding }}</p>
        <p>Publisher: {{ publisher }}</p>
        <p>Publish Date: {{ publish_date }}</p>
        <p>ISBN: {{ isbn }}</p>
      </div>
    </div>
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
    isbn: String
  }
}
</script>
