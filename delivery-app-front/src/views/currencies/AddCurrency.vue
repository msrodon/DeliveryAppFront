<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Register new currency</h2>
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
            <button class="btn btn-outline-success btn-lg px-5" type="submit" @click="AddCurrency">Add new currency</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            name: '',
            shortcut: ''
        };
    },
    methods: {
        async AddCurrency() {

            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Currencies/addCurrency', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            name: this.name,
                            shortcut: this.shortcut
                    }),
                        credentials: 'include' 
                });
                this.$router.push({ path: '/Currencies' })
            } catch (error) {

            }
            
        }
    }
}
</script>