<template>
    <div>
        
        <white-card-50>
            <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-3 " @click="goToPackagesToAssign()">X</button>
            <h2 class="fw-bold mb-2 text-uppercase">Assign package</h2>
            <p class="text-dark-50 mb-3">assign package to courier</p>
            
            <hr>
            
            <div class="row">
                <div class="col-3">
                    <p>Date of delivery:</p>
                </div>
                <div class="col-6">
                    <DatePicker @date-selected="handleDateChange" />
                </div>
                
            </div>
            <div class="row">
                <div class="d-flex flex-column col-12">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Select driver</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-model="selectedDriverId">
                            <option disabled selected>Choose option</option>
                            <option v-for="x in drivers" :value="x.id" :key="x.id">{{"#"+ x.id + " - " + x.login + " - " + x.firstName + " " + x.lastName}}</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-outline-success px-5 mt-3" v-on:click="assignPackage()">Assign package</button>

        </white-card-50>
        
        <white-card-50>
            <h2 class="fw-bold mb-2 text-uppercase">Package details</h2>
            <p class="text-dark-50 mb-3">package information details</p>
            
            <hr>
            <div class="row">
                <div class="d-flex flex-column w-50">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Sender e-mail</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <input class="form-control form-control-lg" v-bind:placeholder="senderEmail" disabled/>
                    </div>
                </div>

                <div class="d-flex flex-column w-50">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Reciver e-mail</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <input class="form-control form-control-lg" v-bind:placeholder="reciverEmail" disabled/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="d-flex flex-column col-8">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Package status</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-bind:value="packageStatusId" disabled>
                            <option disabled selected>Choose option</option>
                            <option v-for="x in packageStatuses" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                        </select>
                    </div>
                </div>

                <div class="d-flex flex-column col-4">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Package size</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-bind:value="packageTypeId" disabled>
                            <option disabled selected>Choose option</option>
                            <option v-for="x in packageTypes" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr>
            <h5>Address</h5>
            <div class="row mb-2">

                <div class="row">
                    <div class="d-flex flex-column w-100">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Address type</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <select class="form-select form-select-lg" v-bind:value="addressTypeId" disabled>
                                <option disabled selected>Choose option</option>
                                <option v-for="x in addressTypes" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="d-flex flex-column col-6">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Country</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="country" disabled/>
                        </div>
                    </div>

                    <div class="d-flex flex-column col-6">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Post code</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="postCode" disabled/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="d-flex flex-column col-4">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">City</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="city" disabled/>
                        </div>
                    </div>

                    <div class="d-flex flex-column col-4">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Street</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="street" disabled/>
                        </div>
                    </div>

                    <div class="d-flex flex-column col-4">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Number</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="number" disabled/>
                        </div>
                    </div>
                </div>
            </div>
        </white-card-50>
</div>
</template>

<script> 

import DatePicker from "@/components/elements/datePickerMinDate.vue";
export default {
    data() {
        return {
            //PACKAGE
            reciverEmail: '',
            senderEmail: '',
            packageStatusId: '',
            packageTypeId: '',

            //ADDRESS
            country: '',
            postCode: '',
            city: '',
            street: '',
            number: '',
            addressTypeId: '',
            
            //API DATA
            packageStatuses: [],
            packageTypes: [],
            currencies: [],
            addressTypes: [],
            drivers: [],

            selectedDriverId: '',
            selectedDate: '',
            token: ''
        };
    },
    components: {
        DatePicker
    },
    async mounted(){
        this.token = localStorage.getItem('token');

        this.packageTypes = await this.getDictionaries(5);
        this.packageStatuses = await this.getDictionaries(2);
        this.addressTypes = await this.getDictionaries(9);

        await this.getPackageDetails();
        await this.getDriversData();
    },
    methods: {
        handleDateChange(date) {
            this.selectedDate = date;
        },
        async getPackageDetails(){
            var url = 'https://localhost:7263/Packages/getPackageDetails?'
            const response = await fetch(url + new URLSearchParams({
                packageId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const responseJson = await response.json();
            const packageDetails = responseJson.packageDetails;

            this.reciverEmail = packageDetails.reciverEmail;
            this.senderEmail = packageDetails.senderEmail;
            this.packageStatusId = packageDetails.packageStatusId;
            this.packageTypeId = packageDetails.packageTypeId;

            this.country = packageDetails.destinationAddress.country;
            this.postCode = packageDetails.destinationAddress.postCode;
            this.city = packageDetails.destinationAddress.city;
            this.street = packageDetails.destinationAddress.street;
            this.number = packageDetails.destinationAddress.number;
            this.addressTypeId = packageDetails.destinationAddress.addressTypeId;
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
        async getDriversData(){
            var url = 'https://localhost:7263/Drivers/getDrivers?'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                'accept': '',
                'Authorization': `Bearer ${this.token}`
                }
            });

            const responseJson = await response.json();
            this.drivers = responseJson.drivers;
        },
        goToPackagesToAssign(){
          var route = "/Storage/PackagesToAssign";
          this.$router.push({ path: route });
        },
        async assignPackage(){
            const formattedDate = new Date(this.selectedDate).toISOString();

            try {

                const response = await fetch('https://localhost:7263/Packages/assignPackage', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                        body: JSON.stringify({
                            packageId: this.$route.params.id,
                            driverId: this.selectedDriverId,
                            transportDate: formattedDate
                    }),
                    credentials: 'include' 
                });
            } catch (error) {

            }

            this.$router.push({ path: '/Storage/PackagesToAssign' })
        }
    }
}
</script>