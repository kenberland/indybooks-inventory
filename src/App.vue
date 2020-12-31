<template>
<div id="app">
  <div id="nav">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            class="logo"
            src="@/assets/logo.png"
            alt="IndyBuy! the locally independant sellers of the world"
            >
        </b-navbar-item>
      </template>

      <template slot="start">
        <router-link class="navbar-item" to="/">Stores</router-link>
        <router-link class="navbar-item" to="/inventory">Inventory</router-link>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <template v-if="username">
              <span class="mr-1">Logged in as {{ username }}</span>
              <a class="button is-light">
                Log out
              </a>
            </template>
            <template v-else>
              <a class="button is-light" href="https://auth.indybooks.net/login?client_id=3878refd9tseverg173ghn3p3&response_type=token&scope=email+openid&redirect_uri=http://localhost:8080/callback">
                Log in
              </a>
            </template>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
  <router-view/>
</div>
</template>

<script>
import * as jwtJsDecode from 'jwt-js-decode';

export default {
  data() {
    const username = null;
   return {
     username
   }
 },
  beforeMount: function() {
    if(this.$route.query.token) {
      let token = this.$route.query.token;
      let jwt = jwtJsDecode.jwtDecode(token);
      let jsonJwt = JSON.stringify(jwt.payload);

      localStorage.token = token;
      localStorage.JWT = jsonJwt
      this.$router.push({ query: '' });
    }
    if(localStorage.JWT) {
      this.username = JSON.parse(localStorage.JWT).email;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#username {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.navbar-item img.logo {
    max-height: 4.5rem;
}
</style>
