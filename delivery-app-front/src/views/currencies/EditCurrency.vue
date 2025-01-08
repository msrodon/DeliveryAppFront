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
            <a href="/Currencies">
                <button class="btn btn-outline-danger btn-lg px-5" type="submit">Cancell</button>
            </a>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" @click="EditCurrency">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            id: null,
            name: '',
            shortcut: ''
        };
    },
    mounted(){
        this.FetchCurrencyData();
    },
    methods: {

        async EditCurrency() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Currencies/editCurrency', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            id: this.id,
                            name: this.name,
                            shortcut: this.shortcut
                    }),
                    credentials: 'include' 
                });
            } catch (error) {

            }
            
            this.$router.push({ path: '/Currencies' })
        },

        async FetchCurrencyData(){
            var url = 'https://localhost:7263/Currencies/getCurrency?'
            const token = localStorage.getItem('token');

            const response = await fetch(url + new URLSearchParams({
                currencyId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseJson = await response.json();
            var fetchCurrency = responseJson.currency;

            this.id = fetchCurrency.id;
            this.name = fetchCurrency.name,
            this.shortcut = fetchCurrency.shortcut
        }
    }
}
</script>