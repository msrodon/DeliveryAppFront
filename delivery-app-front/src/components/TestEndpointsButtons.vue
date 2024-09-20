<template>
    <div>
        <button class="btn btn-success" @click="loadTest">Test GET CAR endpoint</button>
        <button class="btn btn-success" @click="loginTest">Test LOGIN endpoint</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            username: 'test123',
            password: 'zaq1@WSX',
            error: null
        };
    },
  methods: {
    loadTest(){
      fetch('https://localhost:7263/Cars/getCar', {
        method: "GET",
        headers: {
          'accept': ''
        }
      });
    },
    async loginTest() {
      try {
        // const response = await axios.post('https://localhost:7263/Auth/login', {
        //   username: this.username,
        //   password: this.password
        // });

        const response = await fetch('http://localhost:5186/Auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'POST',
          // 'Access-Control-Allow-Origin': 'https://localhost:7263'
          'Access-Control-Allow-Origin': '*'
        },
        body: {
            username: this.username,
            password: this.password
        }
        });
        
        console.log(response);

        const token = response.data.token;
        localStorage.setItem('token', token);

        // Dodaj token do nagłówków Axios
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        this.$router.push({ name: 'dashboard' }); // Przekierowanie po zalogowaniu
      } catch (error) {
        this.error = 'Niepoprawne dane logowania';
      }
    }
  }
}

</script>

<style>

.btn{
  margin: 10px;
}

</style>