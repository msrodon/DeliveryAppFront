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
              <th scope="col">Sender email</th>
              <th scope="col">Reciver email</th>
              <th scope="col">Package type</th>
              <th scope="col">Package status (NOT PUBLIC TO DO)</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pack, index) in items" :key="pack.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ pack.senderEmail }}</td>
              <td>{{ pack.reciverEmail }}</td>
              <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
              <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
              <td>
                <button class="btn btn-outline-secondary px-5 mt-3" @click="goPackageInfo(pack.packageId)">Package info</button>
              </td>
              <td>
                <div v-if="pack.packageStatusId == packageStatusEnum.New">
                  <button class="btn btn-outline-warning px-5 mt-3" @click="goToPayment(pack.paymentId)">Continue payment</button>
                </div>
                <div v-if="pack.packageStatusId == packageStatusEnum.Paid">
                  <button class="btn btn-outline-info px-5 mt-3" @click="goToSending(pack.packageId)">Mark as send</button>
                </div>
              </td>
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
      <button class="btn btn-outline-success px-5 mt-3" @click="goToNewPackage()">Add new package</button>
    </white-card-80>
  </template>
  
  <script>
    import { Enums } from '@/constants/statuses';
    export default {
      data() {
        return {
          items: [],
          currencies: [],
          packageTypes: [],
          packageStatuses: [],
          //
          token: "",
          packageStatusEnum: []
        }
      },
      mounted() {
        this.token = localStorage.getItem('token');
        this.packageStatusEnum = Enums.PackageStatuses;
        this.getPackages();
        this.getPackageTypes();
        this.getPackageStatuses();
      },
      methods:{
        async getPackages(){
          const response = await fetch('https://localhost:7263/Packages/getUserPackages', {
            method: "GET",
            headers: {
              'accept': '',
              'Authorization': `Bearer ${this.token}`
            }
          });
  
          const responseJson = await response.json();
          this.items = responseJson.userPackages;
          console.log(this.items);
        },
        async getPackageTypes(){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 5
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const responseJson = await response.json();
            this.packageTypes = responseJson.dictionaries
        },
        async getPackageStatuses(){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 2
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const responseJson = await response.json();
            this.packageStatuses = responseJson.dictionaries;
        },
        goToNewPackage(){
          this.$router.push("/Packages/addPackage");
        },
        goToPayment(paymentId){
          this.$router.push("/Payment/" + paymentId);
        },
        goToSending(packageId){
          this.$router.push("/Packages/SendPackage/" + packageId);
        },
        goPackageInfo(packageId){
          this.$router.push("/Packages/info" + packageId);
        },
        findDictionary(dictionaryList, dictionaryId) {
          const dictionary = dictionaryList.find((dictionary) => dictionary.dictionaryId === dictionaryId);
          return dictionary ? dictionary.name : 'Unknown';
        }
      }
    }
  </script>