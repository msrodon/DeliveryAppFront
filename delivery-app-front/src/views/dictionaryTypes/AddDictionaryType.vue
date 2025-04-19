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
            <router-link class="btn btn-outline-danger btn-lg px-5 mx-3" :to="`/DictionaryTypes`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="addDictionaryType()">Add new dictionary type</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    inject: ['notify'],
    data() {
        return {
            name: '',
        };
    },
    methods: {
        async addDictionaryType() {
            const data = await this.$api.post('Dictionaries/addDictionaryType', {
                name: this.name
            });

            if(data.success == true)
                this.$router.push({ path: '/DictionaryTypes' });
        }
    }
}
</script>