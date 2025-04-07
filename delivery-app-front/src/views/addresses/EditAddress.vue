<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Edit address</h2>
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
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/Addresses`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="editAddress()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            id: null,
            name: '',
            code: '',
            city: '',
            street: '',
            postCode: '',
            number: '',
            addressTypeId: null,
            countryId: null,
            //
            countries: [],
            addressTypes: [],
            token: ''
        };
    },
    async mounted(){
        this.token = localStorage.getItem('token');
        this.addressTypes = await this.getDictionaries(9);

        this.fetchAddressData();
        this.getCountries();
    },
    methods: {
        async editAddress() {
            const data = await this.$api.post('Addresses/editAddress', {
                id: this.id,
                name: this.name,
                city: this.city,
                postCode: this.postCode,
                street: this.street,
                number: this.number,
                addressTypeId: this.addressTypeId,
                countryId: this.countryId
            });

            if(data.success)
                this.$router.push({ path: '/Addresses' })
        },
        async fetchAddressData(){
            const data = await this.$api.get('Addresses/getAddress', {
                addressId: this.$route.params.id
            });

            if(data.success){
                var fetchAddress = data.address;

                this.id = fetchAddress.id;
                this.name = fetchAddress.name;
                this.city = fetchAddress.city;
                this.postCode = fetchAddress.postCode;
                this.street = fetchAddress.street;
                this.number = fetchAddress.number;
                this.addressTypeId = fetchAddress.addressTypeId;
                this.countryId = fetchAddress.countryId;
            }
        },
        async getCountries(){
            const data = await this.$api.get('Countries/getCountries');
      
            if(data.success)
                this.countries = data.countries;
        },
        async getDictionaries(dictionaryTypeId){
            const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: dictionaryTypeId
            });

            if(data.success)
                return data.dictionaries || [];
        }
    }
}
</script>