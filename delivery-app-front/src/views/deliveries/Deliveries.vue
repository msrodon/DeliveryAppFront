<template>
    <div>
        
        <white-card-50>
            <h2 class="fw-bold mb-2 text-uppercase">My Deliveries - {{ selectedDate }}</h2>
            <DatePicker @date-selected="handleDateChange" />
            <div v-if="transportationStatus != 0" class="mt-3">
                <h4 >Status: {{ findDictionary(transportationStatuses, transportationStatus) }}</h4>
                <button v-if="transportationStatus == transportationStatusEnum.Scheduled" class="btn btn-lg btn-warning">
                    Start today's delivery
                </button>
                <button v-if="transportationStatus == transportationStatusEnum.Started" class="btn btn-lg btn-warning">
                    Continue delivery
                </button>
            </div>
            <!-- <button v-if="isToday(selectedDate)" class="btn btn-lg btn-primary"> -->
            
        </white-card-50>

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
                            <td>
                                <button @click="toggleDetails(index)" class="btn btn-primary">
                                    {{ expandedRow === index ? 'Ukryj' : 'Pokaż' }}
                                </button>
                            </td>
                            <td colspan="7" v-if="expandedRow !== null && expandedRow === index" class="bg-light">
                                <strong>Adres dostawy:</strong><br>
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
                            <th scope="row">{{ index + 1 }} </th>
                            <th>{{ pack.packageId }}</th>
                            <td>{{ pack.senderEmail }}</td>
                            <td>{{ pack.reciverEmail }}</td>
                            <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
                            <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
                            <td>
                                <button @click="toggleDetails(index)" class="btn btn-primary">
                                    {{ expandedRow === index ? 'Ukryj' : 'Pokaż' }}
                                </button>
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

        packageTypes: [],
        packageStatuses: [],
        transportationStatuses: [],

        packageStatusEnum: [],
        transportationStatusEnum: [],

        token: '',
        selectedDate: '',
        
        expandedRow: null, // Przechowuje indeks rozwiniętego wiersza
    }
    },
    components: {
        DatePicker
    },
    async mounted() {
        this.token = localStorage.getItem('token');
        this.packageStatusEnum = Enums.PackageStatuses;
        this.transportationStatusEnum = Enums.TransportationStatuses;

        await this.getPackageTypes();
        await this.getPackageStatuses();
        await this.getTransportationStatuses();
    },

    methods:{
        isToday(date) {
            const today = new Date().toISOString().split('T')[0]; // Pobiera dzisiejszą datę w formacie 'YYYY-MM-DD'
            return today === date;
        },
        toggleDetails(index) {
            this.expandedRow = this.expandedRow === index ? null : index;
        },
        handleDateChange(date) {
            this.selectedDate = date;
            this.getDriverTransportations();
        },
        async getDriverTransportations(){
            const formattedDate = new Date(this.selectedDate).toISOString();
            if(this.token == '') this.token = localStorage.getItem('token');

            var url = 'https://localhost:7263/Transportations/getDriverTransportations?';
            const response = await fetch(url + new URLSearchParams({
                selectedDate: formattedDate
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
        async getTransportationStatuses(){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 10
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const responseJson = await response.json();
            this.transportationStatuses = responseJson.dictionaries;
        },
        findDictionary(dictionaryList, dictionaryId) {
            const dictionary = dictionaryList.find((dictionary) => dictionary.dictionaryId === dictionaryId);
            return dictionary ? dictionary.name : 'Unknown';
        }
    }
}
</script>