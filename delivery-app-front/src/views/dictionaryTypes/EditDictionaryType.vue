<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Edit Dictionary type name</h2>
        <p class="text-dark-50 mb-5">edit name</p>
        
        <hr>

        <div class="row">
            <div class="d-flex flex-column">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Name" v-model="name"/>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/DictionaryTypes`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="editDictionaryType()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    inject: ['notify'],
    data() {
        return {
            id: null,
            name: ''
        };
    },
    mounted(){
        this.getDictionaryTypeData();
    },
    methods: {
        async editDictionaryType() {
            const data = await this.$api.post('Dictionaries/editDictionaryType', {
                dictionaryTypeId: this.id,
                name: this.name
            });

            if(data.success == true)
                this.$router.push({ path: '/DictionaryTypes' })
        },

        async getDictionaryTypeData(){
            const data = await this.$api.get('Dictionaries/getDictionaryType',{
                dictionaryTypeId: this.$route.params.typeId
            });

            var dictionaryType = data.dictionaryType;
            this.id = dictionaryType.dictionaryTypeId;
            this.name = dictionaryType.name
        }
    }
}
</script>