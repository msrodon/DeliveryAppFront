<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Register new country</h2>
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
                    <select class="form-select form-select-lg" v-model="currencyId">
                        <option disabled selected>Choose option</option>
                        <option v-for="currency in currencies" :value="currency.id" :key="currency.id">{{currency.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <button class="btn btn-outline-danger btn-lg px-5 me-3" @click="goToCountries()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" @click="AddCountry()">Add new country</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            name: '',
            code: '',
            currencyId: null,
            currencies: [],
            token: ''
        };
    },
    mounted(){
        this.token = localStorage.getItem('token');
        this.getCurrencies();
    },
    methods: {
        async AddCountry() {
            try {
                const response = await fetch('https://localhost:7263/Countries/addCountry', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                        body: JSON.stringify({
                            name: this.name,
                            code: this.code,
                            currencyId: this.currencyId,
                    }),
                        credentials: 'include' 
                });
                this.$router.push({ path: '/Countries' })
            } catch (error) {

            }
        },
        async getCurrencies(){
            const response = await fetch('https://localhost:7263/Currencies/getCurrencies', {
            method: "GET",
            headers: {
                'accept': '',
                'Authorization': `Bearer ${this.token}`
            }
            });

            const responseJson = await response.json();
            this.currencies = responseJson.currencies
        },
        goToCountries(){
            this.$router.push('/Countries');
        }
    }
}
</script>