<template>
    <white-card-80>
      
    <base-dialog :show="!!showDialog" title="Delete dictionary type confirm" @close="showDialog = !showDialog">
  
  
    </base-dialog>
  
      <h2 class="fw-bold mb-2 text-uppercase">Dictionary types</h2>
      <hr>
      <div class="mt-4">
        <table class="table" v-if="items.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dType in items" :key="dType.id">
              <th scope="row">{{ dType.id }}</th>
              <td>{{ dType.name }}</td>
              <td>
                <button size="sm" @click="editDType(car.id)" class="me-3 btn btn-primary">Edit name</button>
                <button size="sm" @click="editDictionaries(car.id)" class="me-3 btn btn-primary">Edit dictionaries</button>
                <button size="sm" @click="deleteDType(car.id)" class="btn btn-danger">Delete type</button>
              </td>
            </tr>
          </tbody>
        </table> 
        <div v-else>
          <h1>NO DICTIONARY TYPES FOUND</h1>
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
      <button class="btn btn-outline-success px-5 mt-3" v-on:click="addNewDType()">Add new dictionary type</button>
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
        this.getDTypeData()
      },
      methods:{
        resetSort(){
        },

        async getDTypeData(){
          this.busyState = true;
  
          const token = localStorage.getItem('token');
          const response = await fetch('https://localhost:7263/dictionaries/getDictionaryTypes', {
            method: "GET",
            headers: {
              'accept': '',
              'Authorization': `Bearer ${token}`
            }
          });
  
          const responseJson = await response.json();
          this.items = responseJson.dictionaryTypes;
          this.busyState = false;
        },

        deleteDType(){
          // this.showDialog = true;
        },

        async deleteDType(dTypeId){
        
          const token = localStorage.getItem('token');
          try {
            const response = await fetch('https://localhost:7263/DictionaryTypes/removeDictionaryType', {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
                  body: JSON.stringify({
                    id: dTypeId
              }),
                credentials: 'include' 
          });
          } catch (error) {
  
          }
          window.location.href = window.location.href;
        },

        editDType(dTypeId){
          var route = "/DictionaryTypes/EditDictionaryType/"+ dTypeId;
  
          this.$router.push({ path: route });
        },

        addNewDType(){
          this.$router.push("/DictionaryTypes/AddDictionaryType");
        }
      }
    }
  </script>
  