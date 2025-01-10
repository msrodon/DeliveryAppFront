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
                    <p class="text-dark-50 m-0">Set as default</p>
                </div>
                <div class="form-check form-switch mx-1 mb-4">
                    <input class="form-check-input" type="checkbox" v-model="isDefault" id="isDefaultCheckbox">
                    <label class="form-check-label" for="isDefaultCheckbox">Default</label>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <button class="btn btn-outline-danger btn-lg px-5" type="submit" v-on:click="Cancell()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" v-on:click="EditDictionary()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            dictionaryTypeId: '',
            dictionaryId: '',
            name: '',
            isDefault: null,

        };
    },
    mounted() {
        this.dictionaryTypeId = this.$route.params.typeId;
        this.dictionaryId = this.$route.params.id;
        this.FetchDictionaryData();
    },
    methods: {
        async FetchDictionaryData(){
            var url = 'https://localhost:7263/Dictionaries/getDictionary?'
            const token = localStorage.getItem('token');

            const response = await fetch(url + new URLSearchParams({
                dictionaryId: this.dictionaryId
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseJson = await response.json();
            var fetchDictionary = responseJson.dictionary;

            this.name = fetchDictionary.name;
            this.isDefault = fetchDictionary.isDefault;
        },
        async EditDictionary(){
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Dictionaries/editDictionary', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            dictionaryId: this.dictionaryId,
                            dictionaryTypeId: this.dictionaryTypeId,
                            name: this.name,
                            isDefault: this.isDefault
                    }),
                        credentials: 'include' 
                });
            } catch (error) {

            }
            
            var route = "/DictionaryTypes/" + this.dictionaryTypeId + "/Dictionaries";
            this.$router.push({ path: route });
        },
        Cancell(){
          var route = "/DictionaryTypes/" + this.dictionaryTypeId + "/Dictionaries";
          this.$router.push({ path: route });
        }
    }
}
</script>