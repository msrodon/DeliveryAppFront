<template>
  <white-card-80>

  <h2 class="fw-bold mb-2 text-uppercase">Registered countries</h2>
  <hr>
    <div class="mt-4">
      <table class="table" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Country ID</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Default currency</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, index) in items" :key="country.id">
            <th scope="row">{{ index + 1 }}</th>
            <th>{{ country.id }}</th>
            <td>{{ country.name }}</td>
            <td>{{ country.code }}</td>
            <td>{{ findCurrencyName(country.currencyId) }}</td>
            <td>
              <router-link class="me-3 btn btn-primary" :to="`/Countries/editCountry/${country.countryId}`">Edit</router-link>
              <button size="sm" @click="deleteCountry(country.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO COUNTRIES FOUND</h1>
      </div> 
    </div>
    <router-link class="btn btn-outline-success px-5 mt-3" :to="`/Countries/addCountry`">Add new country</router-link>
  </white-card-80>
</template>

<script>
  export default {
    inject: ['notify'],
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
        const data = await this.$api.get('Countries/getCountries');

        if(data.success)
          this.items = data.countries || [];
      },

      async getCurrencies(){
        const data = await this.$api.get('Currencies/getCurrencies');

        if(data.success)
          this.currencies = data.currencies || [];
        },

      async deleteCountry(countryId){

        const data = await this.$api.get('Countries/removeCountry',{
          countryId: countryId
        });

        if(data.success)
          this.getCountries();
      },
      findCurrencyName(currencyId) {
        const currency = this.currencies.find((currency) => currency.id === currencyId);
        return currency ? currency.name : 'Unknown';
      },
    }
  }
</script>