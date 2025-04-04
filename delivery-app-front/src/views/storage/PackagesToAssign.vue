<template>
    <div>
    <white-card-80>
        <h2 class="fw-bold mb-2 text-uppercase">Packages to collect</h2>
        <hr>
        <div class="mt-4">
        <table class="table" v-if="packagesToCollect.length > 0">
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
            <tr v-for="(pack, index) in packagesToCollect" :key="pack.packageId">
                <th scope="row">{{ index + 1 }}</th>
                <th>{{ pack.packageId }}</th>
                <td>{{ pack.senderEmail }}</td>
                <td>{{ pack.reciverEmail }}</td>
                <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
                <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
                <td>
                    <router-link class="btn btn-outline-primary px-5 mt-3" :to="`/Storage/AssignPackage/${pack.packageId}`">Assign package</router-link>
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

    <white-card-80>
        <h2 class="fw-bold mb-2 text-uppercase">Packages in storage</h2>
        <hr>
        <div class="mt-4">
        <table class="table" v-if="packagesToDelivery.length > 0">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Package ID</th>
                <th scope="col">Sender email</th>
                <th scope="col">Reciver email</th>
                <th scope="col">Package type</th>
                <th scope="col">Package status</th>
                <th scope="col">Arrival date</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(pack, index) in packagesToDelivery" :key="pack.packageId">
                <th scope="row">{{ index + 1 }}</th>
                <th>{{ pack.packageId }}</th>
                <td>{{ pack.senderEmail }}</td>
                <td>{{ pack.reciverEmail }}</td>
                <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
                <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
                <td>{{ pack.arrivalDate }}</td>
                <td>
                    <router-link class="btn btn-outline-primary px-5 mt-3" :to="`/Storage/AssignPackage/${pack.packageId}`">Assign package</router-link>
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
        
    </div>
</template>

  <script>
    import { Enums } from '@/constants/statuses';
    export default {
      data() {
        return {
          packagesToCollect: [],
          packagesToDelivery: [],

          packageTypes: [],
          packageStatuses: [],

          packageStatusEnum: [],
          token: ''
        }
      },
      async mounted() {
        this.token = localStorage.getItem('token');

        this.packageTypes = await this.getDictionaries(5);
        this.packageStatuses = await this.getDictionaries(2);

        this.packageStatusEnum = Enums.PackageStatuses;

        this.packagesToCollect = await this.getPackages(this.packageStatusEnum.Posted);
        this.packagesToDelivery = await this.getPackages(this.packageStatusEnum.Storage);
      },
      methods:{
        async getPackages(packageStatusId){
            var url = 'https://localhost:7263/Packages/getPackages?';
            const response = await fetch(url + new URLSearchParams({
                packageStatusId: packageStatusId
            }), 
            {
                method: "GET",
                headers: {
                'accept': '',
                'Authorization': `Bearer ${this.token}`
                }
            });
            const responseJson = await response.json();

            responseJson.packages.forEach(el => {
                el.arrivalDate = this.formatDate(el.arrivalDate);
            });
    
            return responseJson.packages;
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
        },
        formatDate(date){
            if(date != null)
                return new Date(date).toISOString().split('T')[0]
        },
      }
    }
  </script>