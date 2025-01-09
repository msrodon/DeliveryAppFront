<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Edit country</h2>
        <p class="text-dark-50 mb-5">pass country information</p>
        
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
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Code</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Code" v-model="code"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Currencies</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <!-- <select class="form-select form-select-lg" v-model="oldId">
                        <option disabled selected>Choose option</option>
                        <option v-for="currency in currencies" :value="currency.id" :key="currency.id">{{currency.name}}</option>
                    </select> -->
                    <select class="form-select form-select-lg" v-model="currencyId">
                        <option disabled value="">Choose option</option>
                        <option v-for="currency in currencies" :value="currency.id" :key="currency.id">
                            {{ currency.name }}
                        </option>
                    </select>

                </div>
            </div>
        </div>

        <div class="mt-4">
            <a href="/Countries">
                <button class="btn btn-outline-danger btn-lg px-5" type="submit">Cancell</button>
            </a>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" @click="editCountry">Save changes</button>
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
            currencyId: null,
            currencies: []
        };
    },
    mounted(){
        this.fetchCountryData();
        this.getCurrencies();
    },
    methods: {
        async editCountry() {

            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Countries/editCountry', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            id: this.id,
                            name: this.name,
                            code: this.code,
                            currencyId: this.currencyId
                    }),
                        credentials: 'include' 
                });
            } catch (error) {

            }
            
            this.$router.push({ path: '/Countries' })
        },
        async fetchCountryData(){
            var url = 'https://localhost:7263/Countries/getCountry?'
            const token = localStorage.getItem('token');

            const response = await fetch(url + new URLSearchParams({
                countryId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseJson = await response.json();
            var fetchCountry = responseJson.country;

            this.id = fetchCountry.id;
            this.name = fetchCountry.name;
            this.code = fetchCountry.code;
            this.currencyId = fetchCountry.currencyId;
        },
        async getCurrencies(){
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7263/Currencies/getCurrencies', {
            method: "GET",
            headers: {
                'accept': '',
                'Authorization': `Bearer ${token}`
            }
            });

            const responseJson = await response.json();
            this.currencies = responseJson.currencies
        }
    }
}
</script>