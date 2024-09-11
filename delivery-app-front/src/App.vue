<template>
  
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Home</b-nav-item> -->

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="TOTALNIE KLILKIJ TU <3" right>
            <b-dropdown-item href="#">ZUZUUUU</b-dropdown-item>
            <b-dropdown-item href="#">PRZE</b-dropdown-item>
            <b-dropdown-item href="#">SKURWYSYN</b-dropdown-item>
            <b-dropdown-item href="#">SPRZEDAŻY</b-dropdown-item>
            <b-dropdown-item href="#">&#9829 &#9829 &#9829 &#9829 </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="I TU TEŻ W SUMIE :3" right>
            <b-dropdown-item href="#">I L0VE YOUUUUU</b-dropdown-item>
            <b-dropdown-item href="#">SŁODZIAKU</b-dropdown-item>
            <b-dropdown-item href="#"><img style="width: 100%;" src="../src/assets/aaa1.png"></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

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
