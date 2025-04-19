<template>
  <white-card-80>
    <h2 class="fw-bold mb-2 text-uppercase">Price lists</h2>
    <p class="text-dark-50 mb-5">select currency</p>
    <hr>
    <div class="mt-4">
      <table class="table" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Price list ID</th>
            <th scope="col">Currency</th>
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
              <router-link class="me-3 btn btn-primary" :to="`/PriceLists/EditPriceList/${currency.id}`">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO PRICE LISTS FOUND</h1>
      </div> 
          
    </div>
  </white-card-80>
</template>

<script>
  export default {
    inject: ['notify'],
    data() {
      return {
        items: []
      }
    },
    
    mounted() {
      this.getCurrencies()
    },
    methods:{
      async getCurrencies(){
        const data = await this.$api.get('Currencies/getCurrencies');

        if(data.success)
          this.items = data.currencies || []
      }
    }
  }
</script>
