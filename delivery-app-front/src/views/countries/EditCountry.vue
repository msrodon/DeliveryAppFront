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
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/Countries`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="editCountry()">Save changes</button>
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
        this.getCountryData();
        this.getCurrencies();
    },
    methods: {
        async editCountry() {
            const data = await this.$api.post('Countries/editCountry', {
                id: this.id,
                name: this.name,
                code: this.code,
                currencyId: this.currencyId
            });

            if(data.success == true)
                this.$router.push({ path: '/Countries' })
        },
        async getCountryData(){
            const data = await this.$api.get('Countries/getCountry',{
                countryId: this.$route.params.id
            });

            if(data.success){
                var fetchCountry = data.country;
                this.id = fetchCountry.id;
                this.name = fetchCountry.name;
                this.code = fetchCountry.code;
                this.currencyId = fetchCountry.currencyId;
            }
        },
        async getCurrencies(){
            const data = await this.$api.get('Currencies/getCurrencies');

            if(data.success)
                this.currencies = data.currencies || [];
        }
    }
}
</script>