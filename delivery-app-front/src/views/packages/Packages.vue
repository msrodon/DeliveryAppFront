<template>
    <white-card-80>
      
    <base-dialog :show="!!showDialog" title="Delete country confirm" @close="showDialog = !showDialog"></base-dialog>
  
    <h2 class="fw-bold mb-2 text-uppercase">My packages</h2>
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
            <tr v-for="pack in items" :key="pack.id">
              <th scope="row">{{ pack.id }}</th>
              <td>{{ pack.name }}</td>
              <td>{{ pack.code }}</td>
              <td>{{ pack.currencyId }}</td>
            </tr>
          </tbody>
        </table> 
        <div v-else>
          <h1>NO PACKAGES FOUND</h1>
        </div> 
  
            <!-- <template #table-busy>
              <div class="text-center text-primary my-5">
                <b-spinner class="align-middle"></b-spinner>
                <strong> Loading...</strong>
              </div>
            </template>
             -->
            
      </div>
      <button class="btn btn-outline-success px-5 mt-3" v-on:click="addNewPackage()">Add new package</button>
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
        this.getPackages();
      },
      methods:{
  
        async getPackages(){
          this.busyState = true;
  
          const token = localStorage.getItem('token');
          const response = await fetch('https://localhost:7263/Packages/getUserPackages', {
            method: "GET",
            headers: {
              'accept': '',
              'Authorization': `Bearer ${token}`
            }
          });
  
          const responseJson = await response.json();
          this.items = responseJson.userPackages;
  
          this.busyState = false;
        },
        addNewPackage(){
          this.$router.push("/Packages/addPackage");
        }
      }
    }
  </script>