<template>
    <white-card-80>
        <base-dialog :show="!!showDialog" title="Delete dictionary confirm" @close="showDialog = !showDialog">
        </base-dialog>

        <h2 class="fw-bold mb-2 text-uppercase">
            {{ dictionaryType }} dictionaries
        </h2>
        <hr />
        <div class="mt-4">
            <table class="table" v-if="items.length > 0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">DictionaryType ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Default</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(dictionary, index) in items" :key="dictionary.dictionaryId">
                        <td>{{ index + 1}}</td>
                        <th>{{ dictionary.dictionaryId }}</th>
                        <td>{{ dictionary.name }}</td>
                        <td>{{ dictionary.isDefault }}</td>
                        <td>
                            <router-link class="me-3 btn btn-primary" :to="`/DictionaryTypes/${this.dictionaryTypeId}/Dictionaries/EditDictionary/${dictionary.dictionaryId}`">Edit</router-link>
                            <button size="sm" @click="deleteDictionary(dictionary.dictionaryId)" class="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <h1>NO DICTIONARIES FOUND</h1>
            </div>

        </div>
        <router-link class="btn btn-outline-danger btn-lg px-5 mt-3 me-3" :to="`/DictionaryTypes`">Cancell</router-link>
        <button class="btn btn-outline-success btn-lg px-5 mt-3" v-on:click="addNewDictionary()">Add new dictionary</button>
    </white-card-80>
</template>

<script>
export default {
    data() {
        return {
            dictionaryTypeId: 0,
            items: []
        };
    },

    mounted() {
        this.dictionaryTypeId = this.$route.params.typeId;
        this.getDictionariesData();
    },
    methods: {
        resetSort() { },

        async getDictionariesData() {
            const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: this.dictionaryTypeId,
            });

            if(data.success)
                this.items = data.dictionaries || [];
        },

        async deleteDictionary(dictionaryId) {
            
            const data = await this.$api.delete('Dictionaries/removeDictionary',{
                dictionaryId: dictionaryId,
                dictionaryTypeId: Number.parseInt(this.dictionaryTypeId, 10) || undefined
            });

            if(data.success)
                this.getDictionariesData();
        },
        addNewDictionary() {
            this.$router.push({ path: `/DictionaryTypes/${this.dictionaryTypeId}/Dictionaries/AddDictionary/`});
        }
    },
};
</script>
