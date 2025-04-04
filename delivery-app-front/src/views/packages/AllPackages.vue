<template>
    <white-card-80>
  
    <h2 class="fw-bold mb-2 text-uppercase">All packages</h2>
    <hr>
      <div class="mt-4">
        <table class="table" v-if="items.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Package ID</th>
              <th scope="col">Sender email</th>
              <th scope="col">Reciver email</th>
              <th scope="col">Package type</th>
              <th scope="col">Package status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pack, index) in items" :key="pack.id">
              <th scope="row">{{ index + 1 }}</th>
              <th>{{ pack.packageId }}</th>
              <td>{{ pack.senderEmail }}</td>
              <td>{{ pack.reciverEmail }}</td>
              <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
              <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
              <td>
                <router-link class="btn btn-sm btn-outline-primary btn-lg px-5 me-3 my-2" :to="`/Packages/PackageInfo/${pack.packageId}`">Package info</router-link>
              </td>
            </tr>
          </tbody>
        </table> 
        <div v-else>
          <h4>NO PACKAGES FOUND</h4>
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
          items: [],
          packageTypes: [],
          packageStatuses: [],
          token: ''
        }
      },
      async mounted() {
        this.token = localStorage.getItem('token');
        this.packageTypes = await this.getDictionaries(5);
        this.packageStatuses = await this.getDictionaries(2);

        this.getPackages();
      },
      methods:{
        async getPackages(){
          const response = await fetch('https://localhost:7263/Packages/getPackages', {
            method: "GET",
            headers: {
              'accept': '',
              'Authorization': `Bearer ${this.token}`
            }
          });
  
          const responseJson = await response.json();
          this.items = responseJson.packages;
        },
        async getDictionaries(dictionaryTypeId){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: dictionaryTypeId
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const responseJson = await response.json();
            return responseJson.dictionaries
        },
        findDictionary(dictionaryList, dictionaryId) {
          const dictionary = dictionaryList.find((dictionary) => dictionary.dictionaryId === dictionaryId);
          return dictionary ? dictionary.name : 'Unknown';
        }
      }
    }
  </script>