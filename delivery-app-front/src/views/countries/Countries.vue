<template>
  <white-card-80>
    
  <base-dialog :show="!!showDialog" title="Delete country confirm" @close="showDialog = !showDialog"></base-dialog>

  <h2 class="fw-bold mb-2 text-uppercase">Registered countries</h2>
  <hr>
    <div class="mt-4">
      <table class="table" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Default currency</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="country in items" :key="country.id">
            <th scope="row">{{ country.id }}</th>
            <td>{{ country.name }}</td>
            <td>{{ country.code }}</td>
            <td>{{ findCurrencyName(country.currencyId) }}</td>
            <td>
              <button size="sm" @click="editCountry(country.id)" class="me-3 btn btn-primary">Edit</button>
              <button size="sm" @click="deleteCountry(country.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO COUNTRIES FOUND</h1>
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
    <button class="btn btn-outline-success px-5 mt-3" v-on:click="addNewCountry()">Add new country</button>
  </white-card-80>
</template>

<script>
  export default {
    data() {
      return {
        items: [],
        currencies: []
      }
    },
    mounted() {
      this.getCountries();
      this.getCurrencies()
    },
    methods:{

      async getCountries(){
        this.busyState = true;

        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7263/Countries/getCountries', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${token}`
          }
        });

        const responseJson = await response.json();
        this.items = responseJson.countries;

        this.busyState = false;
      },

      async getCurrencies(){
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7263/Currencies/getCurrencies', {
            method: "GET",
            headers: {
                'accept': '',
                'Authorization': `Bearer ${token}`
            }
            });

            const responseJson = await response.json();
            this.currencies = responseJson.currencies
        },

      deleteCountryDialog(){
        // this.showDialog = true;
      },

      async deleteCountry(countryId){
      
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('https://localhost:7263/Countries/removeCountry', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
                body: JSON.stringify({
                  countryId: countryId
            }),
              credentials: 'include' 
        });
        } catch (error) {

        }
        window.location.href = window.location.href;
      },
      editCountry(countryId){
        var route = "/Countries/editCountry/"+ countryId;

        this.$router.push({ path: route });
      },
      addNewCountry(){
        this.$router.push("/Countries/addCountry");
      },
      findCurrencyName(currencyId) {
        const currency = this.currencies.find((currency) => currency.id === currencyId);
        return currency ? currency.name : 'Unknown';
      },
    }
  }
</script>