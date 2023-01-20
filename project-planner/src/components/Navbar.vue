<template>
  <nav class="main-nav">
    <router-link :to="{ name: 'home' }">Projects</router-link>
    <router-link :to="{ name: 'addProject' }">Add Project</router-link>
    <router-link :to="{ name: 'userLogin' }" v-if="!$root.user"
      >Login</router-link
    >
    <router-link :to="{ name: 'userRegister' }" v-if="!$root.user"
      >Register</router-link
    >
    <span class="logout" @click="logout()" v-else>Logout</span>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$root.user = null;
      localStorage.removeItem("auth");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.main-nav {
  text-align: center;
  margin: 40px auto;
}
.main-nav a {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  color: #999;
  font-size: 18px;
}

.main-nav .logout {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  color: #999;
  font-size: 18px;
}
a.router-link-active {
  border-bottom: 2px solid #00ce89;
  padding-bottom: 4px;
}
</style>
