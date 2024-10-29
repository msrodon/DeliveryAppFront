<template>
    <white-card-20>

      <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
      <p class="text-dark-50 mb-5">Please enter your login and password!</p>

      <div class="text-start mx-1">
          <p class="text-dark-50 m-0">Email</p>
      </div>
      <div data-mdb-input-init class="form-outline form-dark mb-4">
        <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Email" v-model="email"/>
      </div>

      <div class="text-start mx-1">
          <p class="text-dark-50 m-0">Password</p>
      </div>
      <div data-mdb-input-init class="form-outline form-dark mb-4">
        <input type="password" id="typePasswordX" class="form-control form-control-lg" placeholder="Password" v-model="password"/>
      </div>

      <!-- <p class="small mb-3 pb-lg-2"><a class="text-dark-50" href="#!">Forgot password?</a></p> -->

      <button class="btn btn-outline-dark btn-lg px-5" @click="Login">Login</button>

      
      <button class="btn btn-outline-dark btn-lg px-5" @click="Logs">Log Logs</button>


      <div v-if="this.error != null">
        <p style="color: red;">{{ this.error }}</p>
      </div>

      <div class="mt-4">
        <p class="mb-0">Don't have an account? <a href="/Register" class="text-dark-50 fw-bold">Sign Up</a></p>
      </div>

    </white-card-20>
</template>

<script>
import WhiteCard20 from '../../components/LayoutComponents/WhiteCard20.vue';

export default {
  components: { WhiteCard20 },
    data() {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async Login() {

            this.error = null;

        try {
                const response = await fetch('https://localhost:7263/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                        body: JSON.stringify({
                            email: this.email,
                            password: this.password,
                    }),
                        credentials: 'include' 
                })
                .then(data => { return data.json() });

                console.log("POST - https://localhost:7263/login");
                console.log(response);

                // const token = response.data.token;
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);

                // this.email = null;
                // this.password = null;

                // Dodaj token do nagłówków Axios
                // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // this.$router.push({ name: 'dashboard' });
            } catch (error) {
                this.error = 'Niepoprawne dane logowania';
            }
        },
        Logs(){
            console.log("LOGGINNS");
            console.log(localStorage.getItem('token'));
        }
    }
}

</script>