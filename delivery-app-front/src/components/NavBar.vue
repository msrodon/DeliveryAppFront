<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">HOME</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              MENU
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="/TestEndpoints">TEST BUTTONS</a></li>
              <li><a class="dropdown-item" href="/404">404 PAGE</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              AUTH
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="/Login">LOGIN</a></li>
              <li><a class="dropdown-item" href="/Register">REGISTER</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              USERS
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="/Users">USERS LSIT</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              CARS
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="/Cars">CARS LSIT</a></li>
              <li><a class="dropdown-item" href="/Cars/AddCar">ADD CAR</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              DICTIONARIES
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="/DictionaryTypes">DICTIONARY TYPES</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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