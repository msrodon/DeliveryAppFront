<template>
    <div>
        
        <white-card-50>
            <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/Callendar`">X</router-link>
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
            <h2 class="fw-bold mb-2 text-uppercase">To delivery</h2>
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
    inject: ['notify'],
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
        expandedRow: null, // Przechowuje indeks rozwiniętego wiersza
    }
    },
    computed: {
        progressPercentage() {
            if  (this.transportationStatus == this.transportationStatusEnum.Finished)
                return 100;

            const collected = this.packagesToCollect.filter(pkg => pkg.packageStatusId === this.packageStatusEnum.Collected).length;
            const totalToCollect = this.packagesToCollect.length;
            
            const delivered = this.packagesToDelivery.filter(pkg => pkg.packageStatusId === this.packageStatusEnum.Delivered).length;
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
            const data = await this.$api.get('Transportations/getDriverDailyTransportations',{
                transportationId: this.$route.params.id
            });

            if(data.success){
                this.packagesToCollect = data.transportation.packagesToCollect;
                this.packagesToDelivery = data.transportation.packagesToDelivery;
                this.transportationStatus = data.transportation.transportationStatus
                this.transportationDate = new Date(data.transportation.dateOfTransport).toISOString().split('T')[0];
            }
        },
        async getDictionaries(dictionaryTypeId){
            const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: dictionaryTypeId
            });

            if(data.success)
                return data.dictionaries || [];
        },
        async finishTransportation(){
            const data = await this.$api.post('Transportations/finishTransportation', {
                transportationId: this.$route.params.id
            });

            if(data.success == true)
                this.$router.push({ path: "/Callendar" });
        },
        async markAsCollected(packageId){
            const data = await this.$api.post('Packages/markAsCollected', {
                packageId: packageId
            });

            if(data.success == true)
                this.getDriverDailyTransportations();
        },
        
        async markAsDelivered(packageId){
            const data = await this.$api.post('Packages/markAsDelivered', {
                packageId: packageId
            });

            if(data.success == true)
                this.getDriverDailyTransportations();
        },
        findDictionary(dictionaryList, dictionaryId) {
            const dictionary = dictionaryList.find((dictionary) => dictionary.dictionaryId === dictionaryId);
            return dictionary ? dictionary.name : 'Unknown';
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