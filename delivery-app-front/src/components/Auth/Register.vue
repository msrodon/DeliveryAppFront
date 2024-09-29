<template>
  <white-card-20>

    <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
    <p class="text-dark-50 mb-5">Sign up now</p>

    <div class="text-start mx-1">
      <p class="text-dark-50 m-0">Email</p>
    </div>
    <div data-mdb-input-init class="form-outline form-dark mb-4">
      <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Email"/>
    </div>

    <div class="text-start mx-1">
      <p class="text-dark-50 m-0">Password</p>
    </div>
    <div data-mdb-input-init class="form-outline form-dark mb-4">
      <input type="password" id="typePasswordX" class="form-control form-control-lg" placeholder="Password"/>
    </div>
    
    <div class="text-start mx-1">
      <p class="text-dark-50 m-0">Repeat password</p>
    </div>
    <div data-mdb-input-init class="form-outline form-dark mb-4">
      <input type="password" id="typePasswordX2" class="form-control form-control-lg" placeholder="Repeat password"/>
    </div>

    <!-- <p class="small mb-3 pb-lg-2"><a class="text-dark-50" href="#!">Forgot password?</a></p> -->

    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark btn-lg px-5" type="submit" @click="Register">Register</button>

    <div class="mt-4">
      <p class="mb-0">Already have an account ? <a href="/Login" class="text-dark-50 fw-bold">Login</a>
      </p>
    </div>

  </white-card-20>
</template>

<script>
import WhiteCard20 from '../LayoutComponents/WhiteCard20.vue';
export default {
  components: { WhiteCard20 },
  data: {
    email: '',
    password: '',
    repeatedPassword: '',
    error: null
  },
  methods: {
    async Register() {
      console.log("register");

      if(!this.ValidatePasswords()){
        
        console.log("register11");
        return;
      }

      console.log("register2");

      this.error = null;

      try {
          const response = await fetch('https://localhost:7263/Auth/Register', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                email: this.email,
                password: this.password
              }),
                credentials: 'include' 
          });
          
          console.log("POST - https://localhost:7263/Auth/Register");
          console.log(response);

          const token = response.data.token;
          localStorage.setItem('token', token);

          this.email = null;
          this.password = null;

          // Dodaj token do nagłówków Axios
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          this.$router.push({ name: 'dashboard' });
      } catch (error) {
          this.error = 'Niepoprawne dane logowania';
      }
    },
    ValidatePasswords() {
      console.log("AAA");

      // Sprawdzenie, czy hasła nie są puste
      if (!this.password || !this.repeatedPassword) {
          this.error = "Hasła nie mogą być puste.";
          return false;
      }
      
      // Sprawdzenie, czy hasła są identyczne
      if (this.password !== this.repeatedPassword) {
          this.error = "Hasła muszą być identyczne.";
          return false;
      }
      
      // Sprawdzenie długości hasła
      if (this.password.length < 8) {
          this.error = "Hasło musi mieć co najmniej 8 znaków.";
          return false;
      }
      
      // Sprawdzenie, czy hasło zawiera co najmniej jedną literę wielką
      const maWielkaLitere = /[A-Z]/.test(this.password);
      if (!maWielkaLitere) {
          this.error = "Hasło musi zawierać co najmniej jedną wielką literę.";
          return false;
      }
      
      // Sprawdzenie, czy hasło zawiera co najmniej jedną literę małą
      const maMalaLitere = /[a-z]/.test(this.password);
      if (!maMalaLitere) {
          this.error = "Hasło musi zawierać co najmniej jedną małą literę.";
          return false;
      }
      
      // Sprawdzenie, czy hasło zawiera co najmniej jedną cyfrę
      const maCyfre = /\d/.test(this.password);
      if (!maCyfre) {
          this.error = "Hasło musi zawierać co najmniej jedną cyfrę.";
          return false;
      }
      
      // Sprawdzenie, czy hasło zawiera co najmniej jeden znak specjalny
      const maZnakSpecjalny = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
      if (!maZnakSpecjalny) {
          this.error = "Hasło musi zawierać co najmniej jeden znak specjalny.";
          return false;
      }
      return true;
    }
  }
};
</script>
