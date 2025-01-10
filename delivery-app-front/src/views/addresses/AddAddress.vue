<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Register new address</h2>
        <p class="text-dark-50 mb-5">pass address information</p>
        
        <hr>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Name" v-model="name"/>
                </div>
            </div>
        </div>
        
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


        <div class="mt-4">
            <a href="/Addresses">
                <button class="btn btn-outline-danger btn-lg px-5" type="submit">Cancell</button>
            </a>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" @click="addAddress">Add new address</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            name: '',
            code: '',
            city: '',
            street: '',
            postCode: '',
            number: '',
            addressTypeId: null,
            countryId: null,
            countries: [],
            addressTypes: []
        };
    },
    mounted(){
        this.getCountries();
        this.getAddressTypes();
    },
    methods: {
        async addAddress() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Addresses/addAddress', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            name: this.name,
                            city: this.city,
                            postCode: this.postCode,
                            street: this.street,
                            number: this.number,
                            addressTypeId: this.addressTypeId,
                            countryId: this.countryId,
                    }),
                        credentials: 'include' 
                });
                this.$router.push({ path: '/Addresses' })
            } catch (error) {

            }
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
        }
    }
}
</script>