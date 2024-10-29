<template>
  <div>
      <button class="btn btn-success" @click="login">Test LOGIN</button>
      <button class="btn btn-success" @click="logout">Test LOGOUT</button>
      <p v-if="!!isAuth">LOGGED</p>

  </div>
</template>

<script>

export default {
methods: {
  login(){
    // this.#store.dispatch("login");
  },
  logout(){
    // this.$store.dispatch("logout")
  }
},
computed: {
  isAuth(){
    // #return this.$store.getters.UserIsAuthenticated
  }
}
}

</script>

<style>

.btn {
margin: 10px;
}

</style>