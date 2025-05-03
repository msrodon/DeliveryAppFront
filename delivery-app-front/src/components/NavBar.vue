<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <h4 class="pe-4">DELIVERY APP///</h4>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between align-items-center" id="navbarScroll" v-if="!!isAuth" style="display: flex; flex-wrap: wrap;">
  
      <div class="d-flex flex-wrap align-items-center">
        <button class="nav-link" @click="redirect('/')">HOME</button>

        <template v-if="hasRole(['Admin'])">
          <button class="nav-link" @click="redirect('/Storage/PackagesToAssign')">PACKAGES TO ASSIGN</button>
          <button class="nav-link" @click="redirect('/DictionaryTypes')">DICTIONARY TYPES</button>
          <button class="nav-link" @click="redirect('/AllPackages')">ALL PACKAGES</button>
          <button class="nav-link" @click="redirect('/Currencies')">CURRENCIES</button>
          <button class="nav-link" @click="redirect('/PriceLists')">PRICELISTS</button>
          <button class="nav-link" @click="redirect('/Countries')">COUNTRIES</button>
          <button class="nav-link" @click="redirect('/Drivers')">DRIVERS</button>
          <button class="nav-link" @click="redirect('/Users')">USERS</button>
          <button class="nav-link" @click="redirect('/Cars')">CARS</button>
          <button class="nav-link" @click="redirect('/MyAccount')">MY ACCOUNT</button>
        </template>

        <template v-if="hasRole(['DeliveryManager'])">
          <button class="nav-link" @click="redirect('/Storage/PackagesToAssign')">PACKAGES TO ASSIGN</button>
          <button class="nav-link" @click="redirect('/Drivers')">DRIVERS</button>
          <button class="nav-link" @click="redirect('/Cars')">CARS</button>
          <button class="nav-link" @click="redirect('/MyAccount')">MY ACCOUNT</button>
        </template>

        <template v-if="hasRole(['Delivery'])">
          <button class="nav-link" @click="redirect('/Callendar')">CALLENDAR</button>
          <button class="nav-link" @click="redirect('/Deliveries/DeliveriesHistory')">DELIVERIES HISTORY</button>
          <button class="nav-link" @click="redirect('/Drivers')">DRIVERS</button>
          <button class="nav-link" @click="redirect('/MyAccount')">MY ACCOUNT</button>
        </template>

        <template v-if="hasRole(['Support'])">
          <button class="nav-link" @click="redirect('/AllPackages')">ALL PACKAGES</button>
          <button class="nav-link" @click="redirect('/Drivers')">DRIVERS</button>
          <button class="nav-link" @click="redirect('/Users')">USERS</button>
          <button class="nav-link" @click="redirect('/Cars')">CARS</button>
          <button class="nav-link" @click="redirect('/MyAccount')">MY ACCOUNT</button>
        </template>

        <template v-if="hasRole(['Client'])">
          <button class="nav-link" @click="redirect('/Addresses')">MY ADDRESSES</button>
          <button class="nav-link" @click="redirect('/Addresses/AddAddress')">ADD ADDRESS</button>
          <button class="nav-link" @click="redirect('/Packages')">PACKAGES</button>
          <button class="nav-link" @click="redirect('/Packages/AddPackage')">ADD PACKAGE</button>
          <button class="nav-link" @click="redirect('/MyAccount')">MY ACCOUNT</button>
        </template>
      </div>

      <div class="d-flex align-items-center ms-auto">
        <h2 class="h4 mb-0">{{ this.userLogin }}</h2>
        <button class="btn btn-sm btn-outline-danger ms-3" @click="logout">LOGOUT</button>
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
    isAuth() {
      return this.$store.getters['auth/UserIsAuthenticated'];
    },
    userLogin() {
      return this.$store.getters['auth/UserLogin'];
    },
    userRole() {
      return this.$store.getters['auth/UserRole'] ?? [];
    },
  },
  methods: {
    redirect(to) {
      this.$router.push(to);
    },
    logout() {
      this.$store.dispatch('auth/Logout');
      this.$router.push('/Login');
    },
    hasRole(roles) {
      return roles.some(r => this.userRole === r);
    },
  }
};
</script>

<style scoped lang="scss">

a{
  color: white;
}

h2{
  color: white;
}

h4{
  color: rgb(33, 105, 99)
}

.navbar {
  border-bottom: 2px solid white;
  position: fixed; /* Przyklejony do góry */
  top: 0;
  left: 0;
  width: 100%;
  background: #333;
  color: white;
  padding: 8px;
  text-align: center;
  z-index: 1000; /* Żeby był nad innymi elementami */
}

.nav-link {
  color: white !important;
  font-size: 100% !important;
  font-weight: 500 !important;
  margin: 0 0.5rem !important;

  border: 2px solid white;
  border-radius: 20px;
  padding: 0.4rem 1rem;
  background-color: transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.nav-link:hover {
  background-color: #76ABAE;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.nav-link:active {
  transform: scale(0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
