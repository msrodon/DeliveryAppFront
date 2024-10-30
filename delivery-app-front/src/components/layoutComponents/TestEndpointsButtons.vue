<template>
  <div>
      <button class="btn btn-success" @click="login">Test LOGIN</button>
      <button class="btn btn-success" @click="logout">Test LOGOUT</button>
  </div>
</template>

<script>

export default {
methods: {
  login(){
    localStorage.setItem('token', "TestToken");
    localStorage.setItem('refreshToken', "TestRefreshToken");

    this.$store.dispatch('auth/Login', {userLogin: "Mario"});
  },
  logout(){
    this.$store.dispatch('auth/Logout');
  }
},
computed: {
  isAuth(){
    return this.$store.getters['auth/UserIsAuthenticated'];
  },
  userLogin(){
    return this.$store.getters['auth/UserLogin'];
  }
}}

</script>

<style>

.btn {
margin: 10px;
}

</style>