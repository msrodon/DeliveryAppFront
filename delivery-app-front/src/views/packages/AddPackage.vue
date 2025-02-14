<template>
    <div>
        <white-card-50>
            <h2 class="fw-bold mb-2 text-uppercase">Send new package</h2>
            <p class="text-dark-50 mb-5">pass package information</p>
            
            <hr>

            <div class="row">
                <div class="d-flex flex-column w-100">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Reciver e-mail</p>
                    </div>
                    <div class="form-outline form-dark mb-4">
                        <input class="form-control form-control-lg" placeholder="Name" v-model="name"/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="d-flex flex-column w-100">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Package type</p>
                    </div>
                    <div class="form-outline form-dark mb-4">
                        <select class="form-select form-select-lg" v-model="packageTypeId">
                            <option disabled selected>Choose option</option>
                            
                            <option v-for="type in packageTypes" :value="type.dictionaryId" :key="type.dictionaryId">{{type.name}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
            <div class="d-flex flex-column w-100">
            <div class="text-start mx-1">
                <p class="text-dark-50 m-0">Address</p>
            </div>
            <div class="form-outline form-dark mb-4">
                <select class="form-select form-select-lg" v-model="packageTypeId" :disabled="useGuestAddress">
                <option disabled selected>Choose option</option>
                </select>
            </div>
            </div>
            <div>
            <div class="form-check d-flex">
                <input class="form-check-input me-3" type="checkbox" v-model="useGuestAddress" id="oneTimeAddressCheck" />
                <label class="form-check-label" for="oneTimeAddressCheck">
                Use one-time address instead
                </label>
            </div>
        </div>
    </div>
    </white-card-50>

    <white-card-50 v-if="!!useGuestAddress">
        <h2 class="fw-bold mb-2 text-uppercase">One time addres</h2>
        <p class="text-dark-50 mb-5">pass address data</p>
        
        <hr>
        
        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Country</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="countryId">
                        <option disabled selected>Choose option</option>
                        <option v-for="country in countries" :value="country.id" :key="country.id">{{country.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">City</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="City" v-model="city"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Post code</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Post code" v-model="postCode"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Street</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Street" v-model="street"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Number</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Number" v-model="number"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Address type</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="addressTypeId">
                        <option disabled selected>Choose option</option>
                        <option v-for="address in addressTypes" :value="address.dictionaryId" :key="address.dictionaryId">{{address.name}}</option>
                    </select>
                </div>
            </div>
        </div>
    </white-card-50>
</div>
</template>

<script> 

export default {
    data() {
        return {
            reciverEmail: '',
            destinationId: '',
            packageTypeId: '',
            paymentTypeId: '',
            //GUEST ADDRESS
            countryId: '',
            postCode: '',
            city: '',
            street: '',
            number: '',
            addressTypeId: '',
            //
            countries: [],
            userAddresses: [],
            packageTypes: [],
            addressTypes: [],
            //SETTINGS
            useGuestAddress: false 
        };
    },
    mounted(){
        this.getCountries();
        this.getPackageTypes();
        this.getAddressTypes();
    },
    methods: {
        async AddPackage() {

            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Packages/addPackage', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            // name: this.name,
                            // code: this.code,
                            // currencyId: this.currencyId,
                    }),
                        credentials: 'include' 
                });
                this.$router.push({ path: '/' })
            } catch (error) {

            }
        },
        async getPackageTypes(){
            const token = localStorage.getItem('token');
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 5
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${token}`,
                    'DictionaryTypeId': 5
                }
            });

            const responseJson = await response.json();
            this.packageTypes = responseJson.dictionaries
        },
        async getAddressTypes(){
            const token = localStorage.getItem('token');
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 9
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${token}`,
                    'DictionaryTypeId': 9
                }
            });

            const responseJson = await response.json();
            this.addressTypes = responseJson.dictionaries
        },
        async getCountries(){
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7263/Countries/getCountries', {
            method: "GET",
            headers: {
                'accept': '',
                'Authorization': `Bearer ${token}`
            }
            });

            const responseJson = await response.json();
            this.countries = responseJson.countries
        }
    }
}
</script>