<template>
  <white-card-80>
    
  <base-dialog :show="!!showDialog" title="Delete address confirm" @close="showDialog = !showDialog"></base-dialog>

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
              <button size="sm" @click="editAddress(address.id)" class="me-3 btn btn-primary">Edit</button>
              <button size="sm" @click="deleteAddress(address.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO ADDRESSES FOUND</h1>
      </div> 

          <!-- <template #table-busy>
            <div class="text-center text-primary my-5">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Loading...</strong>
            </div>
          </template>
           -->
          
    </div>
    <button class="btn btn-outline-success px-5 mt-3" v-on:click="addNewAddress()">Add new address</button>
  </white-card-80>
</template>

<script>
  export default {
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
        this.busyState = true;

        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7263/Addresses/getUserAddresses', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${token}`
          }
        });

        const responseJson = await response.json();
        this.items = responseJson.userAddresses;

        this.busyState = false;
      },

      async getCountries(){
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7263/Countries/getCountries', {
            method: "GET",
            headers: {
                'accept': '',
                'Authorization': `Bearer ${token}`
            }
            });

            const responseJson = await response.json();
            this.countries = responseJson.countries
        },

      deleteAddressDialog(){
        // this.showDialog = true;
      },

      async deleteAddress(addressId){
      
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('https://localhost:7263/Addresses/removeAddress', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
                body: JSON.stringify({
                  addressId: addressId
            }),
              credentials: 'include' 
        });
        } catch (error) {

        }
        window.location.href = window.location.href;
      },
      editAddress(addressId){
        var route = "/Addresses/editAddress/"+ addressId;

        this.$router.push({ path: route });
      },
      addNewAddress(){
        this.$router.push("/Addresses/addAddress");
      },
      findCountryName(countryId) {
        const country = this.countries.find((country) => country.id === countryId);
        return country ? country.name : 'Unknown';
      },
    }
  }
</script>