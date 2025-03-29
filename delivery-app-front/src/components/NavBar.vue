<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid mx-3">
    <h1 class="pe-2">DELIVERY APP///</h1>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll" v-if="!!isAuth">
    <button class="nav-link" @click="redirect('/')">HOME</button>
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ADMINISTRATION
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><button class="dropdown-item" @click="redirect('/Storage/PackagesToAssign')">PACKAGES TO ASSIGN</button></li>
            <li><button class="dropdown-item" @click="redirect('/DictionaryTypes')">DICTIONARY TYPES</button></li>
            <li><button class="dropdown-item" @click="redirect('/AllPackages')">ALL PACKAGES</button></li>
            <li><button class="dropdown-item" @click="redirect('/Currencies')">CURRENCIES</button></li>
            <li><button class="dropdown-item" @click="redirect('/PriceLists')">PRICELISTS</button></li>
            <li><button class="dropdown-item" @click="redirect('/Countries')">COUNTRIES</button></li>
            <li><button class="dropdown-item" @click="redirect('/Drivers')">DRIVERS</button></li>
            <li><button class="dropdown-item" @click="redirect('/Users')">USERS</button></li>
            <li><button class="dropdown-item" @click="redirect('/Cars')">CARS</button></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            STORAGE MANAGER
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><button class="dropdown-item" @click="redirect('/Storage/PackagesToAssign')">PACKAGES TO ASSIGN</button></li>
            <li><button class="dropdown-item" @click="redirect('/AllPackages')">ALL PACKAGES</button></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            DRIVER
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><button class="dropdown-item" @click="redirect('/Callendar')">CALLENDAR</button></li>
            <li><button class="dropdown-item" @click="redirect('/Deliveries/DeliveriesHistory')">DELIVERIES HISTORY</button></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            SUPPORT
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><button class="dropdown-item" @click="redirect('/AllPackages')">ALL PACKAGES</button></li>
            <li><button class="dropdown-item" @click="redirect('/Users')">USERS</button></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            USER
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><button class="dropdown-item" @click="redirect('/Addresses')">MY ADDRESSES</button></li>
            <li><button class="dropdown-item" @click="redirect('/Addresses/AddAddress')">ADD ADDRESS</button></li>
            <li><button class="dropdown-item" @click="redirect('/Packages')">PACKAGES</button></li>
            <li><button class="dropdown-item" @click="redirect('/Packages/AddPackage')">ADD PACKAGE</button></li>
            <li><button class="dropdown-item" @click="redirect('/MyAccount')">MY ACCOUNT</button></li>
          </ul>
        </li>

      </ul>
      <div class="d-flex">
        <h2 class="h4">{{ this.userLogin }}</h2>
        <button class="btn btn-sm btn-outline-danger ms-4" @click="logout">LOGOUT</button>
      </div>
    </div>
    <div class="collapse navbar-collapse" id="navbarScroll" v-else>
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <button class="nav-link" @click="redirect('/Login')">LOGIN</button>
        <button class="nav-link" @click="redirect('/Register')">REGISTER</button>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
export default {
  
  computed: {
  isAuth(){
    return this.$store.getters['auth/UserIsAuthenticated'];
  },
  userLogin(){
    return this.$store.getters['auth/UserLogin'];
  }
},
methods: {
  redirect(to){
    this.$router.push(to);
  },
  logout(){
    this.$store.dispatch('auth/Logout');
    this.$router.push('/Login');
  }
}
}
</script>

<style scoped lang="scss">

a{
  color: white;
}

h2{
  color: white;
}

.navbar{
  background-color: #76ABAE;
}

.nav-link{
  color: white !important;
  font-size: 130% !important;
  font-weight: 500 !important;
  
  margin-right: 0.5rem !important;
  margin-left: 0.5rem !important;
}

.nav-link:hover{
  background-color: #76ABAE;
  transition: background-color 0.5s linear;
}
</style>
