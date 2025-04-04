<template>
  <white-card-80>
    
  <base-dialog :show="!!showDialog" title="Delete currency confirm" @close="showDialog = !showDialog">

  </base-dialog>

  <h2 class="fw-bold mb-2 text-uppercase">Registered currencies</h2>
  <hr>
    <div class="mt-4">
      <table class="table" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Currency ID</th>
            <th scope="col">Name</th>
            <th scope="col">Shortcut</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(currency, index) in items" :key="currency.id">
            
            <th scope="row">{{ index + 1 }}</th>
            <th>{{ currency.id }}</th>
            <td>{{ currency.name }}</td>
            <td>{{ currency.shortcut }}</td>
            <td>
              <router-link class="me-3 btn btn-primary" :to="`/Currencies/EditCurrency/${currency.id}`">Edit</router-link>
              <button size="sm" @click="deleteCurrency(currency.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO CURRENCIES FOUND</h1>
      </div> 

          <!-- <template #table-busy>
            <div class="text-center text-primary my-5">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Loading...</strong>
            </div>
          </template>
           -->
          
    </div>
    <!-- <button class="btn btn-secondary" v-on:click="resetSort()">Reset sort</button> -->
    <button class="btn btn-outline-success px-5 mt-3" v-on:click="goToAddCurrency()">Add new currency</button>
  </white-card-80>
</template>

<script>
  export default {
    data() {
      return {
        items: [],
        token: ''
      }
    },
    
    mounted() {
      this.token = localStorage.getItem('token');
      this.getCurrenciesData()
    },
    methods:{
      resetSort(){
      },
      async getCurrenciesData(){
        const response = await fetch('https://localhost:7263/Currencies/getCurrencies', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${this.token}`
          }
        });

        const responseJson = await response.json();
        this.items = responseJson.currencies
      },
      async deleteCurrency(currencyId){
        try {
          const response = await fetch('https://localhost:7263/Currencies/removeCurrency', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            },
                body: JSON.stringify({
                  currencyId: currencyId
            }),
              credentials: 'include' 
        });
        } catch (error) {

        }
        window.location.href = window.location.href;
      },
      goToAddCurrency(){
        this.$router.push("/Currencies/AddCurrency");
      }
    }
  }
</script>
