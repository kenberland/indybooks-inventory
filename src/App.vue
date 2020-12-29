<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Stores</router-link> |
      <router-link to="/inventory">Inventory</router-link> |
      <router-link to="/logout">Logout</router-link>
      <div id="username">
	You are logged in as: {{ username }}
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    const username = null;
    return {
      username
    }
  },
  beforeMount: function() {
    if(localStorage.token) {
      this.axios.get('https://api.indybooks.net/v5/auth/test', {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        console.log(response.data)
      })
    }

    try {
      const jwtJsDecode = require('jwt-js-decode');
      let parameters = this.$route.fullPath;
      let re = /\/#id_token=(.+?)&/;
      let token = parameters.match(re)[1];
      let jwt = jwtJsDecode.jwtDecode(token);
      localStorage.token = token;
      localStorage.JWT = JSON.stringify(jwt.payload);
      this.username = JSON.parse(localStorage.JWT).email;
    } catch(err) {
      console.log("error with JWT decode");
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
</style>
