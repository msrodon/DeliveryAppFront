<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Add new dictionary type</h2>
        <p class="text-dark-50 mb-5">pass information</p>
        
        <hr>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Dictionary Type name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Name" v-model="name"/>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <a href="/Cars">
                <button class="btn btn-outline-danger btn-lg px-5" type="submit">Cancell</button>
            </a>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" v-on:click="AddDictionaryType()">Add new dictionary type</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            name: '',
        };
    },
    methods: {
        async AddDictionaryType() {

            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Dictionaries/addDictionaryType', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            name: this.name
                    }),
                        credentials: 'include' 
                });
                this.$router.push({ path: '/DictionaryTypes' })
            } catch (error) {

            }
        }
    }
}
</script>