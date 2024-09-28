<template>
  <div id="app">
    <NavBar/>
    <base-card>
      <router-view/>
    </base-card>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BaseCard from './components/BaseCard.vue';
import WhiteCard80 from './components/WhiteCard80.vue';

export default {
  components: {
    NavBar,
    BaseCard,
    WhiteCard80
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
