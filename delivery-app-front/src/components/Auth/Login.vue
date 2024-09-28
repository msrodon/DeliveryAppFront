<template>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-white text-dark" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
  
              <div class="mb-md-5 mt-md-4 pb-5">
  
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
  
              </div>
  
                <div v-if="this.error != null">
                            <p style="color: red;">{{ this.error }}</p>
                        </div>
                <div>
                    
                <p class="mb-0">Don't have an account? <a href="/Register" class="text-dark-50 fw-bold">Sign Up</a>
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style>

.card{
    padding: 10px;
}

</style>

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
                // const response = await axios.post('https://localhost:7263/Auth/login', {
                //   username: this.username,
                //   password: this.password
                // });
                
                const response = await fetch('https://localhost:7263/Auth/login', {
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
                
                
                console.log("POST - https://localhost:7263/Auth/login");
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
        }
    }
}

</script>