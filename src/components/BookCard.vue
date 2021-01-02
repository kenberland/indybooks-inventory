<template>
<div>
  <template v-if="loading">
    <div class="media mb-6">
      <div class="media-left">
        <figure class="image is-128x128">
          <b-skeleton width="128px" height="128px"/>
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">
          <b-skeleton width="100%" :animated="true"/>
        </p>
        <p class="subtitle is-6">
          <b-skeleton width="100%" :animated="true"/>
        </p>
        <div style="text-align: left;">
          <b-skeleton width="60%" :animated="true"/>
          <b-skeleton width="100%" :animated="true"/>
          <b-skeleton width="80%" :animated="true"/>
          <b-skeleton width="75%" :animated="true"/>
        </div>
      </div>
    </div>
    <div class="buttons is-clearfix mt-6" v-if="preview">
      <b-button type="is-primary" expanded v-on:click="warpToBook">Go To</b-button>
    </div>
  </template>
  <template v-else>
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
  </template>
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
    store_id: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    warpToBook: function() {
      this.$router.push({name: 'Book', params: { store_id: this.store_id, isbn: this.isbn }});
    }
  }
}
</script>
