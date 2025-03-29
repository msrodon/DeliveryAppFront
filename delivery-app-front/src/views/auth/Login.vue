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

      <button class="btn btn-outline-success btn-lg px-5" @click="Login">Login</button>

      <div v-if="this.error != null">
        <p style="color: red;">{{ this.error }}</p>
      </div>

      <div class="mt-4">
        <p class="mb-0">Don't have an account? <a href="/Register" class="text-dark-50 fw-bold">Sign Up</a></p>
      </div>

    <p class="small mb-3 pb-lg-2"><a href="/resetPassword" class="text-dark-50" >Forgot password?</a></p>

    </white-card-20>
</template>

<script>

export default {
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

                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);

                const response2 = await fetch('https://localhost:7263/Auth/me', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${response.accessToken}`
                    },
                        credentials: 'include' 
                })
                .then(data => { return data.json() });

                this.dispatchToStore(response2.email)

                this.$router.push({ name: 'dashboard' });
            } catch (error) {
                this.error = 'Niepoprawne dane logowania';
            }
        },
        dispatchToStore(userLogin){
            this.$store.dispatch('auth/Login', {userLogin});
        },
    }
}

</script>