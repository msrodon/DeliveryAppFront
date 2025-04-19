<template>
  <white-card-80>

  <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/`">X</router-link>
  <h2 class="fw-bold mb-2 text-uppercase">My addresses</h2>
  <hr>
    <div class="mt-4">
      <table class="table" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">PostCode</th>
            <th scope="col">Street</th>
            <th scope="col">Number</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="address in items" :key="address.id">
            <th scope="row">{{ address.id }}</th>
            <td>{{ address.name }}</td>
            <td>{{ findCountryName(address.countryId) }}</td>
            <td>{{ address.city }}</td>
            <td>{{ address.postCode }}</td>
            <td>{{ address.street }}</td>
            <td>{{ address.number }}</td>
            <td>
              <router-link class="me-3 btn btn-primary" :to="`/Addresses/editAddress/${address.addressId}`">Edit</router-link>
              <button size="sm" @click="deleteAddress(address.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO ADDRESSES FOUND</h1>
      </div> 
          
    </div>
    <router-link class="btn btn-outline-success px-5 mt-3" :to="`/Addresses/addAddress`">Add new address</router-link>
  </white-card-80>
</template>

<script>
  export default {
    inject: ['notify'],
    data() {
      return {
        items: [],
        countries: []
      }
    },
    mounted() {
      this.getAddresses();
      this.getCountries();
    },
    methods:{

      async getAddresses(){
        const data = await this.$api.get('Addresses/getUserAddresses');
      
        if(data.success)
          this.items = data.userAddresses;
      },

      async getCountries(){
          const data = await this.$api.get('Countries/getCountries');
        
          if(data.success)
            this.countries = data.countries;
        },

      async deleteAddress(addressId){
        const data = await this.$api.delete('Addresses/removeAddress',{
          addressId: addressId
        });
        
          if(data.success)
            this.getAddresses();
      },
      findCountryName(countryId) {
        const country = this.countries.find((country) => country.id === countryId);
        return country ? country.name : 'Unknown';
      }
    }
  }
</script>