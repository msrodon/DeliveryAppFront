<template>
    <div>
        
        <white-card-80>
            <h2 class="fw-bold mb-2 text-uppercase">My Deliveries - {{ selectedDate }}</h2>
            <DatePicker @date-selected="handleDateChange" />
        </white-card-80>

        <white-card-80 class="mt-5">
            <h2 class="fw-bold mb-2 text-uppercase">To collect</h2>
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
                    </tr>
                    </tbody>
                </table> 
                <div v-else>
                    <h4>NO TRANSPORTATION ON THIS DAY</h4>
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

        <white-card-80 class="mt-5">
            <h2 class="fw-bold mb-2 text-uppercase">To deliver</h2>
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
                </tr>
                </tbody>
            </table> 
            <div v-else>
                <h4>NO TRANSPORTATION ON THIS DAY</h4>
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
import DatePicker from "@/components/elements/datePicker.vue";

export default {
    data() {
    return {
        packagesToCollect: [],
        packagesToDelivery: [],

        packageTypes: [],
        packageStatuses: [],

        packageStatusEnum: [],
        token: '',
        selectedDate: ''
    }
    },
    components: {
        DatePicker
    },
    async mounted() {
    this.token = localStorage.getItem('token');
    this.packageStatusEnum = Enums.PackageStatuses;

    // this.packagesToCollect = await this.getPackages(this.packageStatusEnum.AssignedToCollect);
    // this.packagesToDelivery = await this.getPackages(this.packageStatusEnum.AssignedToDelivery);
    this.getPackageTypes();
    this.getPackageStatuses();
    },

    methods:{
        handleDateChange(date) {
            this.selectedDate = date;
        },
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
            return responseJson.packages;
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
        findDictionary(dictionaryList, dictionaryId) {
            const dictionary = dictionaryList.find((dictionary) => dictionary.dictionaryId === dictionaryId);
            return dictionary ? dictionary.name : 'Unknown';
        }
    }
}
</script>