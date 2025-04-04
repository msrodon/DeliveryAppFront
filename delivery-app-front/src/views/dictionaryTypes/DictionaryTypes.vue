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
              <th scope="col">Dictionary type ID</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dType, index) in items" :key="dType.id">
              <th scope="row">{{ index + 1 }}</th>
              <th>{{ dType.id }}</th>
              <td>{{ dType.name }}</td>
              <td>
                <router-link class="me-3 btn btn-primary" :to="`/DictionaryTypes/EditDictionaryType/${dType.id}`">Edit name</router-link>
                <router-link class="me-3 btn btn-primary" :to="`/DictionaryTypes/${dType.id}/Dictionaries`">Edit dictionaries</router-link>
                <button size="sm" @click="deleteDType(dType.id)" class="btn btn-danger">Delete type</button>
              </td>
            </tr>
          </tbody>
        </table> 
        <div v-else>
          <h1>NO DICTIONARY TYPES FOUND</h1>
        </div> 
            
      </div>
      <router-link class="btn btn-outline-success px-5 mt-3" :to="`/DictionaryTypes/AddDictionaryType`">Add new dictionary type</router-link>
    </white-card-80>
  </template>
  
  <script>
    export default {
      data() {
        return {
          items: [],
          token: ''
        }
      },
      
      mounted() {
        this.token = localStorage.getItem('token');
        this.getDTypeData()
      },
      methods:{
        async getDTypeData(){
          const response = await fetch('https://localhost:7263/Dictionaries/getDictionaryTypes', {
            method: "GET",
            headers: {
              'accept': '',
              'Authorization': `Bearer ${this.token}`
            }
          });
  
          const responseJson = await response.json();
          this.items = responseJson.dictionaryTypes;
        },

        async deleteDType(dTypeId){
          try {
            const response = await fetch('https://localhost:7263/Dictionaries/removeDictionaryType', {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
              },
              body: JSON.stringify({
                id: dTypeId
              }),
                credentials: 'include' 
          });
          } catch (error) {
  
          }
          window.location.href = window.location.href;
        }
      }
    }
  </script>
  