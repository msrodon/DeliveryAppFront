<template>
    <div>
      <b-navbar class="px-3">
        <b-navbar-nav>
          <div class="d-flex pe-3">
            <a href="/"><b-icon-house scale="2" variant="light" shift-v="-8"></b-icon-house></a>
          </div>
          <b-nav-item-dropdown text="MENU" right>
            <b-dropdown-item href="/TestEndpoints">Testowe przyciski</b-dropdown-item>
            <b-dropdown-item href="/404">404 page</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="AUTH" right>
            <b-dropdown-item href="/Login">LOGIN</b-dropdown-item>
            <b-dropdown-item href="/Register">REJESTRACJA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="USERS" right>
            <b-dropdown-item href="/Users">Users list</b-dropdown-item>
            <b-dropdown-item href="/AddUser">Add user</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="CARS" right>
            <b-dropdown-item href="/Cars">Cars list</b-dropdown-item>
            <b-dropdown-item href="/AddCar">Add car</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
</template>

<style lang="scss">
.navbar{
  background-color: #76ABAE;
}

.nav-link{
  color: #EEEEEE !important;
  font-size: 130% !important;
  font-weight: 500 !important;
}
</style>