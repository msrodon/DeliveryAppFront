<template>
    <div>
      <NavBar/>
      <base-card>
        <router-view/>
      </base-card>
    </div>
  </template>

<script>

import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  background-image: url("/src/assets/images/img6.jpg");
  background-position: center;
  background-size: cover;
}

nav {
  padding: 30px;

  border-bottom: 2px solid white;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
