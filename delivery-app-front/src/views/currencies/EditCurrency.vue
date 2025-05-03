<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Edit currency</h2>
        <p class="text-dark-50 mb-5">pass currency information</p>
        
        <hr>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Name" v-model="name"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Shortcut</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Shortcut" v-model="shortcut"/>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/Currencies`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="editCurrency()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    inject: ['notify'],
    data() {
        return {
            id: null,
            name: '',
            shortcut: ''
        };
    },
    mounted(){
        this.getCurrencyData();
    },
    methods: {
        async editCurrency() {
            const data = await this.$api.post('Currencies/editCurrency', {
                id: this.id,
                name: this.name,
                shortcut: this.shortcut
            });

            if(data.success == true)
                this.$router.push({ path: '/Currencies' })
        },

        async getCurrencyData(){
            const data = await this.$api.get('Currencies/getCurrency',{
                currencyId: this.$route.params.id
            });

            var fetchCurrency = data.currency;
            this.id = fetchCurrency.id;
            this.name = fetchCurrency.name,
            this.shortcut = fetchCurrency.shortcut
        }
    }
}
</script>