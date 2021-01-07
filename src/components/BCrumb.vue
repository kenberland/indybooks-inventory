<template>
<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li v-for="crumb in crumbs" :key="crumb.name" v-bind:class="{ 'is-active': crumb.active }">
      <template v-if="crumb.active">
        <a href="#" aria-current="page">{{ crumb.name }}</a>
      </template>
      <template v-else>
        <router-link :to="crumb.route">{{ crumb.name }}</router-link>
      </template>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  name: 'BCrumb',
  data() {
    const edibleCrumbs = this.$route.meta.breadcrumbs.map(crumb => {
      return { name: crumb.name, active: crumb.active, route: crumb.route }
    });
    return {
      crumbs: edibleCrumbs
    }
  }
}
</script>
