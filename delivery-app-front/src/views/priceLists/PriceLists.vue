<template>
  <white-card-80>
    
  <base-dialog :show="!!showDialog" title="Delete currency confirm" @close="showDialog = !showDialog">

  </base-dialog>

  <h2 class="fw-bold mb-2 text-uppercase">Price lists</h2>
  <p class="text-dark-50 mb-5">select currency</p>
  <hr>
    <div class="mt-4">
      <table class="table" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Currency</th>
            <th scope="col">Shortcut</th>
            
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="currency in items" :key="currency.id">
            <th scope="row">{{ currency.id }}</th>
            <td>{{ currency.name }}</td>
            <td>{{ currency.shortcut }}</td>
            <!-- FOR package types -->
            <td>
              <button size="sm" @click="editPriceList(currency.id)" class="me-3 btn btn-primary">Edit</button>
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
      editPriceList(currencyId){
        var route = "/PriceLists/EditPriceList/"+ currencyId;

        this.$router.push({ path: route });
      }
    }
  }
</script>
