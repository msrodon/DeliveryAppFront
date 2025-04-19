<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Edit dictionary</h2>
        <p class="text-dark-50 mb-5">pass information</p>
        
        <hr>

        <input type="hidden" name="">

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Dictionary name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Name" v-model="name"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0 ">Set as default</p>
                </div>
                <div class="form-check form-switch ms-4">
                    <input class="form-check-input fs-4" type="checkbox" v-model="isDefault" id="isDefaultCheckbox">
                </div>
            </div>
        </div>

        <div class="mt-4">
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/DictionaryTypes/${this.dictionaryTypeId}/Dictionaries`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="EditDictionary()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    inject: ['notify'],
    data() {
        return {
            dictionaryTypeId: '',
            dictionaryId: '',
            name: '',
            isDefault: null
        };
    },
    mounted() {
        this.dictionaryTypeId = this.$route.params.typeId;
        this.dictionaryId = this.$route.params.id;
        this.FetchDictionaryData();
    },
    methods: {
        async FetchDictionaryData(){
            const data = await this.$api.get('Dictionaries/getDictionary',{
                dictionaryId: this.dictionaryId
            });

            if(data.success){
                var fetchDictionary = data.dictionary;
                this.name = fetchDictionary.name;
                this.isDefault = fetchDictionary.isDefault;
            }
        },
        async EditDictionary(){
            const data = await this.$api.post('Dictionaries/editDictionary', {
                dictionaryId: this.dictionaryId,
                dictionaryTypeId: this.dictionaryTypeId,
                name: this.name,
                isDefault: this.isDefault
            });

            if(data.success == true)
                this.$router.push({ path: `/DictionaryTypes/${this.dictionaryTypeId}/Dictionaries` });
        }
    }
}
</script>