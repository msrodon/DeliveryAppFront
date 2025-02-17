<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Add new dictionary</h2>
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

        <div class="mt-4">
            <button class="btn btn-outline-danger btn-lg px-5" type="submit" v-on:click="Cancell()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" v-on:click="AddDictionary()">Add new dictionary</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            dictionaryTypeId: '',
            name: ''
        };
    },
    mounted() {
        this.dictionaryTypeId = this.$route.params.typeId;
    },
    methods: {
        async AddDictionary() {

            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Dictionaries/addDictionary', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        dictionaryTypeId: this.dictionaryTypeId,
                        name: this.name
                    }),
                    credentials: 'include' 
                });
                var route = "/DictionaryTypes/" + this.dictionaryTypeId + "/Dictionaries";
                this.$router.push({ path: route });
            } catch (error) {

            }
        },
        Cancell(){
          var route = "/DictionaryTypes/" + this.dictionaryTypeId + "/Dictionaries";
          this.$router.push({ path: route });
        }
    }
}
</script>