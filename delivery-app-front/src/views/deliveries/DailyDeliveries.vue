<template>
    <div>
        
        <white-card-50>
            <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-3 " @click="goToCallendar()">X</button>
            <h2 class="fw-bold mb-2 text-uppercase">Deliveries - {{ transportationDate }}</h2>
            <h4 >Delivery status: {{ findDictionary(transportationStatuses, transportationStatus) }}</h4>
            <div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
                </div>
                <p>{{ progressPercentage.toFixed(2) }}% compleated</p>
                <button v-if="progressPercentage.toFixed(2) == 100 && transportationStatus != transportationStatusEnum.Finished" class="btn btn-lg btn-success" @click="finishTransportation()">
                    Finish delivery
                </button>
            </div>
        </white-card-50>

        <white-card-80 v-if="transportationStatus != transportationStatusEnum.Finished">
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
                            <td v-if="pack.packageStatusId == packageStatusEnum.AssignedToCollect">
                                <button @click="markAsCollected(pack.packageId)" class="btn btn-success me-4">
                                    Collect
                                </button>
                                <button @click="toggleDetails(index)" class="btn btn-primary">
                                    {{ expandedRow === index ? 'Hide' : 'Show' }}
                                </button>
                                
                            </td>
                            <td v-else>
                                <p class="h4">&#x2705;</p> Collected
                            </td>
                            <td colspan="7" v-if="expandedRow !== null && expandedRow === index" class="bg-light">
                                <strong>Shipment address:</strong><br>
                                {{ packagesToCollect[expandedRow].country }}, {{ packagesToCollect[expandedRow].postCode }} {{ packagesToCollect[expandedRow].city }}<br>
                                {{ packagesToCollect[expandedRow].street }} {{ packagesToCollect[expandedRow].number }}<br>
                                <!-- <em>Typ adresu:</em> {{ findDictionary(addressTypes, packagesToCollect[expandedRow].addressTypeId) }} -->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <h4>NO TRANSPORTATION ON THIS DAY</h4>
                </div> 
            </div>
        </white-card-80>

        <white-card-80 v-if="transportationStatus != transportationStatusEnum.Finished">
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
                            <th scope="row">{{ index + 1 }} </th>
                            <th>{{ pack.packageId }}</th>
                            <td>{{ pack.senderEmail }}</td>
                            <td>{{ pack.reciverEmail }}</td>
                            <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
                            <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
                            <td v-if="pack.packageStatusId == packageStatusEnum.IssuedToDelivery">
                                <button @click="markAsDelivered(pack.packageId)" class="btn btn-success me-4">
                                    Collect
                                </button>
                                <button @click="toggleDetails(index)" class="btn btn-primary">
                                    {{ expandedRow === index ? 'Hide' : 'Show' }}
                                </button>
                                
                            </td>
                            <td v-else>
                                <p class="h4">&#x2705;</p> Deliveried
                            </td>
                            <td colspan="7" v-if="expandedRow !== null && expandedRow === index" class="bg-light">
                                <strong>Adres dostawy:</strong><br>
                                {{ packagesToDelivery[expandedRow].country }}, {{ packagesToDelivery[expandedRow].postCode }} {{ packagesToDelivery[expandedRow].city }}<br>
                                {{ packagesToDelivery[expandedRow].street }} {{ packagesToDelivery[expandedRow].number }}<br>
                                <!-- <em>Typ adresu:</em> {{ findDictionary(addressTypes, packagesToCollect[expandedRow].addressTypeId) }} -->
                            </td>
                        </tr>
                </tbody>
            </table> 
            <div v-else>
                <h4>NO TRANSPORTATION ON THIS DAY</h4>
            </div> 
                
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
        transportationStatus: '',
        transportationDate: '',

        packageTypes: [],
        packageStatuses: [],
        transportationStatuses: [],

        packageStatusEnum: [],
        transportationStatusEnum: [],

        token: '',
        
        expandedRow: null, // Przechowuje indeks rozwiniętego wiersza
    }
    },
    computed: {
        progressPercentage() {
            if  (this.transportationStatus == this.transportationStatusEnum.Finished)
                return 100;

            const collected = this.packagesToCollect.filter(pkg => pkg.packageStatusId === 28).length;
            const totalToCollect = this.packagesToCollect.length;
            
            const delivered = this.packagesToDelivery.filter(pkg => pkg.packageStatusId === 33).length;
            const totalToDeliver = this.packagesToDelivery.length;
            
            const total = totalToCollect + totalToDeliver;
            const completed = collected + delivered;
            
            return total > 0 ? (completed / total) * 100 : 0;
        }
    },
    components: {
        DatePicker
    },
    async mounted() {
        this.token = localStorage.getItem('token');
        this.packageStatusEnum = Enums.PackageStatuses;
        this.transportationStatusEnum = Enums.TransportationStatuses;
        this.getDriverDailyTransportations();

        this.packageTypes = await this.getDictionaries(5);
        this.packageStatuses = await this.getDictionaries(2);
        this.transportationStatuses = await this.getDictionaries(10);
    },

    methods:{
        toggleDetails(index) {
            this.expandedRow = this.expandedRow === index ? null : index;
        },
        async getDriverDailyTransportations(){
            var url = 'https://localhost:7263/Transportations/getDriverDailyTransportations?';
            const response = await fetch(url + new URLSearchParams({
                transportationId: this.$route.params.id
            }), 
            {
                method: "GET",
                headers: {
                'accept': '',
                'Authorization': `Bearer ${this.token}`
                }
            });

            const responseJson = await response.json();
            this.packagesToCollect = responseJson.transportation.packagesToCollect;
            this.packagesToDelivery = responseJson.transportation.packagesToDelivery;
            this.transportationStatus = responseJson.transportation.transportationStatus
            this.transportationDate = new Date(responseJson.transportation.dateOfTransport).toISOString().split('T')[0];
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
        async finishTransportation(){
            var url = 'https://localhost:7263/Transportations/finishTransportation?';
            const response = await fetch(url, 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    transportationId: this.$route.params.id
                }),
                credentials: 'include' 
            }); 
            var route = "/Callendar";
            this.$router.push({ path: route });
        },
        async markAsCollected(packageId){
            var url = 'https://localhost:7263/Packages/markAsCollected?';
            const response = await fetch(url, 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    packageId: packageId
                }),
                credentials: 'include' 
            }); 
            window.location.href = window.location.href;
        },
        
        async markAsDelivered(packageId){
            var url = 'https://localhost:7263/Packages/markAsDelivered?';
            const response = await fetch(url, 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    packageId: packageId
                }),
                credentials: 'include' 
            }); 
            window.location.href = window.location.href;
        },
        goToCallendar(){
          var route = "/Callendar";
          this.$router.push({ path: route });
        }
    }
}
</script>

<style>
.progress-container {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.5s ease-in-out;
}
</style>