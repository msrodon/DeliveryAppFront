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
          
    </div>
    <button class="btn btn-outline-success px-5 mt-3" v-on:click="goToAddCurrency()">Add new currency</button>
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
        const data = await this.$api.get('Currencies/getCurrencies');

        if(data.success)
          this.items = data.currencies || [];
      },
      async deleteCurrency(currencyId){
        const data = await this.$api.get('Dictionaries/getDictionariesByType',{
          currencyId: currencyId
        });

        if(data.success)
          this.getCurrenciesData()
      },
      goToAddCurrency(){
        this.$router.push("/Currencies/AddCurrency");
      }
    }
  }
</script>
