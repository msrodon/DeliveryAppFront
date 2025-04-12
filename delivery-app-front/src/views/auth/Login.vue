<template>
    <white-card-20>

      <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
      <p class="text-dark-50 mb-5">Please enter your login and password!</p>

      <div class="text-start mx-1">
          <p class="text-dark-50 m-0">Email</p>
      </div>
      <div data-mdb-input-init class="form-outline form-dark mb-4">
        <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Email" v-model="usernameOrEmail"/>
      </div>

      <div class="text-start mx-1">
          <p class="text-dark-50 m-0">Password</p>
      </div>
      <div data-mdb-input-init class="form-outline form-dark mb-4">
        <input type="password" id="typePasswordX" class="form-control form-control-lg" placeholder="Password" v-model="password"/>
      </div>

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
            usernameOrEmail: '',
            password: '',
            error: null
        };
    },
    methods: {
        async Login() {
            try {
                const response = await fetch('https://localhost:7263/Auth/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usernameOrEmail: this.usernameOrEmail,
                        password: this.password,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Logowanie nie powiodło się');
                }

                const data = await response.json();

                const token = data.token;
                console.log(token);
                if (!token) {
                    console.error('Brak tokenu!');
                    return;
                }
                localStorage.setItem('token', token);

                const response2 = await fetch('https://localhost:7263/Auth/me', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response2.ok) {
                    throw new Error('Nie udało się pobrać danych użytkownika');
                }

                const userData = await response2.json();
                console.log('Dane użytkownika:', userData);

                this.dispatchToStore(userData.email);
                this.$router.push({ name: 'dashboard' });

            } catch (error) {
                this.error = 'Invalid credentials';
                console.error('Błąd:', error.message);
            }
        },
        dispatchToStore(userLogin){
            this.$store.dispatch('auth/Login', {userLogin});
        },
    }
}

</script>