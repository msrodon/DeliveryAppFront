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
            <th scope="col">Name</th>
            <th scope="col">Shortcut</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="currency in items" :key="currency.id">
            <th scope="row">{{ currency.id }}</th>
            <td>{{ currency.name }}</td>
            <td>{{ currency.shortcut }}</td>
            <td>
              <button size="sm" @click="editCurrency(currency.id)" class="me-3 btn btn-primary">Edit</button>
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
    <button class="btn btn-outline-success px-5 mt-3" v-on:click="addNewCurrency()">Add new currency</button>
  </white-card-80>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    
    mounted() {
      this.getCurrenciesData()
    },
    methods:{
      resetSort(){
      },
      async getCurrenciesData(){
        this.busyState = true;

        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7263/Currencies/getCurrencies', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${token}`
          }
        });

        const responseJson = await response.json();
        this.items = responseJson.currencies
        this.busyState = false;
      },
      deleteCurrenciesDialog(){
        // this.showDialog = true;
      },
      async deleteCurrency(currencyId){
      
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('https://localhost:7263/Currencies/removeCurrency', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
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
      editCurrency(carId){
        var route = "/Currencies/EditCurrency/"+ carId;

        this.$router.push({ path: route });
      },
      addNewCurrency(){
        this.$router.push("/Currencies/AddCurrency");
      }
    }
  }
</script>
